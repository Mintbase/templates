import { useApp } from "@/providers/app";
import React, { useEffect, useLayoutEffect, useState } from "react";

export const useCamera = () => {
 const { setCameraRef } = useApp();
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraLoaded, setCameraLoaded] = useState(false);
  const [permissionGranted, setPermission] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [picture, setPicture] = useState(null);

  const webcamRef = React.useRef(null);

  useLayoutEffect(() => {
    if (!pageLoaded) {
      const timeout = setTimeout(() => {
        setPageLoaded(true);
      }, 500); // 2000 milliseconds = 2 seconds

      return () => {
        // Clear the timeout if the component unmounts or the effect re-runs
        clearTimeout(timeout);
      };
    }
  }, []); //

  async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setPermission(true); // Update the permission state
      // Don't forget to close the stream
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      // User denied permission or some other error occurred
      console.error("Camera permission denied:", error);
    }
  }

  const askPermission = () => {
    navigator?.permissions
      .query({ name: "camera" as PermissionName })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          setPermission(true);
        } else if (permissionStatus.state === "prompt") {
          requestCameraPermission();
        } else {
          console.log("Camera permission denied.");
        }
      });
  };

  useEffect(() => {
    if (document) {
      document.body.classList.add("overflow-hidden");
    }
  }, []);

  useEffect(() => {
    // Check if camera permission is already granted
    askPermission();
  }, []);

  useEffect(() => {
    if (!webcamRef || !webcamRef.current) return;

    setCameraRef(webcamRef);
  }, [setCameraRef, webcamRef]);

  const toggleCamera = () => {
    const nextFacingMode =
      facingMode === "environment" ? "user" : "environment";

    setFacingMode(nextFacingMode);
  };

  const capture = React.useCallback(() => {
    const webcamScreen = webcamRef as any;
    const imageSrc = webcamScreen.current.getScreenshot();
    setPicture(imageSrc);
  }, [webcamRef]);

  const tryAgain = () => {
    setPicture(null);
  };

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (permissionGranted && initialLoad) {
      // Initialize the camera after permission is granted on initial load
      setCameraLoaded(true);
      setInitialLoad(false);
    }
  }, [permissionGranted, initialLoad]);

  return {
    tryAgain,
    capture,
    toggleCamera,
    setCameraLoaded,
    picture,
    setPicture,
    permissionGranted,
    pageLoaded,
    cameraLoaded,
    webcamRef,
    requestCameraPermission,
    facingMode,
  };
};
