/**
 * AvailabilityLineChart
 * 
 * Displays a custom animated line chart showing product availability ratings over the last 5 days.
 * Uses bouncing PNG balls as data points and animated axis labels.
 * 
 * Technologies:
 * - React with hooks (useState, useEffect)
 * - Recharts for chart layout
 * - Custom CSS animations for bounce and float effects
 * - Firebase hook useMetricByDay to fetch average availability per day
 * 
 * Visual behavior:
 * - Each rating is visualized as a ball icon with bouncing and idle float animation
 * - Rating values appear above the balls
 * - Each X-axis tick is shown as a labeled circle with a custom color
 */

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMetricByDay } from "../hooks/useMetricByDay";
import { useResizeObserver } from "../hooks/useResizeObserver";

// PNG icons for balls
import ball1 from "../assets/ball-1.png";
import ball2 from "../assets/ball-2.png";
import ball3 from "../assets/ball-3.png";
import ball4 from "../assets/ball-4.png";
import ball5 from "../assets/ball-5.png";

const ballIcons = [ball1, ball2, ball3, ball4, ball5];

const bounceAndFloatKeyframes = `
@keyframes bounceIn {
  0% {
    transform: scale(0.3) translateY(-100px);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) translateY(10px);
    opacity: 1;
  }
  70% {
    transform: scale(0.95) translateY(-5px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

@keyframes floatIdle {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
}
`;

// Inject animation styles if not already added
if (!document.getElementById("ball-animations")) {
  const style = document.createElement("style");
  style.id = "ball-animations";
  style.innerHTML = bounceAndFloatKeyframes;
  document.head.appendChild(style);
}

// Custom rendering for each dot (ball)
const CustomBallDot = ({ cx, cy, value, index, minBallSize, maxBallSize }) => {
  const clampedRating = Math.max(1, Math.min(5, Number(value) || 1));
  const normalized = (clampedRating - 1) / 4;
  const size = minBallSize + normalized * (maxBallSize - minBallSize);
  const offset = size / 2;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <g
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animation: visible
          ? `bounceIn 0.8s ${index * 0.2}s ease-out both, floatIdle 3s ${
              index * 0.2 + 1
            }s ease-in-out infinite`
          : "none",
      }}
    >
      {/* Ball icon */}
      <image
        href={ballIcons[index % ballIcons.length]}
        x={cx - offset}
        y={cy - offset}
        height={size}
        width={size}
        style={{ pointerEvents: "none" }}
      />
      {/* Numeric rating */}
      <text
        x={cx}
        y={cy - offset - 10}
        textAnchor="middle"
        fill="#000"
        fontSize={Math.max(12, Math.min(24, size * 0.24))}
        fontWeight="bold"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        {value.toFixed(1)}
      </text>
    </g>
  );
};

// X-axis circle labels
const COLORS = ["#0074D9", "#2ECC40", "#111111", "#FF4136", "#AAAAAA"];

const CustomXAxisTick = ({ x, y, payload, index, chartWidth }) => {
  const radius = Math.max(16, Math.min(34, chartWidth * 0.025));
  const color = COLORS[index % COLORS.length];
  const label = payload.value;

  return (
    <g transform={`translate(${x}, ${y + radius + 10})`}>
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill="#faf7f2"
        stroke={color}
        strokeWidth={4}
      />
      <text
        x={0}
        y={5}
        textAnchor="middle"
        fontSize={Math.max(9, Math.min(16, radius * 0.42))}
        fontWeight="bold"
        fill="#111"
      >
        {label}
      </text>
    </g>
  );
};

// Main chart component
const AvailabilityLineChart = () => {
  const data = useMetricByDay("availability");
  const [chartRef, chartSize] = useResizeObserver();
  const isMobile = chartSize.width > 0 && chartSize.width < 600;
  const minBallSize = isMobile
    ? Math.max(34, Math.min(44, chartSize.width * 0.12))
    : 85;
  const maxBallSize = Math.max(
    minBallSize + (isMobile ? 20 : 30),
    isMobile
      ? Math.min(78, Math.max(44, chartSize.width * 0.2))
      : Math.min(180, Math.min(chartSize.width * 0.1, chartSize.height * 0.3))
  );
  const dateRadius = Math.max(16, Math.min(34, chartSize.width * 0.025));
  const requiredSideMargin = Math.max(
    maxBallSize / 2 + 16,
    dateRadius + 16
  );

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
        justifyContent: "center",
      }}
    >
      {/* Chart title in Spanish */}
      <h2
        style={{
          color: "black",
          fontSize: "clamp(1rem, 2.2vw, 1.75rem)",
          fontWeight: "bold",
          margin: "clamp(0.5rem, 1.5vh, 1.25rem) 1rem",
          textAlign: "center",
        }}
      >
        ¿CÓMO CALIFICARÍAS LA DISPONIBILIDAD DE NUESTROS PRODUCTOS?
      </h2>

      {/* Chart container */}
      <div
        ref={chartRef}
        style={{
          width: "90%",
          maxWidth: "none",
          flex: 1,
          height: "calc(100% - clamp(3rem, 10vh, 5rem))",
          minHeight: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "none",
            height: "100%",
            minHeight: 0,
            overflow: "visible",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: chartSize.width < 600 ? 70 : 110,
                bottom: chartSize.width < 600 ? 64 : 86,
                left: requiredSideMargin,
                right: requiredSideMargin,
              }}
            >
            <XAxis
              dataKey="day"
              tick={(props) => <CustomXAxisTick {...props} chartWidth={chartSize.width} />}
              height={dateRadius * 2 + 24}
              interval={0}
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={[0, 5]} hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#000"
              strokeWidth={2}
              dot={(props) => (
                <CustomBallDot
                  {...props}
                  minBallSize={minBallSize}
                  maxBallSize={maxBallSize}
                />
              )}
              activeDot={false}
              isAnimationActive={false}
            />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityLineChart;
