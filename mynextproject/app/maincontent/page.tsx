"use client";
import React from "react";
import TextEditor from "../components/TextEditor";
import SideBar from "../components/SideBar";

function MainContent() {
  return (
    <div>
      <div className="m-7">
        <SideBar />
        <TextEditor />
      </div>
    </div>
  );
}

export default MainContent;
