import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import ChartCard from "./ChartCard";
import { ChartProps, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  ChartData,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({
  children,
  labels,
  datasets,
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  title?: string;
  labels: ChartData["labels"];
  datasets: {
    label: string;
    data: number[];
    borderColor: CSSProperties["color"];
    backgroundColor: CSSProperties["color"];
  }[];
}) => {
  const config: ChartProps<"line">["options"] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },

    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          pointStyle: "circle",
          usePointStyle: true,
          boxHeight: 9,
        },
      },
    },
  };

  return (
    <ChartCard {...rest}>
      <Line
        options={config}
        data={{
          labels: labels,
          datasets: datasets.map((dataset) => {
            return {
              ...dataset,
              pointRadius: 0,
              borderWidth: 2,
              fill: true,
            };
          }),
        }}
      />
    </ChartCard>
  );
};

export default LineChart;
