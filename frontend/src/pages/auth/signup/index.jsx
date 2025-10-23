import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import apiEndPoint from "../../../constant/apiEndPoint";
import { BASE_URL } from "../../../utilis";
import doctor from "../../../assets/Doctor.json";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onSubmit = async (obj) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}${apiEndPoint.signUp}`, obj);
      if (!response.data.status) throw new Error(response.data.message);

      toast.success("Signup successful! Please verify OTP.");
      navigate("/otpVerification", { state: { email: obj.email } });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      sx={{
        width: "98%",
        minHeight: "91vh",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #b71c1c, #d32f2f, #f44336)",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
            overflow: "hidden",
            px: { xs: 3, sm: 5, md: 8 },
            py: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {/* Left Animation */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              py: 2,
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
          </Box>

          {/* Signup Form */}
          <Stack sx={{ flex: 1, width: "100%", maxWidth: 420 }}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
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
                Create Account ❤️
              </Typography>

              <Stack sx={{ gap: 2 }}>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: "Full name is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      label="Full Name"
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
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
                  rules={{ required: "Password is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
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
                      {error && (
                        <Typography color="error" fontSize="12px">
                          {error.message}
                        </Typography>
                      )}
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
                    fontWeight: "600",
                    borderRadius: 3,
                    textTransform: "none",
                    background: "linear-gradient(90deg,#c62828,#f44336)",
                    boxShadow: "0px 4px 15px rgba(244,67,54,0.4)",
                    "&:hover": {
                      background: "linear-gradient(90deg,#b71c1c,#e53935)",
                    },
                  }}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </Stack>

              <Typography
                align="center"
                mt={2}
                fontSize="14px"
                sx={{ color: "#666", fontFamily: "Poppins, sans-serif" }}
              >
                Already have an account?{" "}
                <Link
                  to="/"
                  style={{
                    color: "#d32f2f",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </form>
          </Stack>
        </Box>
      </Container>
    </Stack>
  );
};

export default Signup;
