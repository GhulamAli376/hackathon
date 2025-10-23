import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import Fade from "@mui/material/Fade";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#d32f2f" },
      secondary: { main: "#f44336" },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      h3: { fontWeight: 700 },
      h6: { fontWeight: 500 },
    },
  });

  const features = [
    {
      title: "Store Vital Reports",
      desc: "Upload and manage all your health reports in one place.",
    },
    {
      title: "AI Report Analysis",
      desc: "Get AI-powered insights and summaries from your reports.",
    },
    {
      title: "Record Vitals",
      desc: "Track your blood pressure, sugar levels, BMI, and more.",
    },
    {
      title: "Track Progress",
      desc: "Visualize your data with interactive graphs and charts.",
    },
    {
      title: "Secure Access",
      desc: "Your medical data is encrypted and protected.",
    },
    {
      title: "Privacy First",
      desc: "Your data is yours — we never share it without consent.",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 🔴 Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)",
          color: "white",
          py: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: 1 }}
          >
            HealthMate
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
  {[
    { label: "Dashboard", path: "/" },
    { label: "ChatBot", path: "/chatbot" },
    { label: "FAQ", path: "/faq" },
  ].map((item, index) => (
    <Typography
      key={index}
      variant="body1"
      onClick={() => navigate(item.path)} // 👈 navigate on click
      sx={{
        cursor: "pointer",
        fontWeight: 500,
        position: "relative",
        color: "#fff",
        "&:hover::after": {
          width: "100%",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -4,
          left: 0,
          height: 2,
          width: 0,
          backgroundColor: "#fff",
          transition: "0.3s ease",
        },
      }}
    >
      {item.label}
    </Typography>
  ))}
</Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                background: "#fff",
                color: "#d32f2f",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { background: "#ffeaea" },
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                "&:hover": { background: "#c62828" },
              }}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🌟 Hero Section */}
      <Fade in={true} timeout={1000}>
        <Container maxWidth="md" sx={{ textAlign: "center", mt: 10, mb: 10 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Manage your{" "}
            <span style={{ color: "#d32f2f" }}>health</span>,{" "}
            <span style={{ color: "#d32f2f" }}>reports</span> &{" "}
            <span style={{ color: "#d32f2f" }}>vitals</span> — beautifully.
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: "text.secondary", maxWidth: 600, mx: "auto" }}
          >
            Simplify your medical data management experience. HealthMate keeps
            everything organized, accessible, and secure.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/addfamilymember")}
              sx={{
                textTransform: "none",
                px: 4,
                borderRadius: 3,
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(211,47,47,0.3)",
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                textTransform: "none",
                px: 4,
                borderColor: "#d32f2f",
                color: "#d32f2f",
                borderRadius: 3,
                "&:hover": { background: "#fff5f5" },
              }}
            >
              View Demo
            </Button>
          </Box>
        </Container>
      </Fade>

      {/* 💖 Features Section */}
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 6, fontWeight: 700 }}
        >
          Why You’ll Love HealthMate
        </Typography>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {features.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
              <Paper
                elevation={4}
                sx={{
                  flexGrow: 1,
                  p: 4,
                  borderRadius: 4,
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 6px 20px rgba(211,47,47,0.25)",
                  },
                }}
              >
                <FavoriteIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 🚀 CTA Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          background: "linear-gradient(90deg, #d32f2f 0%, #f44336 100%)",
          color: "white",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Start managing your health smarter.
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "#fff",
            color: "#d32f2f",
            fontWeight: 600,
            px: 4,
            py: 1,
            borderRadius: 3,
            "&:hover": { background: "#ffeaea" },
          }}
          onClick={() => navigate("/signup")}
        >
          Create Free Account
        </Button>
      </Box>

      {/* ⚪ Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 3,
          color: "gray",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="body2">
          © 2025 <b style={{ color: "#d32f2f" }}>HealthMate</b> — Made with ❤️
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
