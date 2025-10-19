import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const members = [
  {
    name: "You",
    relation: "Self",
    lastActivity: "Oct 15, 2025",
    color: "#f28b82",
  },
  {
    name: "Ammi",
    relation: "Mother",
    lastActivity: "Oct 12, 2025",
    color: "#81c995",
  },
  {
    name: "Wife",
    relation: "Spouse",
    lastActivity: "Oct 09, 2025",
    color: "#aecbfa",
  },

];

function AddFamilyMember() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9fafc" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "white", color: "black", borderBottom: "1px solid #eee" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
            <PersonIcon color="error" />
            HealthMate
            <Typography variant="body2" sx={{ ml: 1, color: "gray" }}>
              Sehat ka Smart Dost
            </Typography>
          </Typography>

          <Button
            variant="contained"
            color="error"
            startIcon={<AddIcon />}
            sx={{ borderRadius: 3, textTransform: "none" }}
          >
            Add family member
          </Button>
        </Toolbar>
      </AppBar>

      {/* Instruction */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          variant="body1"
          sx={{ color: "gray", mb: 3, textAlign: "center" }}
        >
          Tap a card to open that member’s page. (We’ll route this to /family/:id)
        </Typography>

        {/* Family Cards */}
        <Grid container spacing={3}>
          {members.map((m, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: m.color,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    mb: 2,
                  }}
                >
                  <PersonIcon sx={{ color: "white", fontSize: 32 }} />
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {m.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                  {m.relation}
                </Typography>

                <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                  Last activity <br />
                  <b>{m.lastActivity}</b>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<EditIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<OpenInNewIcon />}
                    sx={{ textTransform: "none" }}
                  >
                    Open
                  </Button>

                </Box>
              </Paper>
            </Grid>
          ))}

        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 4, color: "gray", mt: 6 }}>
        © 2025 HealthMate
      </Box>
    </Box>
  );
}

export default AddFamilyMember;
