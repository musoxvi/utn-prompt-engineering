import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Determinar la ruta para alternar entre Dashboard y Products
  const isDashboard = location.pathname === "/dashboard";
  const mainNavItem = isDashboard
    ? { label: "Products", path: "/" }
    : { label: "Dashboard", path: "/dashboard" };

  const menuItems = [
    mainNavItem,
    { label: user ? "Logout" : "Login", path: user ? "/logout" : "/login" },
  ];

  return (
    <>
      {/* AppBar con menú de hamburguesa en móvil */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Título del proyecto */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MattressHub - Encuentra el descanso perfecto
          </Typography>

          {/* Botones visibles en pantallas grandes */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button
              component={Link}
              to={mainNavItem.path}
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
            >
              {mainNavItem.label}
            </Button>
            {user ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
            )}
          </Box>

          {/* Icono de menú en pantallas pequeñas */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (Menú lateral en móviles) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={
                  item.label === "Logout" ? handleLogout : toggleDrawer(false)
                }
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Container sx={{ minHeight: "100vh", mt: 5 }}>{children}</Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{ bgcolor: "grey.100", py: 3, mt: 5, textAlign: "center" }}
      >
        <Typography variant="h6">UTN - Prompt Engineering</Typography>
      </Box>
    </>
  );
};

export { Layout };
