import styled, { keyframes } from "styled-components";

// Main container for the display page layout
export const Container = styled.div`
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

// Optional header wrapper (used for animated branding)
export const Header = styled.header`
  border-bottom: 1px solid #fff;
  margin: 0;
  padding: 0;
`;

// Internal header layout for logo + title
export const HeaderContent = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 0.75rem 2rem;
  }
`;

// Fade-in animation for logo when header loads
const fade = keyframes`
  from {
    opacity: 0;
    transform: scale(0.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Animated Adidas logo image
export const LogoImage = styled.img`
  height: 2rem;
  width: auto;
  object-fit: contain;
  margin: 0;
  padding: 0;
  animation: ${fade} 3s ease-in-out;

  @media (min-width: 1024px) {
    height: 4rem;
  }
`;

// Dynamic title text (used in some headers)
export const Title = styled.h1`
  font-family: "adineue PRO Bold", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  margin-left: auto;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

// Wraps the chart carousel
export const CarouselWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const HeaderLine = styled.div`
  height: 2px;
  background-color: #000000ff; // gris más suave
  width: 100%;
`;