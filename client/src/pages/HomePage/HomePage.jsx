/**
 * LandingPage Component
 * - Serves as the home page for the Adidas Ignite project
 * - Provides navigation to Forms, Admin Login, and Dashboard
 * - Highlights each feature with animated cards and icons
 */

import React from "react";
import { FileText, UserCheck, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

// Styled-components-based layout import
import {
  Container,
  Header,
  HeaderContent,
  LogoImage,
  Title,
  MainContent,
  ContentWrapper,
  Grid,
  QRSection,
  FeaturesSection,
  FeaturesWrapper,
  WelcomeText,
  WelcomeTitle,
  WelcomeSubtitle,
  FeatureCard,
  FeatureContent,
  IconWrapper,
  FeatureTextWrapper,
  FeatureTitle,
  FeatureDescription,
  MobileHint,
  StyledIcon,
  QRImage,
  HeaderLine
} from "./LandingPage.styles";

const LandingPage = () => {
  // Feature cards for navigation
  const features = [
    {
      id: "forms",
      title: "FORMULARIO",
      description:
        "Un conjunto de preguntas de calificación del 1 al 5 para aspectos como la disponibilidad del producto y la experiencia de compra general.",
      icon: FileText,
      path: "/feedback-form",
      colors: {
        hoverBg: "#eff6ff",
        hoverBorder: "#60a5fa",
        hoverTitle: "#1d4ed8",
        hoverIcon: "#2563eb",
      },
    },
    {
      id: "admin",
      title: "ADMIN",
      description: "Controles de moderación como aprobar u ocultar comentarios",
      icon: UserCheck,
      path: "/admin-login",
      colors: {
        hoverBg: "#faf5ff",
        hoverBorder: "#c52525ff",
        hoverTitle: "#b91d1dff",
        hoverIcon: "#d42020ff",
      },
    },
    {
      id: "dashboard",
      title: "PANEL",
      description:
        "Gráficos visualmente atractivos que resumen los comentarios, como calificaciones promedio, comentarios y tendencias a lo largo del tiempo",
      icon: LayoutDashboard,
      path: "/display",
      colors: {
        hoverBg: "#f0fdf4",
        hoverBorder: "#34d399",
        hoverTitle: "#047857",
        hoverIcon: "#10b981",
      },
    },
  ];

  return (
    <Container>
      {/* Header with Logo and Title */}
      <Header>
        <HeaderContent>
          <LogoImage src="/images/Adidas_1991.png" alt="Adidas Logo" />
          <Title>Adidas Ignite Project</Title>
        </HeaderContent>
        <HeaderLine />
      </Header>

      <MainContent>
        <ContentWrapper>
          <Grid>
            <QRSection>
              <QRImage src="/images/HomePageImg.png" alt="Retail Visual" />
            </QRSection>
            <FeaturesSection>
              {/* Welcome Message */}
              <WelcomeText>
                <WelcomeTitle>Bienvenido al Proyecto Adidas Ignite</WelcomeTitle>
                <WelcomeSubtitle>Seleccione una sección para comenzar</WelcomeSubtitle>
              </WelcomeText>

              {/* Dynamic Feature Cards */}
              <FeaturesWrapper>
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <FeatureCard
                      key={feature.id}
                      to={feature.path}
                      $hoverBg={feature.colors.hoverBg}
                      $hoverBorder={feature.colors.hoverBorder}
                    >
                      <FeatureContent>
                        <IconWrapper>
                          <StyledIcon $hoverIconColor={feature.colors.hoverIcon}>
                            <Icon />
                          </StyledIcon>
                        </IconWrapper>

                        <FeatureTextWrapper>
                          <FeatureTitle $hoverColor={feature.colors.hoverTitle}>
                            {feature.title}
                          </FeatureTitle>
                          <FeatureDescription>
                            {feature.description}
                          </FeatureDescription>
                        </FeatureTextWrapper>
                      </FeatureContent>
                    </FeatureCard>
                  );
                })}
              </FeaturesWrapper>

              <MobileHint />
            </FeaturesSection>
          </Grid>
        </ContentWrapper>
      </MainContent>
    </Container>
  );
};

export default LandingPage;
