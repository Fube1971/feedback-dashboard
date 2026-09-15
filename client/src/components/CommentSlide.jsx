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

import React, { useEffect, useMemo, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import "./CommentSlide.css";

const demoComments = [
  {
    comments: "Great shopping experience and friendly service.",
    keywords: "Friendly",
  },
  {
    comments: "The feedback process was quick and easy.",
    keywords: "Easy",
  },
  {
    comments: "The staff was helpful and attentive.",
    keywords: "Helpful",
  },
  {
    comments: "I found what I needed without waiting too long.",
    keywords: "Quick",
  },
];

const CommentSlide = () => {
  const [comments, setComments] = useState(demoComments);

  useEffect(() => {
    // Firestore query to listen for approved comments with consent
    const q = query(
      collection(db, "feedbacks"),
      where("status", "==", "approved"),
      where("consent", "==", "si")
    );

    // Real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (comment) =>
            typeof comment.comments === "string" && comment.comments.trim()
        );
      setComments(data.length > 0 ? data : demoComments);
    }, (error) => {
      console.error("Error listening for approved comments:", error);
      setComments(demoComments);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const scheduled = useMemo(() => {
    const lanes = 6;
    const repeatCount = 36;

    return Array.from({ length: repeatCount }, (_, index) => ({
      item: comments[index % comments.length],
      lane: index % lanes,
      left: 3 + ((index * 29 + comments.length * 11) % 65),
      delay: index * 4 - (lanes * 4),
    }));
  }, [comments]);

  return (
    <div className="display-container">
      {scheduled.map((entry, index) => (
        <div
          key={index}
          className="floating-comment"
          style={{
            bottom: `-${8 + entry.lane * 3}%`,
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
