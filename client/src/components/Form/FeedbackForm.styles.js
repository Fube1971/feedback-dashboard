import { Link } from "react-router-dom";
import styled from "styled-components";

// Main layout wrapper for the form page
export const Container = styled.div`
  min-height: 100vh;
  background-color: white;
`;

// Wrapper for the form content
export const FormWrapper = styled.div`
  max-width: 32rem;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

// Wrapper used for the confirmation screen (centered)
export const CenteredContainer = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Wrapper for the confirmation content box
export const ConfirmationWrapper = styled.div`
  max-width: 32rem;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;
`;

// Header section of the form (logo + slogan)
export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

// Logo container adjusts spacing based on submission status
export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => (props.$submitted ? "3rem" : "1.5rem")};
`;

// Logo container box
export const Logo = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.img`
  height: 50px;
  width: auto;
`;

// Slogan under the logo
export const Slogan = styled.h1`
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

// Individual question section
export const QuestionSection = styled.div`
  margin-bottom: 3rem;
`;

// Title for each question
export const QuestionTitle = styled.h2`
  font-weight: 900;
  font-size: 1rem;
  margin-bottom: ${(props) => (props.$hasRating ? "2rem" : "1.5rem")};
  line-height: 1.25;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

// Wrapper for heart rating component
export const RatingContainer = styled.div`
  margin-bottom: 2.5rem;
`;

// Label section above rating buttons ("Min" / "Max")
export const RatingLabels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const RatingLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

// Button group for rating hearts
export const RatingButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

// Single heart button with animation
export const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  svg {
    transition: all 0.2s ease;
  }
`;

// Single-line text input (for "keywords")
export const TextInput = styled.input`
  width: 100%;
  height: 3rem;
  border: 2px solid #000000ff;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: normal;

  &:focus {
    outline: none;
    border-color: black;
  }
`;

// Multi-line textarea input (for "comments")
export const TextArea = styled.textarea`
  width: 100%;
  height: 6rem;
  border: 2px solid #000000ff;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: normal;
  resize: none;

  &:focus {
    outline: none;
    border-color: black;
  }
`;

// Container for radio input options ("Sí" / "No")
export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  accent-color: black;
`;

export const RadioText = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

// Submit button styling
export const SubmitButton = styled.button`
  background-color: black;
  color: white;
  padding: 1rem 2.5rem;
  font-weight: 900;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: background-color 0.2s ease;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-4px);
    opacity: 0.8;
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-2px);
  }

  &:hover {
    background-color: #838884ff;
  }
`;

// Wrapper for spacing before/after button
export const ButtonContainer = styled.div`
  padding-top: 2rem;
`;

// Check icon in confirmation screen
export const ConfirmationIcon = styled.div`
  font-size: 3.75rem;
  margin-bottom: 1.5rem;
`;

// Confirmation title ("Gracias por tu opinión")
export const ConfirmationTitle = styled.h1`
  font-weight: 900;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.25;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

// Confirmation description text
export const ConfirmationText = styled.p`
  font-weight: normal;
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.5;
`;

// Wrapper for confirmation text + button
export const ConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// "Back to main page" link at the top left
export const BackButton = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: black;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-4px);
    opacity: 0.8;
  }

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(-2px);
  }
`;
