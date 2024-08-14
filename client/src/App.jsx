// src/App.js

import React, { useState } from "react";
import WebcamSelector from "./components/WebcamSelector";
import VideoStream from "./components/VideoStream";

function App() {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  return (
    <div>
      <h1>Webcam Selector and Video Stream</h1>
      <WebcamSelector onDeviceSelected={setSelectedDeviceId} />
      {selectedDeviceId && <VideoStream deviceId={selectedDeviceId} />}
    </div>
  );
}

export default App;
