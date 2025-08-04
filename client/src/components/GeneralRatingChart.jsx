/**
 * GeneralRatingChart
 * React component that displays the daily average general rating using a custom stacked
 * shoe and box visualization. Each bar is composed of stacked PNG boxes and a shoe on top.
 *
 *  Uses:
 * - useMetricByDay("general") hook to fetch average ratings per day (last 5 days).
 * - Recharts for chart rendering.
 * - framer-motion for entrance animation of each box and shoe.
 *
 *  Displays:
 * - Day circles with labels on X-axis.
 * - Stacked shoeboxes representing rating.
 * - Shoe image and numeric rating on top.
 * - Spanish title "¿QUÉ TAN BIEN VAMOS HOY?"
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

import shoeBlue from "../assets/shoe-blue.png";
import shoeGreen from "../assets/shoe-green.png";
import shoeBlack from "../assets/shoe-black.png";
import shoeRed from "../assets/shoe-red.png";
import shoeGray from "../assets/shoe-gray.png";
import boxBlue from "../assets/box-blue.png";
import boxRed from "../assets/box-red.png";
import boxGreen from "../assets/box-green.png";
import boxBlack from "../assets/box-black.png";
import boxGray from "../assets/box-gray.png";

import { motion } from "framer-motion";
import { useMetricByDay } from "../hooks/useMetricByDay";

//  Stacks of boxes per rating level
const boxColorCycle = [boxBlue, boxGreen, boxBlack, boxRed, boxGray];
const shoeColorCycle = [shoeBlue, shoeGreen, shoeBlack, shoeRed, shoeGray];

// Custom bar shape: stacked boxes + shoe + rating number
const ShoeBoxStack = ({ x, y, width, height, value, index }) => {
  const boxHeight = 70;
  const boxWidth = 170;
  const shoeSize = 150;
  const safeValue = Math.max(0, Math.round(value || 0)); // Ensure value is positive integer
  const boxes = Array.from({ length: safeValue }); // One box per rating level
  const totalStackHeight = boxHeight * safeValue;
  const boxImage = boxColorCycle[index % boxColorCycle.length];
  const shoeImage = shoeColorCycle[index % shoeColorCycle.length];

  return (
    <g transform={`translate(${x + (width - boxWidth) / 2}, ${y + height})`}>
      {/* Rating number on top of the stack */}
      <text
        x={boxWidth / 2}
        y={-totalStackHeight - shoeSize + 40}
        fill="#000"
        fontSize={20}
        fontWeight="bold"
        textAnchor="middle"
      >
        {value.toFixed(1)}
      </text>

      {/*/Animated shoeboxes */}
      {boxes.map((_, i) => (
        <motion.image
          key={i}
          href={boxImage}
          x={0}
          y={-boxHeight * (i + 1)}
          height={boxHeight}
          width={boxWidth}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2 + i * 0.1 + index * 0.4,
            duration: 0.3,
          }}
        />
      ))}

      {/* Shoe image at the top */}
      <motion.image
        href={shoeImage}
        x={(boxWidth - shoeSize) / 2}
        y={-totalStackHeight - shoeSize * 0.7}
        width={shoeSize}
        height={shoeSize}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2 + safeValue * 0.1 + index * 0.4,
          duration: 0.4,
        }}
      />
    </g>
  );
};

//  Day label colors for X-axis
const COLORS = ["#0074D9", "#2ECC40", "#111111", "#FF4136", "#AAAAAA"];

// Custom X-axis tick component showing day inside a styled circle
const CustomXAxisTick = ({ x, y, payload, index }) => {
  const radius = 50;
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
        strokeWidth={6}
      />
      <text
        x={0}
        y={5}
        textAnchor="middle"
        fontSize={14}
        fontWeight="bold"
        fill="#111"
      >
        {label}
      </text>
    </g>
  );
};

// Main chart component
const GeneralRatingChart = () => {
  const data = useMetricByDay("general"); // Last 5 days general average

  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        paddingTop: "40px",
      }}
    >
      {/* Chart Title */}
      <h2
        style={{
          color: "black",
          fontSize: "32px",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        ¿QUÉ TAN BIEN VAMOS HOY?
      </h2>

      {/* Bar Chart Container */}
      <div style={{ width: "90%", height: "80%" }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, bottom: 40 }}>
            <XAxis
              dataKey="day"
              tick={<CustomXAxisTick />}
              interval={0}
              height={90}
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={[0, 5]} hide />
            <Tooltip />
            <Bar
              dataKey="rating"
              fill="#ffffff00"
              barSize={60}
              shape={(props) => (
                <ShoeBoxStack
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  value={props.payload.rating}
                  index={props.index}
                />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GeneralRatingChart;
