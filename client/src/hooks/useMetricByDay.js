/**
 * useMetricByDay
 * Custom React hook that calculates daily average ratings for a specific metric
 * (e.g., availability, staff, waitTime, experience, or overall general average).
 *
 * It:
 * - Fetches only approved feedbacks with consent from the last 5 days.
 * - Aggregates responses per day (label format: "dd MMM").
 * - Returns an array with 5 objects: { day, rating }.
 *
 * Used by all chart components to build day-by-day visualizations.
 */

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { format, subDays, isAfter } from "date-fns";
import { es } from "date-fns/locale";

//Custom hook that calculates average ratings per day for a given metric
//Used in the display charts to show data for the last 5 days
export const useMetricByDay = (metric = "general") => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMetric = async () => {
      const today = new Date();
      const fiveDaysAgo = subDays(today, 4); // Today + 4 previous days

      // Query only approved feedbacks that gave consent, in the last 5 days
      const q = query(
        collection(db, "feedbacks"),
        where("status", "==", "approved"),
        where("consent", "==", "si"),
        where("timestamp", ">=", fiveDaysAgo)
      );

      const snapshot = await getDocs(q);
      const dayMap = {}; // Holds ratings grouped by day

      snapshot.forEach((doc) => {
        const feedback = doc.data();

        // Parse timestamp into valid Date object
        let dateValue;
        try {
          if (feedback.timestamp?.toDate) {
            dateValue = feedback.timestamp.toDate();
          } else if (
            typeof feedback.timestamp === "string" ||
            feedback.timestamp instanceof Date
          ) {
            dateValue = new Date(feedback.timestamp);
          }

          if (!dateValue || isNaN(dateValue.getTime()))
            throw new Error("Invalid timestamp");
        } catch (e) {
          console.warn("Skipped feedback due to invalid timestamp:", feedback);
          return;
        }

        // Skip entries older than 5 days
        if (!isAfter(dateValue, subDays(today, 5))) return;

        // Format label for x-axis (ex, "30 jul")
        const label = format(dateValue, "dd MMM", { locale: es });

        // Extract value to graph based on the selected metric
        let value;
        if (metric === "general") {
          const parts = [
            feedback.availability,
            feedback.experience,
            feedback.staff,
            feedback.waitTime,
          ];
          const validParts = parts.filter((n) => typeof n === "number");
          if (validParts.length > 0) {
            const avg = validParts.reduce((a, b) => a + b, 0) / validParts.length;
            value = parseFloat(avg.toFixed(2));
          }
        } else {
          value = feedback[metric];
        }

        // Add valid rating to the corresponding day
        if (typeof value === "number" && !isNaN(value)) {
          if (!dayMap[label]) dayMap[label] = [];
          dayMap[label].push(value);
        }
      });

      //Average values for each day
      const result = Object.entries(dayMap).map(([day, values]) => ({
        day,
        rating: parseFloat(
          (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
        ),
      }));

      //Ensure last 5 days are present, even with 0 values
      const lastFiveDays = Array.from({ length: 5 }, (_, i) =>
        subDays(today, 4 - i)
      );

      const completeResult = lastFiveDays.map((dateObj) => {
        const label = format(dateObj, "dd MMM", { locale: es });
        const match = result.find((r) => r.day === label);
        return {
          day: label,
          rating: match ? match.rating : 0,
        };
      });

      setData(completeResult);
    };

    fetchMetric();
  }, [metric]);

  return data;
};
