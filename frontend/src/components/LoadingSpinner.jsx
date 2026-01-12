import React from "react";
import { LoaderIcon } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <LoaderIcon className="size-10 animate-spin text-primary" />
      <p className="text-sm text-base-content/50">Loading...</p>
    </div>
  );
};
export default LoadingSpinner;
