import styled from "styled-components";

// Full-page wrapper (not currently used in AdminPending)
export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

// Main container for content layout
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

// "Back" button above the list (navigates to admin dashboard)
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

// title text (not used in AdminPending.jsx)
export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #000;
  text-align: center;
  width: 100%;
`;

// List container for feedback entries
export const FeedbackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

// Individual feedback card styling
export const FeedbackItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  border: 1px solid #000;
  padding: 1rem;
  margin-bottom: 1rem;
`;

// Text section for each feedback (comment + keyword)
export const FeedbackText = styled.p`
  flex: 1;
  margin: 0;
  font-size: 0.875rem;
  color: #000;
`;

// Group of action buttons (Approve / Reject)
export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
`;

// Button used to approve or reject feedback
export const ActionButton = styled.button`
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-family: "adineue PRO Bold", sans-serif;
  border: 1px solid #000;
  border-radius: 0;
  background-color: ${(props) => (props.reject ? "#000" : "#fff")};
  color: ${(props) => (props.reject ? "#fff" : "#000")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

// Horizontal separator before logout button
export const Divider = styled.hr`
  margin: 2rem 0;
  border: none;
  height: 1px;
  background-color: #e5e7eb;
`;

// Logout button at the bottom
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
