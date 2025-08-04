/**
 * AdminHomePage
 * - Entry point for authenticated admins
 * - Navigates to "Pending Comments" and "Moderation History"
 * - Allows logout via Firebase Auth
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

// Icons from lucide-react
import {
  Clock3,       // Icon for pending comments
  Folder,       // Icon for history
  ArrowRight,   // Used in logout button
} from "lucide-react";

// Styled components
import {
  Container,
  Title,
  CardGroup,
  CardButton,
  CardIcon,
  CardContent,
  CardTitle,
  CardText,
  Divider,
  LogoutButton,
} from "./AdminHomePage.styles";

const AdminHomePage = () => {
  const navigate = useNavigate();

  // Logs out user and redirects to login screen
  const logout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  return (
    <Container>
      {/* Welcome header */}
      <Title> HOLA, ADMINISTRADOR</Title>

      {/* Action cards */}
      <CardGroup>
        {/* Navigate to Pending Comments */}
        <CardButton onClick={() => navigate("/admin-pending")}>
          <CardIcon>
            <Clock3 size={40} stroke="#9ca3af" />
          </CardIcon>
          <CardContent>
            <CardTitle>COMENTARIOS PENDIENTES</CardTitle>
            <CardText>
              Evalúa y decide qué comentarios se publicarán o se rechazarán.
            </CardText>
          </CardContent>
        </CardButton>

        {/* Navigate to Moderation History */}
        <CardButton onClick={() => navigate("/admin-history")}>
          <CardIcon>
            <Folder size={40} stroke="#9ca3af" />
          </CardIcon>
          <CardContent>
            <CardTitle>HISTORIAL DE MODERACIÓN</CardTitle>
            <CardText>
              Consulta todas tus decisiones anteriores sobre comentarios
              enviados por los clientes.
            </CardText>
          </CardContent>
        </CardButton>
      </CardGroup>

      <Divider />

      {/* Logout button */}
      <LogoutButton onClick={logout}>
        <span>CERRAR SESIÓN</span>
        <ArrowRight className="arrow" />
      </LogoutButton>
    </Container>
  );
};

export default AdminHomePage;
