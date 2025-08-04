
/**
 * AdminPending.jsx
 *
 * Description:
 * This page allows an admin user to moderate pending feedback.
 * It fetches all entries from Firestore's 'feedbacks' collection
 * where the status is "pending" and displays those that include
 * non-empty comments or keywords.
 *
 * The admin can:
 * - Approve or reject each entry using action buttons
 * - Log out from the system
 *
 * Approved/rejected items are updated in Firestore and removed from view.
 * The component uses Firebase Auth for logout and Firestore for data operations.
 */

import React, { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Container,
  BackButton,
  FeedbackList,
  FeedbackItem,
  FeedbackText,
  ButtonGroup,
  ActionButton,
  Divider,
  LogoutButton,
} from "./AdminPending.styles";

const AdminPending = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Stores list of pending feedbacks
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch only 'pending' feedback entries from Firestore
    const fetchPendingFeedbacks = async () => {
      try {
        const q = query(
          collection(db, "feedbacks"),
          where("status", "==", "pending")
        );

        const snapshot = await getDocs(q);

        // Filter for feedbacks that include a non-empty comment or keyword
        const filtered = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (doc) =>
              (doc.comments && doc.comments.trim() !== "") ||
              (doc.keywords && doc.keywords.trim() !== "")
          );

        setFeedbacks(filtered);
      } catch (error) {
        console.error("Error fetching feedbacks:", error.message);
      }
    };

    fetchPendingFeedbacks();
  }, []);

  // Updates the status of a feedback entry (approve or reject)
  const handleModeration = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "feedbacks", id), {
        status: newStatus,
        moderatedBy: auth.currentUser?.email || "unknown",
        moderatedAt: new Date(),
      });

      // Remove feedback from the current list after update
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  // Sign out the admin and redirect to login page
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <Container>
      {/* Back button to return to admin dashboard */}
      <BackButton onClick={() => navigate("/admin")}>
        <ArrowLeft size={18} /> Atrás
      </BackButton>

      {/* Feedback list or empty state */}
      {feedbacks.length === 0 ? (
        <p>No hay comentarios ni palabras pendientes de revisión.</p>
      ) : (
        <FeedbackList>
          {feedbacks.map((fb) => (
            <FeedbackItem key={fb.id}>
              <FeedbackText>
                {/* Show comment if available */}
                {fb.comments && <strong>Comentario:</strong>} {fb.comments}{" "}
                {/* Show keyword if available */}
                {fb.keywords && (
                  <>
                    <br />
                    <strong>Palabra:</strong> {fb.keywords}
                  </>
                )}
              </FeedbackText>

              {/* Moderation action buttons */}
              <ButtonGroup>
                <ActionButton
                  onClick={() => handleModeration(fb.id, "approved")}
                >
                  Aprobar
                </ActionButton>
                <ActionButton
                  reject
                  onClick={() => handleModeration(fb.id, "rejected")}
                >
                  Rechazar
                </ActionButton>
              </ButtonGroup>
            </FeedbackItem>
          ))}
        </FeedbackList>
      )}

      <Divider />

      {/* Logout button */}
      <LogoutButton onClick={handleLogout}>
        <span>Cerrar sesión</span>
        <ArrowRight className="arrow" />
      </LogoutButton>
    </Container>
  );
};

export default AdminPending;
