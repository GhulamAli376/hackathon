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
  Switch,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#ff4081" },
      secondary: { main: "#f50057" },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      h3: { fontWeight: 700 },
      h6: { fontWeight: 500 },
    },
  });

  const features = [
    {
      title: "Store vital reports",
      desc: "Upload lab results, prescriptions",
    },
    {
      title: "AI report analysis",
      desc: "Get insights on your health reports",
    },
    {
      title: "Record vitals",
      desc: "Monitor your blood pressure, sugar, BMI, and more.",
    },
    {
      title: "Track progress",
      desc: "Visualize your health data with graphs and insights.",
    },
    {
      title: "Secure access",
      desc: "Your reports are encrypted and accessible only to you.",
    },
    {
      title: "Privacy first",
      desc: "We value your privacy ",
    },
  ];

   const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            HealthMate
          </Typography>

<Box  sx={{ display: "flex",justifyContent:"center", gap: 2 }}>
            <Button color="inherit">Feature</Button>
            <Button color="inherit">How it works</Button>
            <Button color="inherit">FAQ</Button>
            
            <Button color="inherit">Get Started</Button>
            </Box>



          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            
            <Button variant="contained" color="primary" onClick={
              navigate('/otpVerification')}>
              Sign inn
            </Button>
             <Button variant="contained" color="primary">
              Create Account
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 10, mb: 10 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Manage your <span style={{ color: "#ff4081" }}>health</span>,{" "}
          <span style={{ color: "#ff4081" }}>reports</span> &{" "}
          <span style={{ color: "#ff4081" }}>vitals</span> — beautifully
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          Simplify your medical data management experience. HealthMate keeps
          everything organized, accessible, and secure.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
          <Button variant="outlined" color="primary">
            View Demo
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
     <Container maxWidth="lg" sx={{ mb: 10 }}>
  <Typography
    variant="h4"
    sx={{ textAlign: "center", mb: 6, fontWeight: 700 }}
  >
    Why you’ll love HealthMate
  </Typography>

  <Grid
    container
    spacing={2}
    justifyContent="center"
    alignItems="stretch"
  >
    {features.map((item, index) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={index}
        sx={{ display: "flex" }}
      >
        <Paper
          elevation={4}
          sx={{
            flexGrow: 1,
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 220, // same height for all boxes
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: 6,
            },
          }}
        >
          <FavoriteIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ width: "90%" }}
          >
            {item.desc}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Container>


      {/* CTA Section */}
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          backgroundColor: theme.palette.mode === "light" ? "#f9f9f9" : "#121212",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Start managing your health smarter
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Create Free Account
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 HealthMate. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
