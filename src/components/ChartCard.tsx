import React, { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const ChartCard = ({
  className,
  children,
  title,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { title?: string }) => {
  return (
    <div
      className={twMerge(
        "flex resize flex-col rounded bg-white px-4 py-3 shadow dark:bg-white/10",
        className
      )}
      {...rest}
    >
      {title && (
        <label className="mb-2 text-sm font-bold dark:text-white">
          {title}
        </label>
      )}
      {children}
    </div>
  );
};

export default ChartCard;
