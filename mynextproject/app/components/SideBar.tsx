"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddButton from "./buttons/AddButton";
import EditButton from "./buttons/EditButton";
import FavouriteBtn from "./buttons/FavouriteBtn";

function SideBar() {
  const [userContent, setUserContent] = useState([]);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    // Fetch user-specific content when the component mounts
    if (userId) {
      fetch(`/api/content/content?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserContent(data.content);
        })
        .catch((error) => {
          console.error("Error fetching user content", error);
        });
    }
  }, [userId]);

  return (
    <div>
      <FavouriteBtn/>
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className=" text-2xl">
          <Icon icon="line-md:arrow-open-right" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <AddButton />
          <EditButton htmlFor="my-drawer" docs={userContent} />
          <label
            htmlFor="my-drawer"
            className="flex justify-end mt-auto text-3xl"
          >
            <Icon icon="line-md:arrow-open-right" rotate={2} />
          </label>
        </ul>
      </div>
    </div>
    </div>
  );
}

export default SideBar;
