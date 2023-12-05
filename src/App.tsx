import React from "react";
import "./App.css";
import VideoChat from "./WebRTC/VideoChat";
import InitScene from "./scenes/InitScene";
import UI from "./compoent/UI";
import Notions from "./compoent/Notions";

function App() {
  return (
    <div className="App">
      <div className="ui-section h-full">
        <UI />
      </div>
      <div id="modal-section" className="modal-section hidden">
        <Notions />
      </div>
      <div className="init-section"></div>
      <div className="phaser-section"></div>
      {/* <VideoChat /> */}
    </div>
  );
}

export default App;
