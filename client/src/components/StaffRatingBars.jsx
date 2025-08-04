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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMetricByDay } from "../hooks/useMetricByDay";
import adidasLogoBlack from "../assets/adidas-logo-black.png";
import adidasLogoWhite from "../assets/adidas-logo-white.png";
import { motion } from "framer-motion";

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

  // Custom bar shape for each row
  const CustomStaffBar = (props) => {
    const { x, y, height, index, value } = props;

    const color = COLORS[index % COLORS.length];
    const logo = color === "#111111" ? adidasLogoWhite : adidasLogoBlack;

    const blockSize = height;
    const ratingMaxWidth = 600;
    const ratingBarLength = (value / 5) * ratingMaxWidth;
    const totalWidth = blockSize + ratingMaxWidth + blockSize;

    return (
      <g transform={`translate(${x}, ${y})`}>
        {/* Outer border box around full row */}
        <rect
          x={0}
          y={0}
          width={totalWidth}
          height={blockSize}
          fill="none"
          stroke="black"
          strokeWidth={1.5}
        />

        {/* Left square with day index */}
        <rect
          x={0}
          y={0}
          width={blockSize}
          height={blockSize}
          fill={color}
          stroke="black"
        />
        <text
          x={blockSize / 2}
          y={blockSize / 2 + 5}
          fill="white"
          fontSize={16}
          fontWeight="bold"
          textAnchor="middle"
        >
          {index + 1}
        </text>

        {/* Main rating bar */}
        <motion.rect
          x={blockSize}
          y={0}
          height={blockSize}
          initial={{ width: 0 }}
          animate={{ width: ratingBarLength }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          fill={color}
          stroke="black"
        />

        {/* Adidas logo floating at the end of the bar */}
        {value > 0 && (
          <motion.image
            href={logo}
            y={0}
            width={blockSize}
            height={blockSize}
            preserveAspectRatio="xMidYMid meet"
            initial={{ x: blockSize }}
            animate={{ x: blockSize + ratingBarLength - blockSize - 10 }}
            transition={{
              delay: index * 0.1,
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        )}

        {/* Final rating text block */}
        <rect
          x={blockSize + ratingMaxWidth}
          y={0}
          width={blockSize}
          height={blockSize}
          fill="white"
          stroke="black"
        />
        <text
          x={blockSize + ratingMaxWidth + blockSize / 2}
          y={blockSize / 2 + 5}
          fill="black"
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
        >
          {value.toFixed(1)}/5
        </text>
      </g>
    );
  };

  // Custom Y-axis tick showing each day inside a colored circle
  const CustomYAxisTick = ({ x, y, payload, index }) => {
    const barHeight = 100;
    const radius = barHeight / 2;
    const color = COLORS[index % COLORS.length];
    const label = payload.value;
    const xOffset = 70; // move label circle further left

    return (
      <g transform={`translate(${x - xOffset}, ${y - radius})`}>
        <circle
          cx={0}
          cy={radius}
          r={radius}
          fill="#faf7f2"
          stroke={color}
          strokeWidth={6}
        />
        <text
          x={0}
          y={radius + 5}
          textAnchor="middle"
          fontSize={14}
          fill="#111"
          fontWeight="bold"
        >
          {label}
        </text>
      </g>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Chart Title*/}
      <h2
        style={{
          color: "black",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "1px",
          marginTop: "-8rem",
        }}
      >
        ¿CÓMO TE ATENDIMOS?
      </h2>

      {/* Chart container */}
      <div style={{ width: "90%", maxWidth: "1200px", height: "75%" }}>
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, bottom: 40, left: 100, right: 60 }}
            barCategoryGap={30}
          >
            <XAxis type="number" domain={[0, 5]} stroke="#000" hide />
            <YAxis
              type="category"
              dataKey="day"
              tick={<CustomYAxisTick />}
              width={90}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="rating"
              barSize={100}
              shape={(props) => <CustomStaffBar {...props} />}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaffRatingChart;
