import { TemperatureUnit } from '@/types/weather';

export const convertTemperature = (temp: number, from: TemperatureUnit, to: TemperatureUnit): number => {
  if (from === to) return temp;
  
  if (from === 'metric' && to === 'imperial') {
    return (temp * 9/5) + 32;
  } else if (from === 'imperial' && to === 'metric') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

export const formatTemperature = (temp: number, unit: TemperatureUnit): string => {
  const symbol = unit === 'metric' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

export const formatWindSpeed = (speed: number, unit: TemperatureUnit): string => {
  const unitSymbol = unit === 'metric' ? 'm/s' : 'mph';
  return `${Math.round(speed)} ${unitSymbol}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

export const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Good Morning';
  } else if (hour < 17) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};

export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  wait: number
): ((...args: T) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getWeatherConditionStyle = (condition: string): { 
  color: string; 
  bgColor: string; 
  textColor: string 
} => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
    return {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800'
    };
  } else if (conditionLower.includes('cloud')) {
    return {
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-800'
    };
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return {
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800'
    };
  } else if (conditionLower.includes('snow')) {
    return {
      color: 'text-blue-200',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900'
    };
  } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
    return {
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800'
    };
  } else {
    return {
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-800'
    };
  }
};

export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

export const validateCityName = (cityName: string): { isValid: boolean; error?: string } => {
  const trimmed = cityName.trim();
  
  if (!trimmed) {
    return { isValid: false, error: 'Please enter a city name' };
  }
  
  if (trimmed.length < 2) {
    return { isValid: false, error: 'City name must be at least 2 characters long' };
  }
  
  if (trimmed.length > 50) {
    return { isValid: false, error: 'City name is too long' };
  }
  
  const validCityRegex = /^[a-zA-Z\s\-',.]+$/;
  if (!validCityRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid city name' };
  }
  
  return { isValid: true };
};