import { useState } from "react";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import FrameBar from "./FrameBar";
import Preload from "./screens/Preload";
import Home from "./screens/Home";

function App() {
  const [hideFrame, setHideFrame] = useState(false);

  return (
    <div className="app">
      {!hideFrame && <FrameBar />}
      <div className="app_container">
        <HashRouter>
          <Route exact path="/" component={Home} />
          <Route path="/preload">
            <Preload setHideFrame={setHideFrame} />
          </Route>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
