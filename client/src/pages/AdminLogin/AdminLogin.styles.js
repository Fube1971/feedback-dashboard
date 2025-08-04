import styled from "styled-components";
import { Link } from "react-router-dom";

// General wrapper that centers content vertically with top padding
export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 2rem;
  background-color: #ffffffff; /* gris claro tipo Adidas */
`;

// Logo container at the top
export const Header = styled.header`
  margin-bottom: 2rem;
`;

// Logo image, maximum size 60px
export const Logo = styled.img`
  max-width: 60px;
  height: auto;
`;

// White box for the form with border and internal padding
export const LoginContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: "adineue PRO Bold", sans-serif;
  font-size: 0.8rem;
`;

// Main login title (LOG IN)
export const Title = styled.h2`
  font-size: 0.5 rem; 
  font-family: "adineue PRO Bold", sans-serif;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

// Text for “Forgot your password?”
export const Title2 = styled.h2`
  text-align: left;
  color: #8f96a0ff;
  margin-bottom: 2rem;
`;

// Labels for input fields like “Email”
export const Title3 = styled.h2`
  font-family: "adineue PRO Light", sans-serif;
  text-align: left;
  color: #000000ff;
  font-size: 0.5 rem; 
`;

// Container for field label
export const Label = styled.label`
  font-family: "adineue PRO Bold", sans-serif;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

// Styled input fields (email and password)
export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.1rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  border: 1px solid #000000ff;
`;

// Button of submission when logging in
export const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-family: "adineue PRO Bold", sans-serif;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 22rem; // ⚠️ Valor alto: puede afectar en pantallas pequeñas

  &:hover {
    opacity: 0.85;
  }

  .arrow {
    font-size: 1.25rem;
    transition: transform 0.2s ease;
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
`;

// Mesaje of error that appears when login fails
export const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
  text-align: center;
`;

// Button to navigate back to the main page
export const BackButton = styled(Link)`
  display: inline-flex;
  justify-content: flex-start; /* Align content to the left*/
  align-items: center;
  font-size: 1rem;
  color: black;
  font-weight: bold;
  margin-bottom: 1rem;
  text-decoration: none;
  gap: 0.5rem;
  width: 100%; /* Ocupa todo el ancho disponible */
  margin-left: 3rem; /* Añade margen a la izquierda */

  &:hover {
    text-decoration: underline;
  }
`;
