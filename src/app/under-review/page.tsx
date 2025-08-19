import LogoutNav from "@/components/navbar/Logout";
import UnderReview from "./UnderReview";
import { style } from "@/components/navbar/RightNavbar";

const page = () => {
  return (
    <div>
      <div className="w-full flex justify-end p-4">
        <div
          className={`${style} hover:scale-105 hover:bg-white transition-all`}>
          <LogoutNav />
        </div>
      </div>
      <div className="flex justify-center items-center h-full m-auto min-h-[600px]">
        <UnderReview />
      </div>
    </div>
  );
};

export default page;
