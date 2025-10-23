import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Avatar,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useLocation } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import apiEndPoint from "../../constant/apiEndPoint";
import { BASE_URL } from "../../utilis";

const sampleChartData = [
  { date: "Oct 01", systolic: 135, diastolic: 90, sugar: 110 },
  { date: "Oct 05", systolic: 132, diastolic: 88, sugar: 105 },
  { date: "Oct 09", systolic: 130, diastolic: 86, sugar: 102 },
  { date: "Oct 12", systolic: 128, diastolic: 85, sugar: 100 },
  { date: "Oct 15", systolic: 126, diastolic: 83, sugar: 98 },
];

export default function VitalTrends() {
  const location = useLocation();
  const member = location.state?.member;

  const [openModal, setOpenModal] = useState(false);
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    testName: "",
    hospital: "",
    doctor: "",
    date: "",
    price: "",
    notes: "",
    files: [],
    memberId: member?._id || "",
  });

  useEffect(() => {
    if (member?._id) fetchReports();
  }, [member]);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${BASE_URL}${apiEndPoint.getReport}/${member._id}`);
      setReports(res.data.reports || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, files: Array.from(e.target.files) });

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "files") value.forEach((file) => formDataToSend.append("files", file));
        else formDataToSend.append(key, value);
      });

      await axios.post(`${BASE_URL}${apiEndPoint.addReport}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Report saved successfully!");
      setOpenModal(false);
      fetchReports();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error saving report");
    }
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* 🔴 Header Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #d32f2f 0%, #ff5252 100%)",
          color: "#fff",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "#fff", color: "#d32f2f", fontWeight: "bold" }}>HM</Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                HealthMate
              </Typography>
              <Typography variant="caption">Sehat ka Smart Dost</Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<ArrowBack />}
            sx={{
              bgcolor: "#fff",
              color: "#d32f2f",
              "&:hover": { bgcolor: "#ffeaea" },
            }}
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>

      {/* Member Info */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: "2px solid #d32f2f", mt: 2 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: "#d32f2f" }}>{member?.name?.charAt(0) || "U"}</Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {member?.name || "No Member"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {member?.relation || "Unknown"}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              background: "linear-gradient(90deg, #ff5252, #d32f2f)",
              "&:hover": { background: "#c62828" },
            }}
          >
            Add Report
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Section */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#fff",
                border: "1px solid #f2f2f2",
                transition: "0.3s",
                "&:hover": { boxShadow: "0px 6px 20px rgba(211,47,47,0.1)" },
              }}
            >
              <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
                Vitals Trend
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Blood Pressure and Sugar Analysis
              </Typography>
              <Box sx={{ height: 250, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleChartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="systolic" stroke="#d32f2f" strokeWidth={2} />
                    <Line type="monotone" dataKey="diastolic" stroke="#ff6f61" strokeWidth={2} />
                    <Line type="monotone" dataKey="sugar" stroke="#f9a825" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            {/* Reports */}
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 3,
                border: "1px solid #f1f1f1",
                background: "#fff",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <SearchIcon color="action" />
                <TextField
                  variant="standard"
                  placeholder="Search by title, test, or doctor"
                  fullWidth
                />
              </Stack>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "#ffebee" }}>
                      {["Title", "Test", "Hospital", "Doctor", "Date", "Price", "Flag", "Action"].map(
                        (head) => (
                          <TableCell key={head} sx={{ color: "#d32f2f", fontWeight: 600 }}>
                            {head}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((r, i) => (
                      <React.Fragment key={i}>
                        <TableRow
                          sx={{
                            "&:hover": { backgroundColor: "#fff5f5" },
                            transition: "0.3s",
                          }}
                        >
                          <TableCell>{r.title}</TableCell>
                          <TableCell>{r.testName}</TableCell>
                          <TableCell>{r.hospital}</TableCell>
                          <TableCell>{r.doctor}</TableCell>
                          <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
                          <TableCell>Rs {r.price}</TableCell>
                          <TableCell>
                            <Chip label="Analyzed" color="success" size="small" />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() =>
                                setReports((prev) =>
                                  prev.map((rep, idx) =>
                                    idx === i ? { ...rep, showSummary: !rep.showSummary } : rep
                                  )
                                )
                              }
                              sx={{
                                borderColor: "#d32f2f",
                                color: "#d32f2f",
                                "&:hover": { bgcolor: "#ffebee" },
                              }}
                            >
                              {r.showSummary ? "Hide AI" : "Show AI"}
                            </Button>
                          </TableCell>
                        </TableRow>

                        {r.showSummary && (
                          <TableRow>
                            <TableCell colSpan={8}>
                              <Paper sx={{ p: 2, bgcolor: "#fff8f8", borderRadius: 2 }}>
                                <Typography variant="subtitle2" color="primary">
                                  🤖 AI Summary
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                  {r.aiResponse
                                    ? r.aiResponse.short_summary
                                    : "No AI feedback available."}
                                </Typography>
                              </Paper>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #f2f2f2",
                bgcolor: "#fff",
                "&:hover": { boxShadow: "0 4px 15px rgba(211,47,47,0.1)" },
              }}
            >
              <Typography variant="h6" sx={{ color: "#d32f2f", fontWeight: "bold" }}>
                Recent Actions
              </Typography>
              <Button
                startIcon={<FilterListIcon />}
                variant="outlined"
                sx={{
                  mt: 2,
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                  "&:hover": { bgcolor: "#ffebee" },
                }}
              >
                Filter Reports
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Add Button */}
      <Box sx={{ position: "fixed", right: 25, bottom: 25 }}>
        <IconButton
          sx={{
            bgcolor: "#d32f2f",
            color: "#fff",
            "&:hover": { bgcolor: "#b71c1c" },
          }}
          onClick={() => setOpenModal(true)}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Add Report Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#d32f2f", fontWeight: "bold" }}>Add New Report</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Title" name="title" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Test Name" name="testName" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth sx={{ borderColor: "#d32f2f" }}>
                Upload Files
                <input hidden multiple type="file" onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Hospital / Lab" name="hospital" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Doctor" name="doctor" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type="date" name="date" fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Price (Rs)" name="price" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="notes"
                fullWidth
                multiline
                rows={3}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#d32f2f", "&:hover": { bgcolor: "#b71c1c" } }}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
