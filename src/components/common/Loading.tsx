export const SkeletonCard = () => {
  return (
    <div className="card w-full p-2 mb-4 bg-base-300 rounded-md shadow-md flex-none h-full">
      <div className="flex flex-col gap-4 w-96">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
};

interface LoadCardProps {
  times?: number;
}

export const LoadSkeleton = ({ times = 1 }: LoadCardProps) => {
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < times; i++) {
      skeletons.push(<SkeletonCard />);
    }
    return skeletons;
  };

  return <>{renderSkeletons()}</>;
};
