"use client";
import { useState, useEffect } from "react";

const useSplashAnimationComplete = (duration: number): boolean => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, duration);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [duration]);

  return animationComplete;
};

export default useSplashAnimationComplete;
