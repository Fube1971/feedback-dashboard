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
import { useResizeObserver } from "../hooks/useResizeObserver";

//  Stacks of boxes per rating level
const boxColorCycle = [boxBlue, boxGreen, boxBlack, boxRed, boxGray];
const shoeColorCycle = [shoeBlue, shoeGreen, shoeBlack, shoeRed, shoeGray];

// Custom bar shape: stacked boxes + shoe + rating number
const ShoeBoxStack = ({
  x,
  y,
  width,
  height,
  value,
  index,
  chartWidth,
}) => {
  const columnWidth = chartWidth > 0 ? chartWidth / 5 : width;
  const boxWidth = Math.max(48, Math.min(230, columnWidth * 0.65));
  const boxHeight = Math.max(28, Math.min(92, boxWidth * 0.4));
  const shoeSize = boxWidth * 0.86;
  const shoeOverlap = shoeSize * 0.1;
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
        y={-totalStackHeight - shoeSize - 12}
        fill="#000"
        fontSize={Math.max(12, Math.min(30, columnWidth * 0.08))}
        fontWeight="bold"
        textAnchor="middle"
      >
        {value.toFixed(1)}
      </text>

      {/* Animated shoeboxes below the shoe */}
      {boxes.slice(0, -1).map((_, i) => (
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
        y={-totalStackHeight - shoeSize + shoeOverlap}
        width={shoeSize}
        height={shoeSize}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2 + safeValue * 0.1 + index * 0.4,
          duration: 0.4,
        }}
      />

      {/* Top box edge overlaps the shoe slightly, as if it is stored inside. */}
      {safeValue > 0 && (
        <motion.image
          href={boxImage}
          x={0}
          y={-totalStackHeight}
          height={boxHeight}
          width={boxWidth}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2 + (safeValue - 1) * 0.1 + index * 0.4,
            duration: 0.3,
          }}
        />
      )}
    </g>
  );
};

//  Day label colors for X-axis
const COLORS = ["#0074D9", "#2ECC40", "#111111", "#FF4136", "#AAAAAA"];

// Custom X-axis tick component showing day inside a styled circle
const CustomXAxisTick = ({ x, y, payload, index, chartWidth }) => {
  const radius = Math.max(18, Math.min(36, chartWidth * 0.02));
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
const GeneralRatingChart = () => {
  const data = useMetricByDay("general"); // Last 5 days general average
  const [chartRef, chartSize] = useResizeObserver();
  const dateRadius = Math.max(18, Math.min(36, chartSize.width * 0.02));

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
      {/* Chart Title */}
      <h2
        style={{
          color: "black",
          fontSize: "clamp(1rem, 2.5vw, 2rem)",
          margin: "0 0 clamp(0.35rem, 1vh, 1rem)",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        ¿QUÉ TAN BIEN VAMOS HOY?
      </h2>

      {/* Bar Chart Container */}
      <div ref={chartRef} style={{ width: "100%", flex: 1, minHeight: 0 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, bottom: 40 }}>
            <XAxis
              dataKey="day"
              tick={(props) => <CustomXAxisTick {...props} chartWidth={chartSize.width} />}
              interval={0}
              height={dateRadius * 2 + 24}
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={[0, 5]} hide />
            <Tooltip />
            <Bar
              dataKey="rating"
              fill="#ffffff00"
              shape={(props) => (
                <ShoeBoxStack
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  value={props.payload.rating}
                  index={props.index}
                  chartWidth={chartSize.width}
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
