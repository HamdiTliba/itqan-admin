"use client";
import Arrow from "../svgs/Arrow";
import Skeleton from "../Skeleton";

interface OverViewCardItemProps {
  value: number | string;
  pourcentage: string;
  info: string;
  title: string;
  diff: number;
  isValueFetching?: boolean;
  selectValue: string;
  handleSelectChange: (newValue: string) => void; // Callback to pass value up
}

const OverViewCardItem: React.FC<OverViewCardItemProps> = ({
  value,
  pourcentage,
  info,
  title,
  diff,
  isValueFetching,
  selectValue,
  handleSelectChange,
}) => {
  return (
    <div
      className={`relative flex flex-col justify-between  p-2 md:p-3 border bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800  w-full rounded-2xl gap-3 md:gap-6 cursor-pointer hover:scale-[1.025] transition-all boxShadow`}>
      <div className="flex w-full justify-between">
        <div className="text-neutral-500 font-medium text-xs md:text-lg  hyphens-auto break-words">
          {title}
        </div>

        <div>
          <select
            value={selectValue}
            onChange={(e) => handleSelectChange(e.target.value)} // Call the parent handler
            className={`outline-none text-xs rounded-lg bg-neutral-50 dark:bg-neutral-800`}>
            <option value="day">Today</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="life">Lifetime</option>
          </select>
        </div>
      </div>
      <div className="flex  justify-between items-center gap-8 mb-5">
        <div className="">
          <div className="text-base md:text-lg font-semibold ">
            {!isValueFetching ? (
              `${value}`
            ) : (
              <Skeleton className="w-full h-6" />
            )}
          </div>
          <p className="text-base md:text-lg font-semibold -mt-2">
            {pourcentage || <Skeleton className="w-10 h-6" />}
          </p>
        </div>
        <p className="">
          <Arrow
            className={`size-10 md:size-10 tansition-all ${
              diff >= 0 ? "rotate-0" : "rotate-180"
            } />`}
            strokeColor={diff >= 0 ? "green" : "red"}
          />
        </p>
      </div>
      <p className="text-[9px] sm:text-xs font-light absolute bottom-[1px] leading-3">
        {info}
      </p>
    </div>
  );
};

export default OverViewCardItem;
