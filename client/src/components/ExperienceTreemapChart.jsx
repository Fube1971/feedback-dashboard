/**
 * ExperienceTreemapChart
 *
 * Displays a treemap visualization showing how users rated their overall shopping experience.
 * - Each box represents a different day (last 5 days).
 * - The size of each box is proportional to the rating.
 * - Boxes are visually styled as shoebox PNGs.
 * - Ratings are displayed inside each box.
 * - Animated entrance using Framer Motion.
 * - A label legend (colored circles with dates) is shown above.
 *
 * Uses:
 * - Firebase hook `useMetricByDay("experience")`
 * - Shoebox PNG assets and weekday color-labels
 * - Recharts Treemap with custom cells
 */

import React from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import { motion } from "framer-motion";
import { useMetricByDay } from "../hooks/useMetricByDay";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Shoebox PNG assets
import boxBlue from "../assets/shoebox-blue.png";
import boxGreen from "../assets/shoebox-green.png";
import boxBlack from "../assets/shoebox-black.png";
import boxRed from "../assets/shoebox-red.png";
import boxGray from "../assets/shoebox-gray.png";
import boxWhite from "../assets/whiteimage.png";

// Shoebox images cycle by day index
const boxColorCycle = [boxBlue, boxGreen, boxBlack, boxRed, boxGray];

// Format date to "dd MMM" in Spanish (e.g., "03 ago")
const formatShortDate = (rawValue) => {
  try {
    const parsed = new Date(rawValue);
    if (isNaN(parsed)) return rawValue;
    return format(parsed, "dd MMM", { locale: es });
  } catch {
    return rawValue;
  }
};

// Custom render function for each Treemap cell (shoebox + rating)
const renderAnimatedTreemapCell = (props) => {
  const { x, y, width, height, index, value, payload, depth } = props;
  if (depth === 0) return null; // Root node is skipped

  const colorIndex = payload?.colorIndex ?? index;
  const hasValidValue = typeof value === "number" && !isNaN(value);

  const boxImage = hasValidValue
    ? boxColorCycle[colorIndex % boxColorCycle.length]
    : boxWhite;

  const isBlackBox = colorIndex === 2;
  const textColor = isBlackBox ? "white" : "black";
  const ratingDisplay = hasValidValue ? `${value.toFixed(1)}/5` : "";

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.2 + index * 0.2,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {/* Shoebox Image as background */}
      <image
        href={boxImage}
        x={x}
        y={y}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid slice"
      />

      {/* Numeric Rating Text */}
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill={textColor}
        fontSize={Math.max(12, Math.min(44, Math.min(width, height) * 0.18))}
        fontWeight="bold"
        style={{
          pointerEvents: "none",
          stroke: "none",
          filter: "none",
        }}
      >
        {ratingDisplay}
      </text>
    </motion.g>
  );
};

const ExperienceTreemapChart = () => {
  // Fetch experience data by day
  const rawData = useMetricByDay("experience");

  // Prepare Recharts input
  const data = rawData.map((entry, i) => ({
    name: entry.day,
    rating: entry.rating,
    colorIndex: i,
  }));

  // Labels for colored circle legend
  const COLORS = ["#0074D9", "#2ECC40", "#111111", "#FF4136", "#AAAAAA"];
  const labels = data.map((d, i) => ({
    date: formatShortDate(d.name),
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        backgroundColor: "white",
        padding: "clamp(0.5rem, 1.5vh, 1.25rem) clamp(0.5rem, 2vw, 2rem)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          margin: "0 0 clamp(0.5rem, 1vh, 1rem)",
          fontSize: "clamp(0.9rem, 3vw, 2.25rem)",
          fontFamily: "Arial, sans-serif",
          color: "black",
        }}
      >
        ¿CÓMO CALIFICARÍAS TU EXPERIENCIA DE COMPRA EN NUESTRA TIENDA?
      </h2>

      {/* Colored circle legend with labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(0.3rem, 2vw, 2rem)",
          marginBottom: "clamp(0.4rem, 1vh, 1rem)",
          marginTop: 0,
          flexWrap: "wrap",
          maxWidth: "100%",
        }}
      >
        {labels.map((label, i) => (
          <div
            key={i}
            style={{
              width: "clamp(34px, 5vw, 120px)",
              height: "clamp(34px, 5vw, 120px)",
              fontSize: "clamp(0.5rem, 1.2vw, 1.1rem)",
              borderRadius: "50%",
              backgroundColor: "#faf7f2",
              border: `clamp(2px, 0.35vw, 5px) solid ${label.color}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#111",
            }}
          >
            {label.date}
          </div>
        ))}
      </div>

      {/* Treemap Chart */}
      <div style={{ width: "100%", flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="rating"
          content={renderAnimatedTreemapCell}
          stroke="white"
          aspectRatio={4 / 3}
          label={false}
          type="flat"
          isAnimationActive={false}
        />
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExperienceTreemapChart;
