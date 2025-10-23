import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../../utilis';
import apiEndPoint from '../../../constant/apiEndPoint';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Lottie from 'lottie-react';

const OtpVerification = () => {
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Verify OTP
  const handleOtpVerification = async () => {
    try {
      setLoading(true);
      const finalOtp = otp.join('');
      if (finalOtp.length !== 6) {
        toast.error("Please enter all 6 digits");
        return;
      }

      const updateObj = { otp: finalOtp, email };
      const response = await axios.post(`${BASE_URL}${apiEndPoint.otpVerification}`, updateObj);

      if (response.data.status) {
        toast.success("Account Verified 🎉");
        navigate('/');
      } else {
        toast.error(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}${apiEndPoint.otpResend}`, { email });
      if (res.data.status) {
        toast.success("OTP resent successfully 🚀");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  // Countdown Timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Focus first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle typing
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit
  const handleSubmit = () => {
    if (otp.includes('')) {
      toast.error("Please fill all fields");
      return;
    }
    handleOtpVerification();
  };

  // Resend OTP button
  const handleResend = async () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(60);
    await resendOtp();
    inputRefs.current[0]?.focus();
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '97vh',
        background: 'linear-gradient(135deg, #fce4ec, #ffffff)',
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          maxWidth: 400,
          width: '100%',
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        

        <Typography
          variant={isSmallScreen ? 'h6' : 'h5'}
          fontWeight="bold"
          color="error"
          gutterBottom
        >
          Verify Your Email
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={4}
        >
          We’ve sent a 6-digit verification code to <strong>{email}</strong>.
        </Typography>

        {/* OTP Inputs */}
        <Box display="flex" justifyContent="center" gap={isSmallScreen ? 1 : 1.5} mb={3}>
          {otp.map((value, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: isSmallScreen ? '18px' : '22px',
                  width: isSmallScreen ? '40px' : '50px',
                  height: isSmallScreen ? '45px' : '55px',
                  borderRadius: '10px',
                },
              }}
            />
          ))}
        </Box>

        {/* Verify Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit}
          disabled={otp.includes('') || loading}
          sx={{
            background: 'linear-gradient(90deg, #e53935, #b71c1c)',
            color: 'white',
            py: 1.2,
            borderRadius: 2,
            fontWeight: 'bold',
            '&:hover': { background: 'linear-gradient(90deg, #b71c1c, #880e4f)' },
          }}
        >
          {loading ? <CircularProgress size={26} color="inherit" /> : 'Verify Account'}
        </Button>

        {/* Timer / Resend */}
        <Typography variant="body2" mt={3} color="text.secondary">
          {timer > 0 ? (
            <>Didn’t receive the code? Resend in <strong>{timer}s</strong></>
          ) : (
            <Button
              onClick={handleResend}
              variant="text"
              sx={{ textTransform: 'none', color: '#d32f2f', fontWeight: 600 }}
            >
              Resend OTP
            </Button>
          )}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default OtpVerification;
