import React from 'react';
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
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Example: single-file React component using MUI and Recharts
// Install: npm install @mui/material @emotion/react @emotion/styled recharts

const sampleChartData = [
  { date: 'Oct 01', systolic: 135, diastolic: 90, sugar: 110 },
  { date: 'Oct 05', systolic: 132, diastolic: 88, sugar: 105 },
  { date: 'Oct 09', systolic: 130, diastolic: 86, sugar: 102 },
  { date: 'Oct 12', systolic: 128, diastolic: 85, sugar: 100 },
  { date: 'Oct 15', systolic: 126, diastolic: 83, sugar: 98 }
];

const sampleReports = [
  { title: 'CBC Report', test: 'C B C', lab: 'Aga Khan', doctor: 'Dr. Ahmed', date: '2025-10-15', price: 'Rs 8500', flag: 'Normal' },
  { title: 'ABG Ward', test: 'A B G', lab: 'Ziauddin', doctor: 'Dr. Sara', date: '2025-10-12', price: 'Rs 5000', flag: 'Mild High' },
  { title: 'Ultrasound Abdomen', test: 'Ultrasound', lab: 'South City', doctor: 'Dr. Imran', date: '2025-10-09', price: 'Rs 4200', flag: 'Normal' }
];

export default function vitalTrends() {
  return (
    <Box sx={{ bgcolor: '#f6f7fb', minHeight: '100vh', pb: 4 }}>
      {/* Top bar */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: '#ff6b6b' }}>HM</Avatar>
            <Box>
              <Typography variant="h6">HealthMate</Typography>
              <Typography variant="caption" color="text.secondary">Sehat ka Smart Dost</Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="contained" startIcon={<AddIcon />} size="small">Add new report</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3 }} elevation={1}>
              <Typography variant="h6" sx={{ mb: 1 }}>Vitals trend</Typography>
              <Typography variant="caption" color="text.secondary">Systolic / Diastolic BP and Fasting Sugar</Typography>

              <Box sx={{ height: 260, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="systolic" stroke="#8e44ad" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="diastolic" stroke="#27ae60" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="sugar" stroke="#e67e22" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

            </Paper>

            <Paper sx={{ p: 2, mt: 3, borderRadius: 3 }} elevation={0}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <SearchIcon color="action" />
                    <TextField placeholder="Search by name, test, etc." variant="standard" fullWidth />
                  </Stack>
                </Grid>

                <Grid item xs={6} md={3}>
                  <TextField label="From" variant="standard" placeholder="mm/dd/yyyy" fullWidth />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField label="To" variant="standard" placeholder="mm/dd/yyyy" fullWidth />
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Test</TableCell>
                          <TableCell>Lab/Hospital</TableCell>
                          <TableCell>Doctor</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Flag</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sampleReports.map((r, i) => (
                          <TableRow key={i}>
                            <TableCell>{r.title}</TableCell>
                            <TableCell>{r.test}</TableCell>
                            <TableCell>{r.lab}</TableCell>
                            <TableCell>{r.doctor}</TableCell>
                            <TableCell>{r.date}</TableCell>
                            <TableCell>{r.price}</TableCell>
                            <TableCell><Chip label={r.flag} size="small" /></TableCell>
                            <TableCell align="right"><Button size="small">View</Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Paper>

          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, borderRadius: 3, height: '100%' }} elevation={1}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1">You</Typography>
                  <Typography variant="caption" color="text.secondary">Self</Typography>
                </Box>

                <Paper sx={{ p: 2, borderRadius: 2 }} elevation={0}>
                  <Typography variant="body2" color="text.secondary">Member detail • Graph • Add reason</Typography>
                </Paper>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2">Recent Actions</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Button startIcon={<FilterListIcon />} variant="outlined" size="small">Filter</Button>
                  </Box>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">Video</Typography>
                  <Box sx={{ mt: 1, height: 160, bgcolor: '#eee', borderRadius: 1 }} />
                </Box>

              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ position: 'fixed', right: 20, bottom: 20 }}>
        <IconButton color="primary" sx={{ bgcolor: 'primary.main', color: '#fff' }}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
