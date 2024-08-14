import React, { useState, useEffect } from "react";

const WebcamSelector = ({ onDeviceSelected }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((deviceInfos) => {
        const videoDevices = deviceInfos.filter(
          (device) => device.kind === "videoinput"
        );
        console.log("Detected video devices:", videoDevices);
        setDevices(videoDevices);

        // Fallback to first device if no deviceId or label is available
        if (videoDevices.length > 0) {
          const firstDevice = videoDevices[0];
          setSelectedDeviceId(firstDevice.deviceId || "default");
          onDeviceSelected(firstDevice.deviceId || "default");
        }
      })
      .catch((error) => console.error("Error accessing devices:", error));
  }, [onDeviceSelected]);

  const handleDeviceChange = (event) => {
    const deviceId = event.target.value;
    setSelectedDeviceId(deviceId);
    onDeviceSelected(deviceId);
  };

  return (
    <div>
      <label>Select Webcam: </label>
      <select value={selectedDeviceId} onChange={handleDeviceChange}>
        {devices.map((device, index) => (
          <option key={index} value={device.deviceId || "default"}>
            {device.label || `Webcam ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WebcamSelector;
