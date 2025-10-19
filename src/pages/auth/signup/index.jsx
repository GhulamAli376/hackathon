import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Container,
  useMediaQuery,
  useTheme,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import { toast } from 'react-toastify';

import apiEndPoint from '../../../constant/apiEndPoint';
import { BASE_URL } from '../../../utilis';
import doctor from "../../../assets/Doctor.json"

const Signup = () => {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (obj) => {
    setLoading(true);
    try {
      navigate('/otpVerification', { state: { email: obj.email } });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 3000),
      setTimeout(() => setStep(2), 6000),
      setTimeout(() => setStep(3), 9000),
      setTimeout(() => setStep(4), 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const renderAnimation = () => {
    const animStyle = {
      width: isMobile ? "200px" : "300px",
      maxWidth: "100%",
      height: "auto",
    };

    switch (step) {
      case 0:
        return <Lottie animationData={walkAnim} loop={false} style={animStyle} />;
      case 1:
        return <Lottie animationData={bagDropAnim} loop={false} style={animStyle} />;
      case 2:
        return <Lottie animationData={glowAnim} loop={false} style={animStyle} />;
      default:
        return <Lottie animationData={walkAnim} loop={true} style={animStyle} />;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Box
       sx={{
    width: '100%',
    minHeight: '97vh',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #E8F5E9, #FFFFFF)',
alignContent:'center',
    justifyContent: 'center',
    alignItems: 'center',
  }}
    >
      <Container maxWidth="lg">

        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 4,
            boxShadow: 4,
            overflow: 'hidden',
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 3, sm: 5 },
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >

          {/* Left Animation */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', py: 2 }}>
                      <Lottie animationData={doctor} loop autoplay style={{ width: isMobile ? 220 : 320 }} />

          </Box>

          {/* Signup Form */}

           
          <Stack sx={{ flex: 1, width: '100%'}}>

            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
              <Typography
               variant="h5" align="center" fontWeight="bold" 
               sx={{color: '#27AE60',margin:1}}
              >
                Create Account
              </Typography>
<Stack sx={{gap:2}}>

                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: 'Full name is required' }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        label="Full Name"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        {...field}
                      />
                    )}
                  />

                
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <FormControl fullWidth variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          label="Password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {error && <Typography color="error" fontSize="12px">{error.message}</Typography>}
                      </FormControl>
                    )}
                  />


              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
            mt: 1,
            py: 1.3,
            fontWeight: '600',
            borderRadius: 2,
            textTransform: 'none',
            background: 'linear-gradient(90deg,#27AE60,#219150)',
            '&:hover': { background: 'linear-gradient(90deg,#219150,#1e874b)' },
          }}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
   </Stack>
              <Typography align="center" mt={2} fontSize="14px">
                Already have an account? <Link to="/"  style={{ color: '#27AE60', fontWeight: '600' }}>Login</Link>
              </Typography>
            </form>
          </Stack>


        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
