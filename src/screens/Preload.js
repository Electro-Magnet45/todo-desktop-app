import React, { useEffect, useState } from "react";
import "./Preload.css";
import logo from "../folder/logo.png";
import { Helmet } from "react-helmet";
const { ipcRenderer } = window.require("electron");

const Preload = ({ setHideFrame }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setHideFrame(true);
    const notification = document.getElementById("notification");

    ipcRenderer.on("update_available", () => {
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
      <Helmet>
        <title>{progress === 0 ? "Todo" : "Updating - Todo"}</title>
      </Helmet>
      <div className="preload_container">
        <img src={logo} alt="" draggable={false} />
        <h1>TODO</h1>
        <div className="updateNotify">
          <div id="notification" className="">
            <div className="progress">
              <div id="progress-value" style={{ width: `${progress}%` }}></div>
            </div>
            {progress !== 0 && <p>Updating...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preload;
