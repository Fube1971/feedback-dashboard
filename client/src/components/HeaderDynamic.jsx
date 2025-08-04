/**
 * HeaderDynamic Component
 *
 * This component displays a dynamic header with:
 * - A rotating Adidas logo (changes every 10 seconds)
 * - A rotating slogan or location phrase (changes every 7 seconds)
 * - A digital clock (updates every minute)
 * 
 * Styles are imported from DisplayPages.styles.js.
 */

import React, { useEffect, useState } from "react";
import {
  Header,
  HeaderContent,
  LogoImage,
  Title,
} from "../pages/DisplayPages.styles";

// Adidas logo sequence (rotates visually)
const logos = [
  "/images/Adidas_1991.png",
  "/images/Adidas_1971.png",
  "/images/Adidas_1995.png",
  "/images/Adidas_2002.png",
];

// Slogans / location phrases (rotating headline)
const phrases = [
  "IMPOSSIBLE IS NOTHING",
  "ADIDAS BRAND CENTER BOGOTA",
  "ADIDAS IGNITE PROJECT",
];

const HeaderDynamic = () => {
  const [logoIndex, setLogoIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(getTime());

  // Utility: Get current time in HH:MM format
  function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  useEffect(() => {
    // Rotate logos every 10 seconds
    const intervalLogo = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 10000);

    // Rotate phrases every 7 seconds
    const intervalPhrase = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 7000);

    // Update time every minute
    const intervalTime = setInterval(() => {
      setCurrentTime(getTime());
    }, 60000);

    // Cleanup all intervals on unmount
    return () => {
      clearInterval(intervalLogo);
      clearInterval(intervalPhrase);
      clearInterval(intervalTime);
    };
  }, []);

  return (
    <Header>
      <HeaderContent>
        {/* Rotating Adidas logo */}
        <LogoImage src={logos[logoIndex]} alt="Adidas Logo" />

        {/* Rotating phrase and current time */}
        <Title>
          {phrases[phraseIndex]} | {currentTime}
        </Title>
      </HeaderContent>
    </Header>
  );
};

export default HeaderDynamic;
