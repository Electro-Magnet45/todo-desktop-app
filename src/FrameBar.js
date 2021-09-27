import React, { useState, useEffect } from "react";
import "./FrameBar.css";
import { ReactComponent as Mimimize_icon } from "./folder/frame_minimize.svg";
import { ReactComponent as Maximize_icon } from "./folder/frame_maximize.svg";
import { ReactComponent as Restore_icon } from "./folder/frame_restore.svg";
import { ReactComponent as Close_icon } from "./folder/frame_close.svg";
import { ReactComponent as Profile_icon } from "./folder/frame_profile.svg";

const { ipcRenderer } = window.require("electron");
const ipc = ipcRenderer;

const FrameBar = () => {
  const [maximizeRes, setMaximizeRes] = useState("Maximize");

  const miniWindFunc = () => {
    ipc.send("minimizeApp");
  };
  const maximizeRestoreFunc = () => {
    ipc.send("maximizeRestoreApp");
  };
  const closeWindFunc = () => {
    ipc.send("closeApp");
  };

  useEffect(() => {
    ipc.on("isMaximized", () => setMaximizeRes("Restore"));
    ipc.on("isRestored", () => setMaximizeRes("Maximize"));
  }, []);

  return (
    <div className="frameBar">
      <div className="frameBar_container">
        <div className="frameBar-cont_profile">
          <Profile_icon />
        </div>
        <div className="frameBar-cont_btns">
          <div
            className="frameBar-cont-btn_div"
            title="Minimize"
            onClick={miniWindFunc}
          >
            <Mimimize_icon />
          </div>
          <div
            className="frameBar-cont-btn_div"
            title={maximizeRes}
            onClick={maximizeRestoreFunc}
          >
            {maximizeRes === "Restore" ? <Maximize_icon /> : <Restore_icon />}
          </div>
          <div
            className="frameBar-cont-btn_div"
            title="Close"
            onClick={closeWindFunc}
          >
            <Close_icon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameBar;
