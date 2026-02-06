import React from "react";
import CardSkeleton from "./CardSkeleton";

const CardSkeletonGrid: React.FC = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-5 w-full pb-8"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </ul>
  );
};

export default CardSkeletonGrid;
