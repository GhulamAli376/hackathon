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

  // OTP Verify
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
  }

  // Countdown
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(countdown);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Autofocus first input on mount
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

  // Resend button click
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
        height: '97vh',
        background:'linear-gradient(135deg, #E8F5E9, #FFFFFF)',
        px: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          maxWidth: 380,
          width: '100%',
          bgcolor: 'white',
        }}
      >
        <Typography
          variant={isSmallScreen ? 'h6' : 'h5'}
          textAlign="center"
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          Email Verification
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          mb={4}
          color="text.secondary"
        >
          Enter the 6-digit code sent to <strong>{email}</strong>.
        </Typography>

        {/* OTP Input Boxes */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={isSmallScreen ? 1 : 2}
          mb={3}
          sx={{
            overflowX: 'auto',
            flexWrap: 'nowrap',
          }}
        >
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
                  fontSize: isSmallScreen ? '18px' : '20px',
                  width: isSmallScreen ? '40px' : '52px',
                  height: isSmallScreen ? '44px' : '54px',
                  borderRadius: '10px',
                }
              }}
            />
          ))}
        </Box>

        {/* Verify Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          size="large"
          sx={{ mt: 2 }}
          disabled={otp.includes('') || loading}
        >
          {loading ? <CircularProgress size={26} color="inherit" /> : "Verify"}
        </Button>

        {/* Resend OTP */}
        <Typography variant="body2" textAlign="center" mt={3}>
          {timer > 0 ? (
            <>Resend OTP in <strong>{timer}s</strong></>
          ) : (
            <Button
              onClick={handleResend}
              variant="text"
              sx={{ textTransform: 'none', mt: 1 }}
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
