import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import profileIcon from "@/assets/profile.jpg";
import Image from "next/image";
// import socket from "../services/socket";

const SideBar = ({ userInfo, isMobile }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const { data: session } = useSession();
//   console.log(session)
  //   useEffect(() => {
  //     socket.on("friendRequest", (data) => {
  //       if (data.message) {
  //         getAllNotifications();
  //       }
  //     });

  //     return () => {
  //       socket.off("friendRequest");
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const count = notification?.filter((item) => !item?.isOpen).length;
  //     setNotificationCount(count);
  //   }, [notification]);

  //   const getData = useCallback(async () => {
  //     await getAllNotifications();
  //   }, []);

  //   const getAllNotifications = async () => {
  //     const res = await getNotifications();
  //     setNotification(res?.data?.notifications);
  //   };

  //   useEffect(() => {
  //     getData();
  //   }, []);

  //   useEffect(() => {
  //     setActiveNav(pathname);
  //   }, [pathname]);

  return (
    <div
      className={`flex flex-col  items-center ${
        isMobile ? "py-5" : "py-20 h-screen"
      } `}
    >
      {session ? (
        <>
          <div className="mb-8">
            <Image
              width={100}
              height={100}
              src={userInfo?.image ? userInfo?.image : profileIcon}
              className="w-[100px] h-[100px] rounded-full"
              alt={userInfo?.name}
            />
            <h1 className="text-center font-semibold text-[18px] mt-2">
              {userInfo?.name}
            </h1>
            <p className="text-center">{userInfo?.bio}</p>
          </div>
          {/* {url.map((item, index) => {
            return (
              <div className="mt-2" key={index}>
                <Link
                  to={item?.url}
                  className={`hover:bg-black px-5 h-11 font-semibold w-[200px] rounded-2xl hover:text-white  text-left inline-flex items-center ${
                    activeNav === item?.url
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  style={{
                    transition:
                      "background-color 0.3s ease-out, border-width 0.3s ease-out",
                  }}
                >
                  {item.icon({ size: "20" })}
                  <span className="ml-3 text-[15px]">
                    {item?.name}
                    {item.name === "Notification" &&
                      notificationCount !== 0 && (
                        <span className="absolute px-1 py-[2px]  mt-[-2px] animate-pulse ml-1 rounded-full text-white text-[8px] bg-red-500">
                          {notificationCount}
                        </span>
                      )}
                  </span>
                </Link>
              </div>
            );
          })} */}
          <div className="mt-2">
            <div
              href={"/dash"}
              onClick={() => signOut()}
              className="hover:bg-black px-5 h-11 w-[200px]  font-semibold rounded-2xl hover:text-white text-black text-left inline-flex items-center"
            >
              <IoIosLogOut size={20} />{" "}
              <span className="ml-3 text-[15px]"> Logout</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-between mt-[40%] px-4">
            <div>
              <h1 className="text-justify font-semibold text-[16px] ">
                Login or sign up for SMA to connect with friends, family and
                people you know.
              </h1>
            </div>
            <Link
              href={"/"}
              className="text-white bg-blue-500 hover:bg-blue-600 px-10 py-1 rounded mt-4"
            >
              Login{" "}
            </Link>
            <p className="mt-4">or</p>
            <Link
              href={"/sign-up"}
              className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded mt-4"
            >
              Create New Account Account{" "}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
