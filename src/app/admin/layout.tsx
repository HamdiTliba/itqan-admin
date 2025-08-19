import Navbar from "@/components/navbar/Navbar";
import SideMenu from "@/components/sideMenu/SideMenu";
import MountedProvider from "@/providers/MountedProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

const LayoutAdmin = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <div className="flex overflow-hidden h-screen md:max-h-[768px] bg-neutral-50 dark:bg-neutral-800">
      <MountedProvider>
        <SessionProvider session={session}>
          <SideMenu />

          <div className="flex flex-col overflow-hidden w-full">
            <Navbar />
            <div className="flex-1 p-2 mb-14  rounded-3xl border-[1px] border-neutral-300 dark:border-neutral-600 bg-white dark:bg-black my-2 md:m-1 animate-slide-in  overflow-x-hidden">
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </div>
          </div>
        </SessionProvider>
      </MountedProvider>
    </div>
  );
};

export default LayoutAdmin;
