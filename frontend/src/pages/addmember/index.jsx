import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Button,
  TextField,
  Modal,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utilis/index";
import apiEndPoint from "../../constant/apiEndPoint";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

function AddFamilyMember() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", relation: "", customId: "" });
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${apiEndPoint.getFamily}`);
        setMembers(res.data.members || []);
      } catch (error) {
        console.error("Error fetching family:", error);
      }
    };
    fetchFamily();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}${apiEndPoint.addFamily}`, formData);
      if (res.data.success) {
        setMembers([...members, res.data.member]);
        setFormData({ name: "", relation: "", customId: "" });
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {/* 🔴 Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #d32f2f 0%, #ff5252 100%)",
          color: "#fff",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", fontWeight: 700, gap: 1 }}
          >
            <PersonIcon />
            HealthMate
            <Typography variant="body2" sx={{ ml: 1, color: "#ffeaea" }}>
              Sehat ka Smart Dost
            </Typography>
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              background: "#fff",
              color: "#d32f2f",
              borderRadius: 3,
              textTransform: "none",
              "&:hover": { background: "#ffeaea" },
            }}
          >
            Add Member
          </Button>
        </Toolbar>
      </AppBar>

      {/* 📘 Instruction */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography
          variant="body1"
          sx={{
            color: "gray",
            mb: 3,
            textAlign: "center",
          }}
        >
          Tap a card to open that member’s page.
        </Typography>

        {/* 🧑 Family Cards */}
        <Grid container spacing={3}>
          {members.length === 0 ? (
            <Typography
              textAlign="center"
              sx={{ width: "100%", mt: 6, color: "gray", fontSize: 16 }}
            >
              No family members yet. Add one!
            </Typography>
          ) : (
            members
              ?.filter((m) => m && m.name)
              .map((m, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      textAlign: "center",
                      transition: "0.3s",
                      background: "#fff",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0px 6px 20px rgba(211,47,47,0.2)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#d32f2f",
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
                      Last Activity: <b>{m.lastActivity || "N/A"}</b>
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="center"
                      flexWrap="wrap"
                      spacing={1}
                      sx={{ mt: 2 }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<EditIcon />}
                        sx={{
                          textTransform: "none",
                          borderColor: "#d32f2f",
                          color: "#d32f2f",
                          "&:hover": { bgcolor: "#ffebee" },
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        sx={{
                          textTransform: "none",
                          borderColor: "#d32f2f",
                          color: "#d32f2f",
                          "&:hover": { bgcolor: "#ffebee" },
                        }}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<OpenInNewIcon />}
                        onClick={() => navigate("/vitaltrends", { state: { member: m } })}
                        sx={{
                          textTransform: "none",
                          background: "linear-gradient(90deg,#ff5252,#d32f2f)",
                          "&:hover": { background: "#b71c1c" },
                        }}
                      >
                        Open
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))
          )}
        </Grid>
      </Container>

      {/* 🧾 Modal for Add Member */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "#d32f2f", textAlign: "center" }}
          >
            Add Family Member
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Relation"
              value={formData.relation}
              onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
            />
            <TextField
              label="Custom ID (optional)"
              value={formData.customId}
              onChange={(e) => setFormData({ ...formData, customId: e.target.value })}
            />
          </Stack>

          <Box mt={4} display="flex" flexDirection="column" gap={2}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                background: "linear-gradient(90deg, #ff5252, #d32f2f)",
                "&:hover": { background: "#b71c1c" },
              }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ borderColor: "#d32f2f", color: "#d32f2f" }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 4, color: "gray", mt: 6 }}>
        © 2025 <b style={{ color: "#d32f2f" }}>HealthMate</b> — All Rights Reserved
      </Box>
    </Box>
  );
}

export default AddFamilyMember;
