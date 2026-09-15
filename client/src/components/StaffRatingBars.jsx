/**
 * StaffRatingChart
 *
 * Displays a vertical bar chart showing customer ratings of staff attention over the last 5 days.
 * Each bar is animated and contains:
 * - A left colored square showing the day index
 * - An animated horizontal bar representing the score
 * - An Adidas logo floating to the end of the bar
 * - A final square showing the numeric rating (e.g., "4.2/5")
 *
 * X-axis is hidden (as it's always a 0–5 range).
 * Y-axis has custom circles with day labels.
 *
 * Technologies:
 * - React + Recharts
 * - useMetricByDay hook (Firebase data)
 * - framer-motion for animations
 */

import React from "react";
import { useMetricByDay } from "../hooks/useMetricByDay";
import adidasLogoBlack from "../assets/adidas-logo-black.png";
import adidasLogoWhite from "../assets/adidas-logo-white.png";
import { motion } from "framer-motion";
import "./StaffRatingBars.css";

// Color palette for each day's bar
const COLORS = [
  "#0074D9", // Blue
  "#2ECC40", // Green
  "#111111", // Black
  "#FF4136", // Red
  "#AAAAAA", // Gray
];

const StaffRatingChart = () => {
  const data = useMetricByDay("staff");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        boxSizing: "border-box",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "clamp(0.5rem, 2vh, 1.5rem) clamp(0.5rem, 2vw, 2rem)",
      }}
    >
      {/* Chart Title*/}
      <h2
        style={{
          color: "black",
          fontSize: "clamp(1rem, 2.2vw, 1.75rem)",
          fontWeight: "bold",
          margin: "0 0 clamp(0.35rem, 1vh, 1rem)",
          textAlign: "center",
        }}
      >
        ¿CÓMO TE ATENDIMOS?
      </h2>

      <div className="staff-chart" aria-label="Calificación de atención del personal">
        {data.map((entry, index) => {
          const rating = Math.max(0, Math.min(5, Number(entry.rating) || 0));
          const percentage = (rating / 5) * 100;
          const color = COLORS[index % COLORS.length];
          const logo = color === "#111111" ? adidasLogoWhite : adidasLogoBlack;

          return (
            <div className="staff-row" key={entry.day || index}>
              <div
                className="staff-date"
                style={{ "--staff-color": color }}
              >
                {entry.day}
              </div>
              <div className="staff-bar" style={{ "--staff-color": color }}>
                <div className="staff-index">{index + 1}</div>
                <div className="staff-track">
                  <motion.div
                    className="staff-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                  {rating > 0 && (
                    <motion.img
                      className="staff-runner"
                      src={logo}
                      alt=""
                      style={{
                        left: `${percentage}%`,
                        transform:
                          rating === 5
                            ? "translate(-100%, -50%)"
                            : "translate(-100%, -50%)",
                      }}
                      initial={{ left: 0 }}
                      animate={{ left: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  )}
                </div>
                <div className="staff-score">{rating.toFixed(1)}/5</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaffRatingChart;
