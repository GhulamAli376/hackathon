import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  AppBar,
    Toolbar,
    Button,
  InputBase,
  Avatar,
  Stack,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";

export default function ChatBot() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "👋 Assalamualaikum! kesa hai ap hum ap ki kesa madad kar saktay ? Apni report upload karain ya message type kijiye." },
  ]);
  const [text, setText] = useState("");

  const pickFile = () => fileRef.current?.click();

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile({ name: f.name, size: f.size, type: f.type });
    setMessages((m) => [
      ...m,
      { id: Date.now(), from: "user", text: `📄 Uploaded ${f.name}` },
    ]);
  }

  const sendMessage = () => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: "user", text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setText("");

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "bot",
          text: "🧠 HealthMate AI analyzing your report... Yeh ek demo reply hai, real analysis backend se milega.",
        },
      ]);
    }, 600);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff 0%, #ffeaea 100%)",
        color: "#333",
        py: 2,
        mb:2
      }}
    >
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
      <Container maxWidth="lg">
       
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          sx={{
            mb: 5,
            mt:3,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#d32f2f",
              width: 64,
              height: 64,
              fontSize: "2rem",
              boxShadow: "0 4px 20px rgba(211,47,47,0.4)",
            }}
          >
            ❤️
          </Avatar>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                background: "linear-gradient(90deg, #e53935 0%, #b71c1c 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HealthMate AI
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              🤖 AI-Powered Medical Report Assistant
            </Typography>
          </Box>
        </Stack>

        {/* Main Card */}
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "#fff",
            border: "1px solid #f3f3f3",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, p: 3, gap: 3 }}>
            {/* Chat Section */}
            <Box sx={{ flex: 1, minHeight: 500 }}>
              <Box
                sx={{
                  p: 2,
                  background: "linear-gradient(90deg, #ffebee, #fff)",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#c62828" }}>
                  💬 Smart Medical Assistant
                </Typography>
                <Typography variant="body2" sx={{ color: "#555", mt: 1 }}>
                  Apni report upload karein ya sawal likhein. HealthMate AI aapko instant analysis dega.
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Chat Messages */}
              <Box
                sx={{
                  p: 2,
                  height: 340,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  "&::-webkit-scrollbar": { width: "8px" },
                  "&::-webkit-scrollbar-thumb": { background: "#ffcdd2", borderRadius: "8px" },
                }}
              >
                {messages.map((m, idx) => (
                  <Stack
                    key={m.id}
                    direction="row"
                    spacing={2}
                    sx={{
                      justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    {m.from === "bot" && (
                      <Avatar sx={{ bgcolor: "#d32f2f" }}>🤖</Avatar>
                    )}
                    <Box
                      sx={{
                        maxWidth: "75%",
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        background:
                          m.from === "user"
                            ? "linear-gradient(135deg, #e53935, #b71c1c)"
                            : "#f8f8f8",
                        color: m.from === "user" ? "#fff" : "#333",
                        boxShadow:
                          m.from === "user"
                            ? "0 4px 10px rgba(211,47,47,0.3)"
                            : "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography>{m.text}</Typography>
                    </Box>
                    {m.from === "user" && (
                      <Avatar sx={{ bgcolor: "#e57373" }}>👤</Avatar>
                    )}
                  </Stack>
                ))}
              </Box>

              {/* Input Section */}
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  background: "#fff",
                  borderRadius: 3,
                  border: "1px solid #f0f0f0",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/pdf,image/*"
                  hidden
                  onChange={handleFile}
                />

                <Tooltip title="Upload Medical Report" arrow>
                  <IconButton
                    onClick={pickFile}
                    sx={{
                      bgcolor: "#e53935",
                      color: "white",
                      "&:hover": { bgcolor: "#c62828" },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>

                <InputBase
                  placeholder="Apna message likho..."
                  fullWidth
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  sx={{ fontSize: "1rem" }}
                />
                <IconButton onClick={sendMessage} sx={{ color: "#e53935" }}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Report Preview Section */}
            <Box
              sx={{
                width: { xs: "100%", md: 350 },
                background: "#fff5f5",
                p: 3,
                borderRadius: 3,
                border: "1px solid #ffcdd2",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#c62828",
                  borderBottom: "2px solid #ffcdd2",
                  pb: 1,
                }}
              >
                📄 Report Dashboard
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  mt: 2,
                  background: "#fff",
                  borderRadius: 3,
                  border: "1px solid #f3f3f3",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <DescriptionIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>
                      {file ? file.name : "Upload your report"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#666" }}>
                      {file
                        ? `Size: ${(file.size / 1024).toFixed(1)} KB`
                        : "Accepted: PDF, JPG, PNG"}
                    </Typography>
                  </Box>

                  {file && (
                    <Tooltip title="Remove Report" arrow>
                      <IconButton onClick={() => setFile(null)}>
                        <CloseIcon sx={{ color: "#c62828" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1.5}>
                  <Chip
                    label="🧠 AI Health Analysis"
                    sx={{
                      bgcolor: "#ffcdd2",
                      color: "#b71c1c",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label="🔒 Secure Report Handling"
                    sx={{
                      bgcolor: "#ffe0e0",
                      color: "#b71c1c",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label="🌐 English + Roman Urdu"
                    sx={{
                      bgcolor: "#ffe5e5",
                      color: "#b71c1c",
                      fontWeight: 600,
                    }}
                  />
                </Stack>
              </Paper>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              textAlign: "center",
              py: 2,
              background: "#ffebee",
              borderTop: "1px solid #ffcdd2",
            }}
          >
            <Typography variant="caption" color="#b71c1c">
              © 2025 HealthMate AI — Educational purpose only. Always consult a doctor.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
