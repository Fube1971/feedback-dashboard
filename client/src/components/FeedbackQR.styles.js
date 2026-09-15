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
  height: 100%;
  min-height: 0;
  box-sizing: border-box;
  padding: clamp(0.75rem, 3vh, 3rem) clamp(0.75rem, 4vw, 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: "adineue PRO Bold", sans-serif;
`;

// Title text above the QR section
export const TitleHeader = styled.h2`
  font-size: clamp(1rem, 2.4vw, 1.8rem);
  line-height: 1.15;
  margin: 0 0 clamp(0.75rem, 2vh, 2rem);
  text-align: center;
  text-transform: uppercase;
`;

// Card holding the QR code and the message block
export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.75rem, 3vw, 3rem);
  padding: clamp(0.75rem, 3vw, 2rem);
  border: 1px solid #222;
  width: 100%;
  max-width: 1300px;
  min-height: 0;
  max-height: 78%;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(223, 90, 37, 0.1);
  border-radius: 8px;
  min-width: 0;

  @media (max-width: 600px) and (orientation: portrait) {
    flex-direction: column;
    justify-content: center;
    max-height: 82%;
  }
`;

// QR code image
export const QRImage = styled.img`
  width: min(42vw, 42vh, 500px);
  max-width: 100%;
  height: auto;
  max-height: 58vh;
  object-fit: contain;

  @media (max-width: 600px) and (orientation: portrait) {
    width: min(52vw, 30vh, 240px);
  }
`;

// Container for all text beside the QR
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
`;

// Bold heading text
export const Heading = styled.h3`
  font-size: clamp(0.85rem, 2vw, 1.6rem);
  line-height: 1.15;
  font-weight: bold;
  margin: 0 0 clamp(0.4rem, 1vh, 1rem);
  text-transform: uppercase;
`;

// Supporting paragraph text
export const Paragraph = styled.p`
  font-size: clamp(0.75rem, 1.5vw, 1.2rem);
  line-height: 1.35;
  margin: 0 0 clamp(0.4rem, 1vh, 1rem);
`;

// Final bold closing statement
export const BoldText = styled.span`
  font-weight: bold;
  font-size: clamp(0.75rem, 1.5vw, 1.2rem);
`;
