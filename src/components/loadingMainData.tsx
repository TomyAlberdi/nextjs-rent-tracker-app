import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const LoadingMainData = () => {
  return (
    <div className="h-full flex justify-start items-center p-2 pt-0 gap-2">
      <Skeleton className="h-full w-3/4 flex justify-center items-center">
        <Spinner className="w-10 h-10" />
      </Skeleton>
      <Skeleton className="h-full w-1/4 flex justify-center items-center">
        <Spinner className="w-10 h-10" />
      </Skeleton>
    </div>
  );
};

export default LoadingMainData;
