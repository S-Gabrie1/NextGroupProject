"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Header = () => {
  const [userId, setUserId] = useState("");
  const [isMainContentPage, setIsMainContentPage] = useState(false);

  useEffect(() => {
    // Check if localStorage is available (client-side) before using it
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
      
      // Access window.location only on the client-side
      setIsMainContentPage(window.location.pathname === "/maincontent");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 flex items-center justify-between h-20 px-3 teal-100 bg-slate-700">
      <Link href={"/"}>
        <h1 className=" font-bold text-2xl">WD</h1>
      </Link>
      <div className="flex flex-row justify-end gap-3">
        <Icon className=" text-3xl " icon="gg:profile" />
        {isMainContentPage && userId && (
          <button className="text-white" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;