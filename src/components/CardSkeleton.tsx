import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <li className="col-span-1 rounded-lg bg-white shadow animate-pulse">
      {/* Action buttons */}
      {/* <div className="flex justify-end mx-2.5 mt-2 gap-2">
        <div className="h-7 w-7 rounded-md bg-gray-200" />
        <div className="h-7 w-7 rounded-md bg-gray-200" />
      </div> */}

      {/* Card body */}
      <div className="flex w-full items-center justify-between space-x-6 p-4 sm:p-6">
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded-full bg-gray-200 ml-auto" />
          </div>

          {/* Description */}
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-4/5 rounded bg-gray-200" />
          </div>

          {/* Due date */}
          <div className="mt-3 h-3 w-28 rounded bg-gray-200" />
        </div>
      </div>
    </li>
  );
};

export default CardSkeleton;
