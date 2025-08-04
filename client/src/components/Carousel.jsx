/**
 * Carousel
 *
 * This component cycles through a list of visual components (`slides`)
 * at a fixed interval. Only one slide is visible at a time, and transitions
 * between them are animated using Framer Motion.
 *
 * Props:
 * - slides: An array of React elements (charts,)
 * - duration: Optional time per slide in milliseconds (default: 8000ms)
 *
 * Behavior:
 * - Uses state (`index`) to track the current slide
 * - Uses `setInterval` inside `useEffect` to automatically advance
 * - Uses `<AnimatePresence>` and `<motion.div>` for smooth fade and slide animations
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ slides, duration = 8000 }) => {
  const [index, setIndex] = useState(0); // Current slide index

  useEffect(() => {
    // Start timer to update slide every `duration` ms
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, duration);

    // Clear timer on component unmount
    return () => clearInterval(interval);
  }, [slides.length, duration]);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index} // Key triggers re-animation when slide changes
          initial={{ opacity: 0, x: 100 }} // Start off-screen right
          animate={{ opacity: 1, x: 0 }}    // Fade in and center
          exit={{ opacity: 0, x: -100 }}    // Fade out and exit left
          transition={{ duration: 0.8 }}    // Animation timing
          style={{ position: "absolute", width: "100%", height: "100%" }}
        >
          {slides[index]} {/* Render the current slide */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
