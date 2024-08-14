// src/components/VideoStream.js

import React, { useEffect, useRef } from "react";

const VideoStream = ({ deviceId }) => {
  const videoRef = useRef(null);
  // src/components/VideoStream.js

  useEffect(() => {
    const constraints = {
      video: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing media devices.", error));
  }, []);

  useEffect(() => {
    if (deviceId) {
      const constraints = {
        video: { deviceId: { exact: deviceId } },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          console.log("Streaming video from device:", deviceId);
          videoRef.current.srcObject = stream;
        })
        .catch((error) =>
          console.error("Error accessing media devices.", error)
        );
    }
  }, [deviceId]);

  return <video ref={videoRef} autoPlay />;
};

export default VideoStream;
