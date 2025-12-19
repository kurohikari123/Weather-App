import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton,
  Link,
  CssBaseline,
  Stack,
  FormHelperText
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Person,
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  AppRegistration,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import {userRegister} from './dummydata/api.jsx'

// --- Custom Dark Theme (Matching your Login Page) ---
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' },
    secondary: { main: '#d05a6e' },
    error: { main: '#ff4d4d' },
    success: { main: '#00e676' }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
          },
          '& .MuiInputBase-input': { color: '#fff' },
          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
        },
      },
    },
  },
});

export default function RegistrationPage() {
  // --- State Management ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Handlers ---
  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};
    
    // 1. Name Validation
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      tempErrors.name = "Name must be at least 3 characters";
    }

    // 2. Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    // 3. Password Validation
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    // 4. Confirm Password Validation
    if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Registration Successful:", formData);
      // Perform API call here (e.g., Axios.post('/api/register', formData))
      const response  = await userRegister(formData)

      if(response.status === 1){
        console.log(response)
       }

      console.log('Register Successful:',response)
    }
  };

  // Helper to check if passwords match for visual feedback
  const doPasswordsMatch = formData.password && formData.confirmPassword && (formData.password === formData.confirmPassword);
  const doPasswordsMismatch = formData.confirmPassword && (formData.password !== formData.confirmPassword);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* --- Main Container --- */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #120924 0%, #381647 50%, #682643 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: 4 // Add padding for mobile scrolling
        }}
      >
        
        {/* Decorative Glows */}
        <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(69,27,99,0.4) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(168, 62, 76, 0.2) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }} />

        <Container maxWidth="xs">
          <Paper
            elevation={24}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
          >
            {/* Header Icon */}
            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}>
              <AppRegistration sx={{ fontSize: 40, color: 'white' }} />
            </Box>

            <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 700, letterSpacing: '1px' }}>
              Register
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
              Create your account to start tracking the weather
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Stack spacing={2}>
                
                {/* 1. Name Field */}
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><Person sx={{ color: 'white' }} /></InputAdornment>
                    ),
                  }}
                />

                {/* 2. Email Field */}
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><Email sx={{ color: 'white' }} /></InputAdornment>
                    ),
                  }}
                />

                {/* 3. Password Field */}
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><Lock sx={{ color: 'white' }} /></InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* 4. Confirm Password Field */}
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  // We handle the helper text manually below for the success state
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><Lock sx={{ color: 'white' }} /></InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ color: 'rgba(255,255,255,0.6)' }}>
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                {/* Password Match Indicator UI */}
                {doPasswordsMatch && (
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, pl: 1 }}>
                    <CheckCircle color="success" fontSize="small" />
                    <Typography variant="caption" color="success.main">Passwords match!</Typography>
                  </Stack>
                )}
                {doPasswordsMismatch && (
                   <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, pl: 1 }}>
                    <Cancel color="error" fontSize="small" />
                    <Typography variant="caption" color="error.main">Passwords do not match</Typography>
                  </Stack>
                )}
                {errors.confirmPassword && !doPasswordsMismatch && (
                   <FormHelperText error sx={{ pl: 2 }}>{errors.confirmPassword}</FormHelperText>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'none',
                    background: 'linear-gradient(90deg, #591E48 30%, #9C334A 90%)',
                    boxShadow: '0 3px 5px 2px rgba(156, 51, 74, .3)',
                    color: 'white',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      background: 'linear-gradient(45deg, #451536 30%, #b03a54 90%)',
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Stack>

              <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                 <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Already have an account? {' '}
                    <Link href="/" variant="body2" sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                        Sign In
                    </Link>
                 </Typography>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
