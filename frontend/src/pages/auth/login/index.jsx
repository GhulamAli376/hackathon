import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../utilis';
import apiEndPoint from '../../../constant/apiEndPoint';
import { toast } from "react-toastify";
import doctor from "../../../assets/Doctor, Medical, Surgeon, Healthcare Animation.json"
const AnimatedLoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (obj) => {
    try {

  navigate('/dashboard');


    } catch (error) {
     toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
   <Stack
  sx={{
    width: '100%',
    minHeight: '97vh',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #E8F5E9, #FFFFFF)',

    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Box
    sx={{
      width: '75vw',
      maxWidth: '900px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
      borderRadius: 4,
      boxShadow: '0px 8px 25px rgba(0,0,0,0.08)',
      height: isMobile ? 'auto' : '70vh',
    }}
  >
    {/* Animation */}
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ duration: 1.5 }}
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: isMobile ? '20px' : 0,
      }}
    >
            <Lottie animationData={doctor} loop autoplay style={{ width: isMobile ? 220 : 320 }} />

    </motion.div>

    {/* Login Form */}
    {showLogin && (
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
          width: '100%',
          maxWidth: 400,
          padding: '0 20px',
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold" sx={{color: '#27AE60'}}>
          Login 
        </Typography>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField label="Email" fullWidth required {...field} />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
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
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
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
          Login
        </Button>

        <Typography align="center" mt={1}>
          Don’t have an account? <Link to="/signup" style={{ color: '#27AE60', fontWeight: '600' }}>Sign Up</Link>
        </Typography>
    
      </motion.form>
    )}
  </Box>
</Stack>

  );
};

export default AnimatedLoginPage;
