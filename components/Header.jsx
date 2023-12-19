"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { CgMenuRound, CgLogOut } from "react-icons/cg";

const Header = ({ setIsOpen, isGuest }) => {
  return (
    <div className="bg-white fixed top-0 w-full z-10">
      <div className="h-[60px] flex flex-row justify-between items-center align-middle px-2">
        <div>
          <CgMenuRound size={30} onClick={() => setIsOpen(true)} />
        </div>
        {!isGuest && (
          <div>
            <CgLogOut
              size={30}
              onClick={() => {
                signOut()
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
