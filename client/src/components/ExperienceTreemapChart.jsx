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
        fontSize="clamp(20px, 2vw, 28px)"
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
        height: "80%",
        backgroundColor: "white",
        padding: "0rem",
      }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "clamp(24px, 3vw, 36px)",
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
          gap: "10rem",
          marginBottom: "2rem",
          marginTop: "-1rem",
        }}
      >
        {labels.map((label, i) => (
          <div
            key={i}
            style={{
              width: "clamp(80px, 6vw, 110px)",
              height: "clamp(80px, 6vw, 110px)",
              fontSize: "clamp(12px, 1.5vw, 18px)",
              borderRadius: "50%",
              backgroundColor: "#faf7f2",
              border: `6px solid ${label.color}`,
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
      <ResponsiveContainer width="100%" height="80%">
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
  );
};

export default ExperienceTreemapChart;
