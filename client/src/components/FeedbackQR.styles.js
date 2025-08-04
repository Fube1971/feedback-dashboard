/**
 * FeedbackQR Styles
 * 
 * Provides layout and styling for the QR code display component.
 * Styles include the container, header, card layout, QR image, and text sections.
 */

import styled from "styled-components";

// Outer container: centers content and applies padding and font
export const Container = styled.div`
  width: 100%;
  padding: 6rem 4rem; /* Extra spacing around content */
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "adineue PRO Bold", sans-serif;
  font-size: 2rem; /* Increases overall text size */
`;

// Title text above the QR section
export const TitleHeader = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  text-transform: uppercase;
`;

// Card holding the QR code and the message block
export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  border: 1px solid #222;
  width: 100%;
  max-width: 1300px;
  min-height: 500px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(223, 90, 37, 0.1);
  border-radius: 20px;
  transform: translateX(-80px); /* Shift slightly left visually */
`;

// QR code image
export const QRImage = styled.img`
  width: 500px;
  height: 500px;
  margin-right: 2rem;
  margin-left: 2rem;
`;

// Container for all text beside the QR
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Bold heading text
export const Heading = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

// Supporting paragraph text
export const Paragraph = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

// Final bold closing statement
export const BoldText = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;
