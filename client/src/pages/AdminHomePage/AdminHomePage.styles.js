import styled from "styled-components";

/**
 * PageWrapper: (Not used in the component currently)
 * Safe to remove unless you plan to wrap the entire admin page externally
 */
export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

// Main container for the admin dashboard
export const Container = styled.div`
  background-color: white;
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  font-family: "adineue PRO Bold", sans-serif;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    min-height: auto;
  }
`;

// Title above the cards
export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #000;
`;

// Wraps the two navigation cards
export const CardGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

// Clickable button styled as a card
export const CardButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

// Icon container (for Lucide icons)
export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
`;

// Text content inside each card
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  color: black;
  margin: 0;
`;

export const CardText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: 0.25rem;
`;

// Divider line before logout button
export const Divider = styled.hr`
  margin: 2rem 0;
  border: none;
  height: 1px;
  background-color: #e5e7eb;
`;

// Logout button styling
export const LogoutButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-top: 25rem; /* ⚠️ Consider reducing this for smaller screens */
  align-items: center;
  font-family: "adineue PRO Bold", sans-serif;
  transition: opacity 0.2s ease;

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
