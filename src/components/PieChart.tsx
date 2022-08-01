import React, { ComponentPropsWithoutRef, CSSProperties } from "react";
import ChartCard from "./ChartCard";
import { ChartProps, Pie } from "react-chartjs-2";
import { ArcElement, Chart, ChartData, Legend, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({
  children,
  labels,
  datasets,
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  title?: string;
  labels: ChartData["labels"];
  datasets: {
    data: number[];
    backgroundColor: CSSProperties["color"][];
  }[];
}) => {
  const config: ChartProps<"pie">["options"] = {
    responsive: true,
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
      <Pie
        options={config}
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
    </ChartCard>
  );
};

export default PieChart;
