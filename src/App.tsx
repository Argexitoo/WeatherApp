import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import CountrySlider from './components/CountrySlider';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Madrid');

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      
      if (!API_KEY) {
        throw new Error('API key no configurada');
      }

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      setWeatherData(response.data);
      setSelectedCity(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('No se pudo encontrar la ciudad especificada');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, []);

  const handleCitySelect = (city: string) => {
    fetchWeatherData(city);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          py: 4,
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          borderRadius: '20px',
          px: { xs: 2, sm: 4 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            textAlign: 'center', 
            color: 'white', 
            mb: 4,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          WeatherApp
        </Typography>

        <SearchBar onSearch={handleCitySelect} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : error ? (
          <Typography 
            color="error" 
            sx={{ 
              textAlign: 'center', 
              mb: 2,
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 0, 0, 0.2)',
            }}
          >
            {error}
          </Typography>
        ) : weatherData && weatherData.weather && weatherData.weather.length > 0 ? (
          <WeatherDisplay weatherData={weatherData} />
        ) : null}

        <CountrySlider onCitySelect={handleCitySelect} />
      </Box>
    </Container>
  );
}

export default App;
