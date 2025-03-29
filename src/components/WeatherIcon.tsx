import React from 'react';
import { Box } from '@mui/material';

interface WeatherIconProps {
  icon: string;
  description: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, description, size = 80 }) => {
  const getIconUrl = () => {
    if (icon === '01n') {
      return '/moon.svg';
    }
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={getIconUrl()}
        alt={description}
        style={{ width: size, height: size }}
      />
    </Box>
  );
};

export default WeatherIcon; 