/**
 * AdminLogin Component
 * - Authenticates admin users via Firebase Auth (email/password)
 * - Redirects to /admin if successful
 * - Handles form validation and error feedback
 */

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowLeft } from "lucide-react";
import { auth } from "../../services/firebase";

// Styled components
import {
  LoginWrapper,
  Header,
  Logo,
  LoginContainer,
  Title,
  Label,
  Input,
  Button,
  ErrorMessage,
  Title2,
  Title3,
  BackButton,
} from "./AdminLogin.styles";

const AdminLogin = () => {
  // 🔐 Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Focus email input on page load
  const emailInput = useRef();
  useEffect(() => {
    emailInput.current?.focus();
  }, []);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/admin");
    } catch (err) {
      setError("Credenciales inválidas o usuario no encontrado.");
      console.error(err.message);
    }
  };

  return (
    <LoginWrapper>
      {/* Navigation back to main page */}
      <BackButton to="/">
        <ArrowLeft size={20} />
        Regresar a la página principal
      </BackButton>

      {/* Logo Header */}
      <Header>
        <Logo src="/images/Adidas_1991.png" alt="Logo Adidas" />
      </Header>

      {/* Login Form */}
      <LoginContainer>
        <Title>INICIAR SESIÓN</Title>
        <form onSubmit={handleLogin}>
          <Label>
            <Title3>CORREO ELECTRÓNICO</Title3>
            <Input
              type="email"
              placeholder="admin@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              ref={emailInput}
            />
          </Label>

          <Label>
            <Title3>CONTRASEÑA</Title3>
            <Input
              type="password"
              placeholder="••••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Label>

          {/* Optional forgot password message */}
          <Title2>¿Olvidaste la contraseña?</Title2>

          <Button type="submit">
            <span>INICIAR SESIÓN</span>
            <span className="arrow"> →</span>
          </Button>
        </form>

        {/* Error feedback */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginContainer>
    </LoginWrapper>
  );
};

export default AdminLogin;
