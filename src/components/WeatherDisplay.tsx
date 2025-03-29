import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import WeatherIcon from './WeatherIcon';

interface WeatherDisplayProps {
  weatherData: {
    name: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    timezone: number;
  };
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      date.setSeconds(date.getSeconds() + weatherData.timezone);
      setLocalTime(date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [weatherData.timezone]);

  return (
    <Card sx={{ 
      mb: 4,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'none'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <WeatherIcon 
            icon={weatherData.weather[0].icon}
            description={weatherData.weather[0].description}
            size={120}
          />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
          {weatherData.name}, {weatherData.sys.country}
        </Typography>
        <Typography variant="h2" component="div" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
          {Math.round(weatherData.main.temp)}°C
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
          {weatherData.weather[0].description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Hora local: {localTime}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Humedad: {weatherData.main.humidity}%
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Viento: {weatherData.wind.speed} m/s
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay; 