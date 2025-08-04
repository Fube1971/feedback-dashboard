/**
 * Styled Components for LandingPage (HomePage)
 * - Controls layout, typography, colors, responsiveness, and interactive hover states
 * - Includes animation-ready card styles and icon color transitions
 */

import styled from "styled-components";
import { Link } from "react-router-dom";

// Full-page container
export const Container = styled.div`
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

// Top navigation/header bar
export const Header = styled.div`
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

export const HeaderContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    padding: 1rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 1rem 2rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

export const LogoImage = styled.img`
  margin: 1rem;
  height: 45rem; 
  width: auto;
  object-fit: contain;

  @media (min-width: 429px) {
    height: 2.5rem;
  }

  @media (min-width: 1024px) {
    height: 5rem;
  }
`;

// Page title
export const Title = styled.h1`
  padding-top: 2rem;
  font-size: 1.125rem;
  font-weight: bold;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

// Main section
export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 640px) {
    padding: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;

  @media (min-width: 640px) {
    gap: 3rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

export const QRSection = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeaturesSection = styled.div`
  order: 1;

  @media (min-width: 1024px) {
    order: 2;
  }
`;

export const FeaturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    gap: 1.25rem;
  }

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
`;

// Welcome text section
export const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  @media (min-width: 1024px) {
    text-align: left;
    margin-bottom: 2rem;
  }
`;

export const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 0.5rem;

  @media (min-width: 640px) {
    font-size: 1.875rem;
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;

  @media (min-width: 640px) {
    font-size: 1rem;
  }
`;

// Feature Cards
export const FeatureCard = styled(Link)`
  display: block;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;

  @media (min-width: 640px) {
    padding: 1.25rem;
  }

  @media (min-width: 1024px) {
    padding: 1.5rem;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.$hoverBg};
    border-color: ${(props) => props.$hoverBorder};
  }
`;

export const FeatureContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  @media (min-width: 640px) {
    gap: 1rem;
  }
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 640px) {
    width: 2.75rem;
    height: 2.75rem;
  }

  @media (min-width: 1024px) {
    width: 3rem;
    height: 3rem;
  }
`;

export const FeatureTextWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const FeatureTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;

  @media (min-width: 640px) {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  ${FeatureCard}:hover & {
    color: ${(props) => props.$hoverColor};
  }
`;

export const FeatureDescription = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.5;
  transition: color 0.3s ease;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }

  ${FeatureCard}:hover & {
    color: #4b5563;
  }
`;

export const MobileHint = styled.div`
  text-align: center;
  margin-top: 2rem;
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const StyledIcon = styled.div`
  color: black;
  transition: color 0.3s ease;

  svg {
    width: 1.5rem;
    height: 1.5rem;

    @media (min-width: 640px) {
      width: 1.75rem;
      height: 1.75rem;
    }

    @media (min-width: 1024px) {
      width: 2rem;
      height: 2rem;
    }
  }

  ${FeatureCard}:hover & {
    color: ${(props) => props.$hoverIconColor};
  }
`;

export const HeaderLine = styled.div`
  height: 2px;
  background-color: #000000ff; // gris más suave
  width: 100%;
`;

export const QRImage = styled.img`
  width: 200%;
  max-width: 600px;
  height: auto;
  display: block;
  margin: 0 auto;
`;
