import { useEffect, useRef } from "react";
import { useAnimation, Variants } from "framer-motion";

export const useShakeOnMount = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const shakeVariants: Variants = {
    hidden: { x: 0 },
    visible: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  // Call this manually after mount
  const trigger = () => controls.start("visible");

  return {
    ref,
    controls,
    variants: shakeVariants,
    trigger,
  };
};
