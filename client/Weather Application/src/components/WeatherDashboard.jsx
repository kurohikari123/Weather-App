import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useCallback useState } from "react";
import { forecastData, scheduleData } from "./dummydata/DummyData";
import getWeatherData from './dummydata/api.jsx'

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600, fontSize: "6rem" },
    h2: { fontWeight: 600, fontSize: "3.75rem" },
    h5: { fontWeight: 500 },
    body1: { color: "rgba(255, 255, 255, 0.8)" },
    body2: { color: "rgba(255, 255, 255, 0.6)" },
  },
});

// --- Main Weather Dashboard Component ---
export default function WeatherDashboard() {
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // --- Time and Date Formatting ---
  // This function formats the time and ensures it includes AM/PM
  const formatTime = (date) => {
    // We get a string like "10:30 PM"
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Here, we split the string "10:30 PM" into ["10:30", "PM"]
  const [time, period] = formatTime(currentTime).split(" ");

  const handleForecastClick = (index) => {
    setSelectedDayIndex(index);
    // In a real app, you would also trigger a data fetch or update the main display here
  };

  const currentDisplayWeather = forecastData[selectedDayIndex];
  // Destructure for easier access in the JSX
  const {
    temp: displayTemp,
    Icon: DisplayIcon,
    condition: displayCondition,
  } = currentDisplayWeather;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          color: "white",
          position: "relative",
          overflow: "hidden",

          // --- KEY CHANGES FOR YOUR BACKGROUND IMAGE ---
          // The URL starts with '/' which points to your 'public' folder.
          // Make sure the filename matches what you exported!
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.45)),url(/cityscape.jpg)",

          // These properties ensure the background behaves correctly:
          backgroundSize: "cover", // Stretches to cover the whole area
          backgroundPosition: "center bottom", // Anchors the image to the bottom
          backgroundRepeat: "no-repeat", // Prevents the image from tiling

          // Fallback color in case the image fails to load
          backgroundColor: "#0d1a44",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            py: 4,
            zIndex: 1,
            justifyContent: "space-between",
            gap: "7rem",
          }}
        >
          {/* Top Section */}
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            {/* Left Side: Time, Date, Temp, Schedule */}
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="baseline" sx={{ mb: 2 }}>
                <Typography variant="h2">{time}</Typography>
                <Typography
                  variant="h5"
                  sx={{ ml: 1, textTransform: "uppercase" }}
                >
                  {period}
                </Typography>
              </Box>
              <Typography variant="body1">{formatDate(currentTime)}</Typography>

              <Box mt={4}>
                <Typography
                  variant="body1"
                  sx={{
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  NEXT
                </Typography>
                {scheduleData.map((item) => (
                  <Box
                    key={item.time}
                    display="flex"
                    alignItems="center"
                    mt={1}
                  >
                    <Typography variant="body1" sx={{ minWidth: "70px" }}>
                      {item.time}
                    </Typography>
                    <Typography variant="body1" color="inherit">
                      {item.event}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right Side: Weather Condition */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: { xs: "left", md: "right" },
                mt: { xs: 4, md: 0 },
              }}
            >
              <DisplayIcon
                style={{ width: 60, height: 60, marginBottom: "8px" }}
              />
              <Typography variant="h5">{displayCondition}</Typography>
              <Typography variant="body2">Terraxia, Cosmos'Eternal</Typography>
              <Typography variant="h1" sx={{ ml: 4 }}>
                {displayTemp}°
              </Typography>
            </Grid>
          </Grid>

          {/* Middle Section: Cityscape Placeholder */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: 4, // Add margin for spacing
            }}
          ></Box>

          {/* Bottom Section: Forecast */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
              scrollbarWidth: "none", // For Firefox
            }}
          >
            {forecastData.map(({ day, temp, Icon }, index) => {
              const isActive = selectedDayIndex === index;
              return (
                <Paper
                  key={day}
                  elevation={0}
                  onClick={() => handleForecastClick(index)} // Make the paper clickable
                  sx={{
                    background: isActive
                      ? "rgba(255, 255, 255, 0.15)"
                      : "transparent",
                    backdropFilter: isActive ? "blur(10px)" : "none",
                    borderRadius: "12px",
                    textAlign: "center",
                    p: 2,
                    minWidth: "90px",
                    border: isActive
                      ? "1px solid rgba(255, 255, 255, 0.2)"
                      : "1px solid transparent",
                    flexShrink: 0,
                    cursor: "pointer", // Show it's clickable
                    transition: "background 0.3s ease", // Smooth transition
                    "&:hover": {
                      background: !isActive && "rgba(255, 255, 255, 0.05)", // Add hover effect for non-active items
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, textTransform: "uppercase" }}
                  >
                    {day}
                  </Typography>
                  <Icon
                    style={{
                      width: 32,
                      height: 32,
                      margin: "8px 0",
                      // Conditionally change the icon color
                      color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                    }}
                  />
                  <Typography variant="h6">{temp}°</Typography>
                </Paper>
              );
            })}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
