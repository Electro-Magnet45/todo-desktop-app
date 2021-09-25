import React, { useEffect, useState } from "react";
import "./Preload.css";
import logo from "../folder/logo.png";
const { ipcRenderer } = window.require("electron");

const Preload = ({ setHideFrame }) => {
  const [progress, setProgress] = useState();

  useEffect(() => {
    setHideFrame(true);
    ipcRenderer.on("update_available", () => {
      const notification = document.getElementById("notification");
      ipcRenderer.removeAllListeners("update_available");
      notification.classList.remove("hidden");
    });
    ipcRenderer.on("upprogress", (event, value) => setProgress(value));

    return () => {
      setHideFrame(false);
    };
  }, []);

  return (
    <div className="preload">
      <div className="preload_container">
        <img src={logo} alt="" draggable={false} />
        <h1>TODO</h1>
        <div className="updateNotify">
          <div id="notification" className="hidden">
            <progress id="file" value={progress} max="100">
              {progress}%
            </progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preload;
