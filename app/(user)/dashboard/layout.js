"use client";

import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";

const Header = dynamic(() => import("../../../components/Header"));
// const Drawer = dynamic(()=>import("../../../components/Drawer"))
// const RightSideBar = dynamic(()=>import("../../../components/RightSideBar"))
const SideBar = dynamic(() => import("../../../components/SideBar"));

export default function DashboardLayout({ children }) {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:flex h-screen">
        <div className="lg:hidden block w-full">
          <Header setIsOpen={setIsOpen} />
        </div>
        <div className="lg:w-[20%] lg:block hidden">
          <SideBar isMobile={false} />
        </div>

        <div className="lg:w-[60%] w-fulll  bg-slate-50 lg:mt-[0px] mt-[60px] overflow-y-auto">
          {children}
        </div>
        <div className="lg:w-[20%] lg:block hidden overflow-y-auto">
          {/* <RightSideBar userInfo={userData} /> */}
        </div>
      </div>
      {/* <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <SideBar userInfo={userData} isMobile={true} />
      </Drawer> */}
    </>
  );
}
