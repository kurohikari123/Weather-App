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
  Grid
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff, 
  Login as LoginIcon 
} from '@mui/icons-material';

// --- 1. Custom Dark Theme to match your screenshot ---
const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // White accents
    },
    secondary: {
      main: '#d05a6e', // That reddish/pink hue from the sunset
    },
  },
  components: {
    // Custom style for Text Fields to make them look good on dark backgrounds
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)', // Subtle border
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff', // White when active
            },
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // Slightly dark input bg
            borderRadius: '12px',
          },
          '& .MuiInputBase-input': {
            color: '#fff', // Input text color
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
      },
    },
  },
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  //Handle login here
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Add your backend login logic here (Axios call)
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* --- Main Background Container --- */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Matches the gradient in your screenshot (Purple -> Red/Orange)
          background: 'linear-gradient(135deg, #120924 0%, #381647 50%, #682643 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        
        {/* Decorative Background Circles (Glow effects) */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(69,27,99,0.4) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168, 62, 76, 0.2) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
          }}
        />

        <Container maxWidth="xs">
          {/* --- Glassmorphism Card --- */}
          <Paper
            elevation={24}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // The Glass Effect
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            }}
          >
            {/* Logo or Icon area */}
            <Box 
              sx={{ 
                mb: 2, 
                p: 2, 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>

            <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 700, letterSpacing: '1px' }}>
              LOGIN
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: 'rgba(255,255,255,0.6)' }}>
              Enter your details to access your dashboard
            </Typography>

            {/* Login Form */}
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  mb: 2,
                  py: 1.5,
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  textTransform: 'none',
                  // Gradient Button
                  // background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', // Blue-Purple
                  // OR use colors from your screenshot:
                  background: 'linear-gradient(45deg, #591E48 30%, #9C334A 90%)', 
                  boxShadow: '0 3px 5px 2px rgba(156, 51, 74, .3)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    background: 'linear-gradient(45deg, #451536 30%, #b03a54 90%)',
                  },
                  color:'white'
                }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Link href="#" variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Forgot password?
                </Link>
              </Grid>
              
              <Grid container justifyContent="center" sx={{ mt: 1 }}>
                 <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    Don't have an account? {' '}
                    <Link href="#" variant="body2" sx={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>
                        Sign Up
                    </Link>
                 </Typography>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
