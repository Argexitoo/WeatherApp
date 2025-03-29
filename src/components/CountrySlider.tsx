import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';

interface CountryWeather {
  name: string;
  country: string;
  temp: number;
  description: string;
  id: string;
  icon: string;
  timezone: number;
}

const popularCities = [
  { name: 'Madrid', country: 'ES' },
  { name: 'New York', country: 'US' },
  { name: 'Tokyo', country: 'JP' },
  { name: 'London', country: 'GB' },
  { name: 'Paris', country: 'FR' },
  { name: 'Sydney', country: 'AU' },
  { name: 'Dubai', country: 'AE' },
  { name: 'Singapore', country: 'SG' },
];

const CountrySlider: React.FC<{ onCitySelect: (city: string) => void }> = ({ onCitySelect }) => {
  const [weatherData, setWeatherData] = useState<CountryWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localTimes, setLocalTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        
        if (!API_KEY) {
          throw new Error('API key no configurada');
        }

        const promises = popularCities.map(async (city) => {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${API_KEY}&units=metric&lang=es`
            );
            return {
              name: response.data.name,
              country: response.data.sys.country,
              temp: Math.round(response.data.main.temp),
              description: response.data.weather[0].description,
              icon: response.data.weather[0].icon,
              timezone: response.data.timezone,
              id: `${city.name}-${city.country}`,
            };
          } catch (err) {
            console.error(`Error fetching weather for ${city.name}:`, err);
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validResults = results.filter((result): result is CountryWeather => result !== null);
        setWeatherData(validResults);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('No se pudieron cargar los datos del clima');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const times: { [key: string]: string } = {};
      weatherData.forEach(city => {
        const date = new Date();
        date.setSeconds(date.getSeconds() + city.timezone);
        times[city.id] = date.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
      });
      setLocalTimes(times);
    };

    if (weatherData.length > 0) {
      updateTimes();
      const interval = setInterval(updateTimes, 1000);
      return () => clearInterval(interval);
    }
  }, [weatherData]);

  const handleCityClick = (cityName: string) => {
    onCitySelect(cityName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
        Ciudades Populares
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {weatherData.map((city) => (
          <Box
            key={city.id}
            sx={{
              width: {
                xs: '100%',
                sm: 'calc(50% - 8px)',
                md: 'calc(25% - 8px)',
                maxWidth: '300px',
              },
              display: 'flex',
            }}
          >
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                  transform: 'rotate(45deg)',
                }
              }}
              onClick={() => handleCityClick(city.name)}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  <WeatherIcon 
                    icon={city.icon}
                    description={city.description}
                  />
                </Box>
                <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                  {city.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                  {city.country}
                </Typography>
                <Typography variant="h4" sx={{ color: 'white', my: 1, textAlign: 'center' }}>
                  {city.temp}°C
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                  {city.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', mt: 1 }}>
                  {localTimes[city.id] || 'Cargando...'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default CountrySlider; 