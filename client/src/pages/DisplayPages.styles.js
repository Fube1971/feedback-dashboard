import styled, { keyframes } from "styled-components";

// Main container for the display page layout
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

// Optional header wrapper (used for animated branding)
export const Header = styled.header`
  border-bottom: 1px solid #fff;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
`;

// Internal header layout for logo + title
export const HeaderContent = styled.div`
  width: 100%;
  min-width: 0;
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 2rem);
  padding: clamp(0.35rem, 1.2vw, 0.9rem) clamp(0.65rem, 3vw, 2.5rem);
  box-sizing: border-box;
  min-height: 44px;
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
  height: clamp(2rem, 7vw, 4rem);
  max-width: 25%;
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
  min-width: 0;
  font-size: clamp(0.78rem, 2.4vw, 2rem);
  font-weight: bold;
  color: black;
  margin-left: auto;
  text-align: right;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
  min-height: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(0.25rem, 2vw, 2rem);
  box-sizing: border-box;
  min-width: 0;
`;

export const HeaderLine = styled.div`
  height: 2px;
  background-color: #000000ff; // gris más suave
  width: 100%;
  flex-shrink: 0;
`;

export const DemoNotice = styled.p`
  flex-shrink: 0;
  align-self: center;
  margin: 0.5rem 1rem 0;
  color: #5a5a5a;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  text-align: center;
`;