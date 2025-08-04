// client/src/components/Form/FeedbackForm.jsx
/**
 * FeedbackForm.jsx
 *
 * Description:
 * A public feedback form used by customers to rate their in-store experience.
 * Includes 1–5 rating hearts, text inputs, and a consent radio option.
 *
 * Functionality:
 * - Stores form input in local state (`formData`)
 * - Validates required fields before submission
 * - Submits data to Firestore collection "feedbacks"
 * - Shows a confirmation screen upon success
 */

 import React, { useState } from "react";
  import { Heart, ArrowLeft } from "lucide-react";

  import { db } from "../../services/firebase";
  import { collection, addDoc, serverTimestamp } from "firebase/firestore";

  import {
  Container,
  FormWrapper,
  CenteredContainer,
  ConfirmationWrapper,
  Header,
  LogoContainer,
  Logo,
  LogoStripes,
  Slogan,
  QuestionSection,
  QuestionTitle,
  RatingContainer,
  RatingLabels,
  RatingLabel,
  RatingButtons,
  HeartButton,
  TextInput,
  TextArea,
  RadioContainer,
  RadioLabel,
  RadioInput,
  RadioText,
  ButtonContainer,
  SubmitButton,
  BackButton,
  ConfirmationContent,
  ConfirmationIcon,
  ConfirmationTitle,
  ConfirmationText,
  LogoImage,
} from "./FeedbackForm.styles";

const AdidasSatisfactionForm = () => {
  const [formData, setFormData] = useState({
    availability: 0,
    staff: 0,
    waitTime: 0,
    experience: 0,
    keywords: "",
    comments: "",
    consent: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Handles rating inputs (1–5 hearts)
  const handleRatingChange = (field, rating) => {
    setFormData((prev) => ({
      ...prev,
      [field]: rating,
    }));
  };

  // Handles text and radio inputs
  const handleTextChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Form submission logic with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "availability",
      "staff",
      "waitTime",
      "experience",
      "comments",
      "consent",
    ];
    const missing = requiredFields.filter((field) => {
      const value = formData[field];
      return typeof value === "number" ? value === 0 : value.trim() === "";
    });

    if (missing.length > 0) {
      alert(
        "⚠ Por favor completa todas las preguntas requeridas antes de enviar."
      );
      return;
    }

    try {
      await addDoc(collection(db, "feedbacks"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "pending",
      });

      // Simulate confirmation
      console.log("Form submitted:", formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      alert("Error al enviar el formulario. Por favor intenta de nuevo.");
    }
  };

  // Component to display rating hearts (1–5)
  const HeartRating = ({ value, onChange, label }) => {
    return (
      <RatingContainer>
        <RatingLabels>
          <RatingLabel>Mínimo</RatingLabel>
          <RatingLabel>Máximo</RatingLabel>
        </RatingLabels>
        <RatingButtons>
          {[1, 2, 3, 4, 5].map((rating) => (
            <HeartButton
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
            >
              <Heart
                size={44}
                fill={value >= rating ? "black" : "none"}
                stroke={value >= rating ? "black" : "#d1d5db"}
                strokeWidth={2}
                style={{
                  fill: value >= rating ? "black" : "none",
                  stroke: value >= rating ? "black" : "#d1d5db",
                }}
              />
            </HeartButton>
          ))}
        </RatingButtons>
      </RatingContainer>
    );
  };

  // Display confirmation message after submission
  if (submitted) {
    return (
      <CenteredContainer>
        <BackButton to="/">
          <ArrowLeft size={20} />
          Return to the main page
        </BackButton>
        <ConfirmationWrapper>
          <LogoContainer $submitted>
            <Logo></Logo>
          </LogoContainer>

          <ConfirmationContent>
            <ConfirmationIcon>✅</ConfirmationIcon>
            <ConfirmationTitle>¡Gracias por tu opinión!</ConfirmationTitle>
            <ConfirmationText>
              Tu feedback ha sido enviado exitosamente. Valoramos mucho tu
              tiempo y tus comentarios nos ayudan a mejorar continuamente.
            </ConfirmationText>
            <ButtonContainer>
              <SubmitButton
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    availability: 0,
                    staff: 0,
                    waitTime: 0,
                    experience: 0,
                    keywords: "",
                    comments: "",
                    consent: "",
                  });
                }}
              >
                Nuevo Formulario
              </SubmitButton>
            </ButtonContainer>
          </ConfirmationContent>
        </ConfirmationWrapper>
      </CenteredContainer>
    );
  }

  // Main form UI
  return (
    <Container>
      <BackButton to="/">
        <ArrowLeft size={20} />
        Return to the main page
      </BackButton>
      <FormWrapper>
        <Header>
          <LogoContainer>
            <Logo>
              <LogoImage src="/images/Adidas_1991.png" alt="Adidas Logo" />
            </Logo>
          </LogoContainer>
          <Slogan>IMPOSSIBLE IS NOTHING</Slogan>
        </Header>

        <div>
          {/* Question 1 - Product availability */}
          <QuestionSection>
            <QuestionTitle $hasRating>
              1. ¿CÓMO CALIFICARÍAS LA DISPONIBILIDAD DE NUESTROS PRODUCTOS?
            </QuestionTitle>
            <HeartRating
              value={formData.availability}
              onChange={(rating) => handleRatingChange("availability", rating)}
            />
          </QuestionSection>

          {/* Question 2 - Staff service */}
          <QuestionSection>
            <QuestionTitle $hasRating>
              2. ¿CÓMO CALIFICARÍAS LA ATENCIÓN DE NUESTRO PERSONAL?
            </QuestionTitle>
            <HeartRating
              value={formData.staff}
              onChange={(rating) => handleRatingChange("staff", rating)}
            />
          </QuestionSection>

          {/* Question 3 was likely removed */}

          {/* Question 4 - Wait time */}
          <QuestionSection>
            <QuestionTitle $hasRating>
              4. ¿CÓMO CALIFICARÍAS EL TIEMPO DE ESPERA?
            </QuestionTitle>
            <HeartRating
              value={formData.waitTime}
              onChange={(rating) => handleRatingChange("waitTime", rating)}
            />
          </QuestionSection>

          {/* Question 5 - Overall experience */}
          <QuestionSection>
            <QuestionTitle $hasRating>
              5. ¿CÓMO CALIFICARÍAS TU EXPERIENCIA GENERAL DE COMPRA?
            </QuestionTitle>
            <HeartRating
              value={formData.experience}
              onChange={(rating) => handleRatingChange("experience", rating)}
            />
          </QuestionSection>

          {/* Question 6 - Keywords (optional) */}
          <QuestionSection>
            <QuestionTitle>
              6. DEFINE TU EXPERIENCIA EN UNA PALABRA (OPCIONAL)
            </QuestionTitle>
            <TextInput
              type="text"
              value={formData.keywords}
              onChange={(e) => handleTextChange("keywords", e.target.value)}
              placeholder=""
            />
          </QuestionSection>

          {/* Question 7 - Comments */}
          <QuestionSection>
            <QuestionTitle>
              7. ¿ALGÚN COMENTARIO? TRANQUILO, CUÉNTANOS SIN PROBLEMA.
            </QuestionTitle>
            <TextArea
              value={formData.comments}
              onChange={(e) => handleTextChange("comments", e.target.value)}
              placeholder=""
            />
          </QuestionSection>

          {/* Question 8 - Consent */}
          <QuestionSection>
            <QuestionTitle $hasRating>
              8. ¿AUTORIZAS QUE MOSTREMOS TU COMENTARIO EN PANTALLA DENTRO DE LA
              TIENDA?
            </QuestionTitle>
            <RadioContainer>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="consent"
                  value="si"
                  checked={formData.consent === "si"}
                  onChange={(e) => handleTextChange("consent", e.target.value)}
                />
                <RadioText>Sí</RadioText>
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="consent"
                  value="no"
                  checked={formData.consent === "no"}
                  onChange={(e) => handleTextChange("consent", e.target.value)}
                />
                <RadioText>No</RadioText>
              </RadioLabel>
            </RadioContainer>
          </QuestionSection>

          {/* Submit button */}
          <ButtonContainer>
            <SubmitButton type="button" onClick={handleSubmit}>
              ENVIAR →
            </SubmitButton>
          </ButtonContainer>
        </div>
      </FormWrapper>
    </Container>
  );
};

export default AdidasSatisfactionForm;
