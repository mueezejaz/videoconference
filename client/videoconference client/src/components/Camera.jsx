// src/components/Camera.jsx

import React, { useEffect, useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("Error accessing camera: " + err.message);
      }
    };

    getUserMedia();

    return () => {
      // Cleanup: stop all tracks to release the camera
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Camera</h1>
      {error && <p>{error}</p>}
      <video className="w-full h-full" ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default Camera;
