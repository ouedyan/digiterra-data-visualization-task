import mqtt from "mqtt/dist/mqtt";

export function subscribeToMQTTMetrics(options?: {
  abortSignal?: AbortSignal;
}) {
  return mqtt.connect(process.env.REACT_APP_MQTT_HOST ?? "", {
    clientId: process.env.REACT_APP_MQTT_CLIENT_ID,
    wsOptions: { signal: options?.abortSignal },
  });
}
