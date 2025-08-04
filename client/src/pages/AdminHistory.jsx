/**
 * AdminHistory.jsx
 *
 * Description:
 * Displays all feedback entries that have already been reviewed
 * (those marked as "approved" or "rejected").
 * 
 * Admins can:
 * - View comment, keyword, status, moderator, and timestamp
 * - Toggle the moderation status (e.g., re-approve or reject again)
 * - Return to the admin panel or log out
 */

import React, { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { ArrowLeft } from "lucide-react";

import {
  Container,
  BackButton,
  FeedbackList,
  FeedbackItem,
  Label,
  StatusText,
  ToggleButton,
  LogoutButton,
} from "./AdminHistory.styles";

const AdminHistory = () => {
  const [moderated, setModerated] = useState([]); // Stores previously reviewed feedbacks
  const navigate = useNavigate();

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) {
      console.warn("User not logged in. Skipping fetch.");
      return;
    }

    const fetchReviewed = async () => {
      try {
        // Query all feedback entries with status "approved" or "rejected"
        const q = query(
          collection(db, "feedbacks"),
          where("status", "in", ["approved", "rejected"])
        );

        const snapshot = await getDocs(q);

        // Store all results in local state
        setModerated(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Error fetching moderated comments:", error.message);
      }
    };

    fetchReviewed();
  }, []);

  // Allows admin to toggle between approved ↔ rejected
  const handleToggleModeration = async (id, currentStatus) => {
    const newStatus = currentStatus === "approved" ? "rejected" : "approved";
    try {
      await updateDoc(doc(db, "feedbacks", id), {
        status: newStatus,
        moderatedBy: auth.currentUser?.email || "unknown",
        moderatedAt: serverTimestamp(),
      });

      // Update local state to reflect new status
      setModerated((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: newStatus,
                moderatedAt: { seconds: Date.now() / 1000 },
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling moderation:", error.message);
    }
  };

  return (
    <Container>
      {/* Back button to admin dashboard */}
      <BackButton onClick={() => navigate("/admin")}>
        <ArrowLeft size={18} /> atrás
      </BackButton>

      <h2>HISTORIAL DE MODERACIÓN</h2>

      {/* Message if no reviewed comments are found */}
      {moderated.length === 0 ? (
        <p>No hay comentarios moderados aún.</p>
      ) : (
        <FeedbackList>
          {moderated.map((item) => (
            <FeedbackItem key={item.id} $status={item.status}>
              {/* Show comment */}
              {item.comments && (
                <Label>
                  <strong>Comentario:</strong> {item.comments}
                </Label>
              )}
              {/* Show keyword */}
              {item.keywords && (
                <Label>
                  <strong>Palabra clave:</strong> {item.keywords}
                </Label>
              )}
              {/* Show moderation status */}
              <StatusText>
                <strong>Estado:</strong>{" "}
                {item.status === "approved" ? "Aprobado" : "Rechazado"}
              </StatusText>
              {/* Show moderator email */}
              {item.moderatedBy && (
                <Label>
                  <strong>Moderado por:</strong> {item.moderatedBy}
                </Label>
              )}
              {/* Show formatted date if available */}
              {item.moderatedAt && item.moderatedAt.seconds && (
                <Label>
                  <strong>Fecha:</strong>{" "}
                  {new Date(item.moderatedAt.seconds * 1000).toLocaleString()}
                </Label>
              )}
              {/* Toggle button to change status */}
              <ToggleButton
                onClick={() => handleToggleModeration(item.id, item.status)}
              >
                {item.status === "approved"
                  ? "❌ Rechazar nuevamente"
                  : "✅ Aprobar nuevamente"}
              </ToggleButton>
            </FeedbackItem>
          ))}
        </FeedbackList>
      )}

      {/* Logout button */}
      <LogoutButton
        onClick={async () => {
          await getAuth().signOut();
          navigate("/admin-login");
        }}
      >
        Cerrar sesión
      </LogoutButton>
    </Container>
  );
};

export default AdminHistory;
