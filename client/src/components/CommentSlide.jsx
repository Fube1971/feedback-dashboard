/**
 * CommentSlide
 *
 * This component displays a continuous animation of floating user comments
 * that have been approved and have given consent to be shown.
 *
 * Data:
 * - Fetches real-time updates from Firestore using `onSnapshot`
 * - Only shows feedbacks with `status: "approved"` and `consent: "si"`
 *
 * Animation Logic:
 * - Duplicates the comment list to ensure a constant flow
 * - Assigns each comment to one of 6 "lanes" (vertical rows)
 * - Calculates delay and positioning for each to float across screen
 *
 * Styles are handled by `CommentSlide.css`
 */

import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "./CommentSlide.css";

const CommentSlide = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Firestore query to listen for approved comments with consent
    const q = query(
      collection(db, "feedbacks"),
      where("status", "==", "approved"),
      where("consent", "==", "si")
    );

    // Real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setComments(data);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  // Create a large pool of repeated comments for infinite animation
  const repeated = [];
  const repeatCount = 50; // Total number of floating comments

  if (comments.length > 0) {
    while (repeated.length < repeatCount) {
      comments.forEach((item) => repeated.push(item));
    }
  }

  // Schedule comment placement in lanes
  const lanes = 6; // Number of vertical lanes
  const laneTimers = new Array(lanes).fill(0); // Track lane availability
  let timeCursor = 0; // Global time position

  const scheduled = [];

  repeated.forEach((item) => {
    let assigned = false;

    // Wait until a lane is free
    while (!assigned) {
      for (let i = 0; i < lanes; i++) {
        if (laneTimers[i] <= timeCursor) {
          laneTimers[i] = timeCursor + 25; // Reserve lane for 25s
          scheduled.push({
            item,
            top: i * 140, // vertical spacing between lanes
            left: Math.floor(Math.random() * 70), // random horizontal start (in %)
            delay: timeCursor, // delay before animation starts
          });
          assigned = true;
          break;
        }
      }

      // If no lanes available, move forward in time
      if (!assigned) {
        timeCursor += 1;
      }
    }

    timeCursor += 2; // Spacing between comments
  });

  return (
    <div className="display-container">
      {scheduled.map((entry, index) => (
        <div
          key={index}
          className="floating-comment"
          style={{
            top: `${entry.top}px`,
            left: `${entry.left}%`,
            animationDelay: `${entry.delay}s`,
          }}
        >
          <p>{entry.item.comments}</p>
          {entry.item.keywords && <p>"{entry.item.keywords}"</p>}
        </div>
      ))}
    </div>
  );
};

export default CommentSlide;
