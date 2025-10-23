import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utilis";
import apiEndPoint from "../../../constant/apiEndPoint";
import { toast } from "react-toastify";
import doctor from "../../../assets/Doctor, Medical, Surgeon, Healthcare Animation.json";

const AnimatedLoginPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (obj) => {
    try {
      const response = await axios.post(`${BASE_URL}${apiEndPoint.login}`, obj);
      if (!response.data.status) throw response.data.message;
      Cookie.set("token", response.data.token);
      toast.success("Login successful!");
      navigate("/addfamilymember");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack
      sx={{
        width: "98%",
        minHeight: "94vh",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #b71c1c, #d32f2f, #f44336)",
        p: 1,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "950px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          p: isMobile ? 3 : 4,
          borderRadius: 5,
          boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
          gap: isMobile ? 2 : 4,
        }}
      >
        {/* Animation Side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Lottie
            animationData={doctor}
            loop
            autoplay
            style={{
              width: isMobile ? 230 : 350,
              height: isMobile ? 230 : 350,
            }}
          />
        </motion.div>

        {/* Login Form */}
        {showLogin && (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
              width: "100%",
              maxWidth: 400,
              padding: "0 20px",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              sx={{
                color: "#d32f2f",
                mb: 2,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Welcome Back ❤️
            </Typography>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  fullWidth
                  required
                  {...field}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      "&.Mui-focused fieldset": {
                        borderColor: "#d32f2f",
                      },
                    },
                  }}
                />
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
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 3,
                      "&.Mui-focused fieldset": {
                        borderColor: "#d32f2f",
                      },
                    }}
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
                fontWeight: "600",
                borderRadius: 3,
                textTransform: "none",
                fontFamily: "Poppins, sans-serif",
                background: "linear-gradient(90deg,#c62828,#f44336)",
                boxShadow: "0px 4px 15px rgba(244,67,54,0.4)",
                "&:hover": {
                  background: "linear-gradient(90deg,#b71c1c,#e53935)",
                },
              }}
            >
              Login
            </Button>

            <Typography
              align="center"
              mt={1}
              sx={{ color: "#666", fontFamily: "Poppins, sans-serif" }}
            >
              Don’t have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#d32f2f",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </motion.form>
        )}
      </Box>
    </Stack>
  );
};

export default AnimatedLoginPage;
