import React, { useEffect, useRef } from "react";
import { MqttMetricsResponse } from "./data/models/mqttMetricsResponse";
import { MqttClient, QoS } from "mqtt";
import { subscribeToMQTTMetrics } from "./data/services/mqttMetrics";
import SimpleDataChart from "./components/SimpleDataChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import useOnline from "./hooks/useOnline";
import ThemeToggle from "./components/ThemeToggle";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [metrics, setMetrics] = React.useState<
    (MqttMetricsResponse & { timestamp: Date })[]
  >([]);
  const clientRef = useRef<MqttClient>();

  const subscriptionTopic = "$SYS";
  const subscriptionQosLevel: QoS = 0;

  const online = useOnline();

  useEffect(() => {
    const client = subscribeToMQTTMetrics();
    closeLastConnection();
    clientRef.current = client;
    client.subscribe({ [subscriptionTopic]: { qos: subscriptionQosLevel } });
    client.on("error", (error) => {
      console.log(error);
      toast.error("An error occurred");
    });
    client.on("message", (topic, payload) => {
      addData(JSON.parse(payload.toString()));
    });

    return () => {
      closeLastConnection();
    };
  }, []);

  function addData(data: MqttMetricsResponse) {
    setMetrics((oldList) => [
      ...(oldList.length >= 5 ? oldList.slice(1) : oldList),
      { ...data, timestamp: new Date() },
    ]);
  }

  function closeLastConnection() {
    if (clientRef.current) {
      clientRef.current?.removeAllListeners();
      clientRef.current?.on("error", () => {
        //Don't throw error on disconnect
      });
      clientRef.current?.unsubscribe(subscriptionTopic);
      clientRef.current?.end();
    }
  }

  const connected = !!clientRef.current?.connected;

  const lastData = metrics.length > 0 ? metrics[metrics.length - 1] : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-5 font-sans dark:bg-slate-900 md:p-10 xl:p-20">
      <div className="mb-6 flex flex-row items-center">
        <div className="flex grow flex-row items-center gap-2 px-2">
          <div
            className={`aspect-square h-3 rounded-full ${
              connected && online
                ? "animate-ping bg-green-600 text-green-600"
                : "bg-red-400"
            }`}
          >
            <div className="h-full w-full rounded-full" />
          </div>
          <span
            className={connected && online ? "text-green-600" : "text-red-400"}
          >
            {connected && online
              ? metrics.length <= 1
                ? "Loading data..."
                : "Online"
              : "Offline"}
          </span>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="grid grid-cols-2 gap-x-2">
          <PieChart
            title="Client status"
            labels={["Connected", "Disconnected"]}
            datasets={[
              {
                data: [lastData?.connected ?? 0, lastData?.disconnected ?? 0],
                backgroundColor: ["mediumSeaGreen", "rgb(206,206,206)"],
              },
            ]}
          />
          <div className="flex flex-col gap-y-2">
            <SimpleDataChart
              className="grow"
              title="Retained messages"
              data={lastData?.retainedMessages}
            />
            <SimpleDataChart
              className="grow"
              title="Pending messages"
              data={lastData?.pendingMessages}
            />
          </div>
        </div>
        <LineChart
          title="Clients"
          labels={metrics.map((data) => data.timestamp.toLocaleTimeString())}
          datasets={[
            {
              label: "Connected maximum count",
              data: metrics.map((data) => data.maxConnected),
              borderColor: "purple",
              backgroundColor: "rgba(138,68,243,0.1)",
            },
            {
              label: "Connected",
              data: metrics.map((data) => data.connected),
              borderColor: "mediumSeaGreen",
              backgroundColor: "rgba(118,243,68,0.1)",
            },
            {
              label: "Rejected",
              data: metrics.map((data) => data.rejected),
              borderColor: "red",
              backgroundColor: "rgba(243,68,68,0.1)",
            },
          ]}
        />
        <LineChart
          title="Messages"
          labels={metrics.map((data) => data.timestamp.toLocaleTimeString())}
          datasets={[
            {
              label: "Sent",
              data: metrics.map((data) => data.messageSent),
              borderColor: "mediumSeaGreen",
              backgroundColor: "rgba(118,243,68,0.1)",
            },
            {
              label: "Received",
              data: metrics.map((data) => data.messageReceived),
              borderColor: "purple",
              backgroundColor: "rgba(138,68,243,0.1)",
            },
            {
              label: "Dropped",
              data: metrics.map((data) => data.messageDropped),
              borderColor: "red",
              backgroundColor: "rgba(243,68,68,0.1)",
            },
          ]}
        />
        <LineChart
          title="Bytes"
          labels={metrics.map((data) => data.timestamp.toLocaleTimeString())}
          datasets={[
            {
              label: "Sent",
              data: metrics.map((data) => data.messageBytesSent),
              borderColor: "mediumSeaGreen",
              backgroundColor: "rgba(118,243,68,0.1)",
            },
            {
              label: "Received",
              data: metrics.map((data) => data.messageBytesReceived),
              borderColor: "purple",
              backgroundColor: "rgba(138,68,243,0.1)",
            },
          ]}
        />
        <LineChart
          title="Packets"
          labels={metrics.map((data) => data.timestamp.toLocaleTimeString())}
          datasets={[
            {
              label: "Sent",
              data: metrics.map((data) => data.packetSent),
              borderColor: "mediumSeaGreen",
              backgroundColor: "rgba(118,243,68,0.1)",
            },
            {
              label: "Received",
              data: metrics.map((data) => data.packetReceived),
              borderColor: "purple",
              backgroundColor: "rgba(138,68,243,0.1)",
            },
          ]}
        />
        <LineChart
          title="Subscriptions"
          labels={metrics.map((data) => data.timestamp.toLocaleTimeString())}
          datasets={[
            {
              label: "Active subscriptions",
              data: metrics.map((data) => data.activeSubscriptions),
              borderColor: "mediumSeaGreen",
              backgroundColor: "rgba(118,243,68,0.1)",
            },
            // {
            //   label: "Received",
            //   data: metrics.map((data) => data.unsubscribed),
            //   borderColor: "purple",
            //   backgroundColor: "rgba(138,68,243,0.1)",
            // },
          ]}
        />
      </div>
      <Toaster
        toastOptions={{ className: "dark:bg-white/10 dark:text-white" }}
      />
    </div>
  );
}

export default App;
