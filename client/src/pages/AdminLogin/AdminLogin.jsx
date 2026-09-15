/**
 * AdminLogin Component
 * - Authenticates admin users via Firebase Auth (email/password)
 * - Redirects to /admin if successful
 * - Handles form validation and error feedback
 */

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  ResetPasswordButton,
  ResetMessage,
  Title3,
  BackButton,
} from "./AdminLogin.styles";

const AdminLogin = () => {
  // 🔐 Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetting, setResetting] = useState(false);
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

  const handlePasswordReset = async () => {
    const trimmedEmail = email.trim();
    setResetMessage("");

    if (!trimmedEmail) {
      setResetMessage(
        "Ingresa tu correo electrónico para recuperar la contraseña."
      );
      emailInput.current?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setResetMessage("Ingresa un correo electrónico válido.");
      emailInput.current?.focus();
      return;
    }

    setResetting(true);

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      setResetMessage(
        "Si existe una cuenta asociada a este correo, recibirás un enlace para restablecer tu contraseña."
      );
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setResetMessage(
          "Si existe una cuenta asociada a este correo, recibirás un enlace para restablecer tu contraseña."
        );
      } else {
        setResetMessage(
          "No se pudo enviar el enlace. Inténtalo de nuevo más tarde."
        );
        console.error(err.message);
      }
    } finally {
      setResetting(false);
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

          <ResetPasswordButton
            type="button"
            onClick={handlePasswordReset}
            disabled={resetting}
          >
            {resetting ? "Enviando..." : "¿Olvidaste la contraseña?"}
          </ResetPasswordButton>

          {resetMessage && <ResetMessage aria-live="polite">{resetMessage}</ResetMessage>}

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
