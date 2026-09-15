/**
 * WaitTimeShirtChart
 *
 * Displays a visual chart where each day's wait time rating is represented
 * as a vertical stack of overlapping shirt images.
 * - Each column corresponds to one day (up to 5 days).
 * - The number of shirts is determined by the rounded rating (1–5).
 * - Day labels are displayed using PNG tags, and rating is shown numerically below.
 *
 * Uses:
 * - useMetricByDay("waitTime") hook to fetch ratings from Firebase
 * - Custom shirt and label images per day
 * - Responsive layout using viewport-relative units (vw, vh)
 */

import React from "react";
import { useMetricByDay } from "../hooks/useMetricByDay";

// Shirt stack images
import shirtBlue from "../assets/shirt-blue.png";
import shirtGreen from "../assets/shirt-green.png";
import shirtBlack from "../assets/shirt-black.png";
import shirtRed from "../assets/shirt-red.png";
import shirtGray from "../assets/shirt-gray.png";

// Label (day) shirt images
import labelShirt1 from "../assets/labelsShirt1.png";
import labelShirt2 from "../assets/labelsShirt2.png";
import labelShirt3 from "../assets/labelsShirt3.png";
import labelShirt4 from "../assets/labelsShirt4.png";
import labelShirt5 from "../assets/labelsShirt5.png";

// Image arrays
const SHIRTS = [shirtBlue, shirtGreen, shirtBlack, shirtRed, shirtGray];
const LABELS = [
  labelShirt1,
  labelShirt2,
  labelShirt3,
  labelShirt4,
  labelShirt5,
];

const WaitTimeShirtChart = () => {
  const data = useMetricByDay("waitTime");

  // Layout sizing (viewport-relative units)
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(0.5rem, 2vh, 1.5rem) clamp(0.5rem, 2vw, 2rem)",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: "clamp(0.95rem, 2.2vw, 2rem)",
          fontWeight: "bold",
          margin: "0 0 clamp(0.5rem, 1vh, 1rem)",
          textAlign: "center",
        }}
      >
        ¿CÓMO CALIFICARÍAS EL TIEMPO DE ESPERA EN NUESTRA TIENDA?
      </h2>

      {/* Chart Container */}
      <div
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "none",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          position: "relative",
          minHeight: 0,
          overflow: "hidden",
          gap: "clamp(0.15rem, 1vw, 1rem)",
          flexDirection: "column",
        }}
      >
        {/* Day labels stay above the shirt stage. */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "clamp(0.15rem, 1vw, 1rem)",
          }}
        >
          {data.map((entry, index) => {
            const label = LABELS[index % LABELS.length];

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "clamp(42px, 7vw, 150px)",
                  maxWidth: "150px",
                  minWidth: "42px",
                }}
              >
                <img
                  src={label}
                  alt={`Label ${index + 1}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "clamp(0.45rem, 1.1vw, 1rem)",
                    fontWeight: "bold",
                    color: index === 2 ? "white" : "black",
                    textShadow: index === 2 ? "none" : "1px 1px 2px white",
                    pointerEvents: "none",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                  }}
                >
                  {entry.day}
                </div>
              </div>
            );
          })}
        </div>

        {/* Shared coordinate system for all shirt stacks. */}
        <div
          style={{
            position: "relative",
            flex: "0 0 clamp(120px, 38vh, 360px)",
            height: "clamp(120px, 38vh, 360px)",
            width: "100%",
            maxWidth: "none",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              gap: "clamp(0.15rem, 1vw, 1rem)",
              zIndex: 1,
            }}
          >
            {data.map((entry, index) => {
              const shirt = SHIRTS[index % SHIRTS.length];
              const rating = typeof entry.rating === "number" ? entry.rating : 0;
              const rounded = Math.max(1, Math.round(rating));

              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "clamp(40px, 13vw, 220px)",
                    height: "100%",
                    minWidth: 0,
                  }}
                >
                  {Array.from({ length: rounded }).map((_, i) => (
                    <img
                      key={i}
                      src={shirt}
                      alt={`shirt-${i}`}
                      style={{
                        position: "absolute",
                        left: `${(rounded - 1 - i) * 12}%`,
                        bottom: 0,
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        zIndex: i + 1,
                        animation: `slideBounceLeft 0.8s cubic-bezier(0.25, 1.25, 0.5, 1) ${
                          i * 0.2
                        }s forwards, sway 3s ease-in-out ${
                          0.8 + i * 0.2
                        }s infinite`,
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            flexShrink: 0,
            minHeight: "clamp(1.5rem, 4vh, 2.5rem)",
            paddingBottom: "clamp(0.5rem, 1.5vh, 1rem)",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "space-evenly",
            gap: "clamp(0.15rem, 1vw, 1rem)",
          }}
        >
          {data.map((entry, index) => (
            <div
              key={index}
              style={{
                width: "clamp(40px, 13vw, 220px)",
                textAlign: "center",
                fontSize: "clamp(0.75rem, 1.2vw, 1.5rem)",
                fontWeight: "bold",
              }}
            >
              {Number(entry.rating || 0).toFixed(1)}/5
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaitTimeShirtChart;
