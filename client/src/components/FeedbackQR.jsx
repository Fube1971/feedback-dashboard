/**
 * FeedbackQR Component
 * 
 * Purpose:
 * Displays a QR code for users to access the feedback form.
 * Includes supporting text to encourage participation.
 * 
 * Structure:
 * - A title header prompting the user
 * - A card with the QR image and explanatory message
 * - Styled using styled-components from FeedbackQR.styles.js
 */

import React from "react";
import {
  Container,
  TitleHeader,
  Card,
  QRImage,
  TextWrapper,
  Heading,
  Paragraph,
  BoldText,
} from "./FeedbackQR.styles";

const FeedbackQR = () => {
  return (
    <Container>
      {/* Main prompt */}
      <TitleHeader>
        ¿ALGÚN COMENTARIO? TRANQUILO, CUÉNTANOS SIN PROBLEMA.
      </TitleHeader>

      {/* Card with QR code and text */}
      <Card>
        {/* QR Code Image */}
        <QRImage src="/images/qr.png" alt="Código QR" />

        {/* Supporting message */}
        <TextWrapper>
          <Heading>QUEREMOS DARTE LA MEJOR EXPERIENCIA POSIBLE.</Heading>
          <Paragraph>
            Si algo no te cuadró, tu opinión nos ayuda a mejorar. Solo te tomará
            un minuto.
          </Paragraph>
          <BoldText>¡Gracias por ayudarnos!</BoldText>
        </TextWrapper>
      </Card>
    </Container>
  );
};

export default FeedbackQR;
