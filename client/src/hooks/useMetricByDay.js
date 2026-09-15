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
import { getDemoRating } from "../utils/demoData";
import { addDays, format, startOfDay, subDays } from "date-fns";
import { es } from "date-fns/locale";

//Custom hook that calculates average ratings per day for a given metric
//Used in the display charts to show data for the last 5 days
export const useMetricByDay = (metric = "general") => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMetric = async () => {
      const today = new Date();
      const startDate = startOfDay(subDays(today, 4));
      const endDate = startOfDay(addDays(today, 1));
      const lastFiveDays = Array.from({ length: 5 }, (_, index) =>
        subDays(startDate, -index)
      );
      const demoResult = lastFiveDays.map((dateObj) => {
        const dateKey = format(dateObj, "yyyy-MM-dd");

        return {
          day: format(dateObj, "dd MMM", { locale: es }),
          rating: getDemoRating(dateKey, metric),
          source: "demo",
        };
      });

      // Query only approved feedbacks that gave consent, in the last 5 days
      const q = query(
        collection(db, "feedbacks"),
        where("status", "==", "approved"),
        where("consent", "==", "si"),
        where("timestamp", ">=", startDate)
      );

      try {
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
          } catch (error) {
            console.warn("Skipped feedback due to invalid timestamp:", feedback);
            return;
          }

          // Keep only feedback from the five current calendar days.
          if (dateValue < startDate || dateValue >= endDate) return;

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
            const validParts = parts.filter((number) => typeof number === "number");
            if (validParts.length > 0) {
              const average =
                validParts.reduce((sum, number) => sum + number, 0) /
                validParts.length;
              value = parseFloat(average.toFixed(2));
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

        const completeResult = lastFiveDays.map((dateObj) => {
          const label = format(dateObj, "dd MMM", { locale: es });
          const values = dayMap[label];
          const dateKey = format(dateObj, "yyyy-MM-dd");

          if (!values || values.length === 0) {
            return {
              day: label,
              rating: getDemoRating(dateKey, metric),
              source: "demo",
            };
          }

          return {
            day: label,
            rating: parseFloat(
              (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2)
            ),
            source: "real",
          };
        });

        setData(completeResult);
      } catch (error) {
        console.error("Error fetching approved feedback metrics:", error);
        setData(demoResult);
      }
    };

    fetchMetric();

    const refreshTimer = setInterval(fetchMetric, 60000);

    return () => clearInterval(refreshTimer);
  }, [metric]);

  return data;
};
