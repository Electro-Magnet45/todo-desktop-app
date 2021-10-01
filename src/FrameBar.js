import React, { useState, useEffect } from "react";
import "./FrameBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowRestore,
  faSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faTimes, faMinus } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="frameBar-cont_btns">
          <div
            className="frameBar-cont-btn_div"
            title="Minimize"
            onClick={miniWindFunc}
          >
            <FontAwesomeIcon icon={faMinus} />
          </div>
          <div
            className="frameBar-cont-btn_div"
            title={maximizeRes}
            onClick={maximizeRestoreFunc}
          >
            {maximizeRes === "Restore" ? (
              <FontAwesomeIcon icon={faWindowRestore} />
            ) : (
              <FontAwesomeIcon icon={faSquare} />
            )}
          </div>
          <div
            className="frameBar-cont-btn_div"
            title="Close"
            onClick={closeWindFunc}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameBar;
