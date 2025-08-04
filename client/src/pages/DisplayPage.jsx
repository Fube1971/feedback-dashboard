/**
 * DisplayPage.jsx
 *
 * Description:
 * This public-facing screen is shown on in-store monitors.
 * It rotates through visual charts and customer feedback using a carousel.
 *
 * Content includes:
 * - Header with branding (HeaderDynamic)
 * - A carousel of 7 slides:
 *   • General rating bar chart
 *   • Product availability line chart
 *   • Staff rating bars
 *   • Wait time chart with shirts
 *   • Experience treemap chart
 *   • Comment bubble animation
 *   • Feedback QR code
 */

import React from "react";
import Carousel from "../components/Carousel";
import CommentSlide from "../components/CommentSlide";
import AvailabilityLineChart from "../components/AvailabilityLineChart";
import GeneralRatingChart from "../components/GeneralRatingChart";
import StaffRatingBars from "../components/StaffRatingBars";
import WaitTimeShirtChart from "../components/WaitTimeShirtChart";
import ExperienceTreemapChart from "../components/ExperienceTreemapChart";
import HeaderDynamic from "../components/HeaderDynamic";
import FeedbackQR from "../components/FeedbackQR";

import { Container, CarouselWrapper, HeaderLine } from "./DisplayPages.styles"; // Local layout styles

const DisplayPage = () => {
  // Defines all the visual slides to be rotated in the carousel
  const slides = [
    <GeneralRatingChart key="general" />,
    <AvailabilityLineChart key="availability" />,
    <StaffRatingBars key="staff" />,
    <WaitTimeShirtChart key="waitTime" />,
    <ExperienceTreemapChart key="experience" />,
    <CommentSlide key="comments" />,
    <FeedbackQR key="feedback" />,
    // More slides can be added here
  ];

  return (
    <Container>
      {/* Header with animated Adidas branding */}
      <HeaderDynamic />
      <HeaderLine />
      {/* Carousel displaying all chart slides */}
      <CarouselWrapper>
        <Carousel slides={slides} duration={15000} />
      </CarouselWrapper>
    </Container>
  );
};

export default DisplayPage;
