import React, { ComponentPropsWithoutRef } from "react";
import ChartCard from "./ChartCard";

const SimpleDataChart = ({
  children,
  data,
  ...rest
}: ComponentPropsWithoutRef<"div"> & {
  label?: string;
  data?: string | number;
}) => {
  return (
    <ChartCard {...rest}>
      <div className="flex h-full items-center justify-center p-2 text-xl font-medium dark:text-white">
        {data}
      </div>
    </ChartCard>
  );
};

export default SimpleDataChart;
