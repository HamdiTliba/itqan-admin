import Image from "next/image";
import { memo } from "react";

const Loading = () => {
  return (
    <div className=" relative flex justify-center items-center w-full h-full">
      <Image src="/loading-circle.svg" alt="loading" width={100} height={100} />
    </div>
  );
};

export default memo(Loading);
