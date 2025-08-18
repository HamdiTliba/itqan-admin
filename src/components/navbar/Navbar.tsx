import LeftNavbar from "./LeftNavbar";
import RightNavbar from "./RightNavbar";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full px-2 mt-2  animate-slide-left">
      <LeftNavbar />
      <RightNavbar />
    </div>
  );
};

export default Navbar;
