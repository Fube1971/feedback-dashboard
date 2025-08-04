// client/src/pages/AdminHistory.styles.js
import styled from "styled-components";

// Optional full-page wrapper (not directly used in AdminHistory.jsx)
export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

// Main container for the page layout
export const Container = styled.div`
  background-color: white;
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  font-family: "adineue PRO Bold", sans-serif;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 768px) {
    min-height: auto;
  }
`;

// "Back" button to return to admin dashboard
export const BackButton = styled.button`
  margin-bottom: 2rem;
  background: none;
  border: none;
  font-size: 0.875rem;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    opacity: 0.7;
  }
`;

// Title for the page ("Moderation History")
export const Title = styled.h2`
  font-family: "adineue PRO Bold", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: black;
  text-align: center;
  width: 100%;
`;

// List of moderated feedback entries
export const FeedbackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 2rem;
  width: 100%;
`;

// Styling for each individual feedback item
export const FeedbackItem = styled.li`
  background-color: ${(props) =>
    props.$status === "approved" ? "#d5d6d5ff" : "#ee9191ff"}; // green/gray if approved, red if rejected
  border: 1px solid #000;
  padding: 1rem;
  margin-bottom: 1rem;
`;

// Label for text blocks like comment, moderator, date
export const Label = styled.p`
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: #000;
`;

// Bolded text for showing status (Approved/Rejected)
export const StatusText = styled.p`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

// Button to re-approve or re-reject a feedback
export const ToggleButton = styled.button`
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-family: "adineue PRO Bold", sans-serif;
  border: 1px solid #000;
  border-radius: 0;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

// Bottom "Sign out" button for admins
export const LogoutButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 1rem;
  border-radius: 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "adineue PRO Bold", sans-serif;
  transition: opacity 0.2s ease;
  margin-top: 2rem;

  &:hover {
    opacity: 0.9;
  }

  .arrow {
    font-size: 1.25rem;
    transition: transform 0.2s ease;
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
`;
