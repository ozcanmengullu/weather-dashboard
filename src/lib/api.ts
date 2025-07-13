import axios from 'axios';
import {
  WeatherData,
  ForecastDay,
  WeatherForecast,
  OpenWeatherMapResponse,
  OpenWeatherMapForecastResponse,
  TemperatureUnit,
} from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

console.log('API Key:', API_KEY ? 'Set' : 'Not set');

if (!API_KEY) {
  console.warn('OpenWeatherMap API key is not configured');
}

const transformWeatherData = (data: OpenWeatherMapResponse): WeatherData => {
  return {
    id: data.id,
    name: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    feelsLike: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    visibility: data.visibility,
  };
};

const transformForecastData = (data: OpenWeatherMapForecastResponse): ForecastDay[] => {
  const dailyForecasts = new Map<string, OpenWeatherMapForecastResponse['list']>();
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split('T')[0];
    if (!dailyForecasts.has(dateStr)) {
      dailyForecasts.set(dateStr, []);
    }
    dailyForecasts.get(dateStr)?.push(item);
  });

  const forecasts: ForecastDay[] = [];
  const sortedDates = Array.from(dailyForecasts.keys()).sort();
  
  sortedDates.slice(0, 5).forEach((dateKey) => {
    const items = dailyForecasts.get(dateKey)!;
    const temps = items.map(item => item.main.temp);
    const tempMax = Math.round(Math.max(...temps));
    const tempMin = Math.round(Math.min(...temps));
    
    const representative = items[0];
    
    forecasts.push({
      date: dateKey,
      tempMax,
      tempMin,
      condition: representative.weather[0].main,
      description: representative.weather[0].description,
      icon: representative.weather[0].icon,
      humidity: representative.main.humidity,
      windSpeed: representative.wind.speed,
    });
  });

  return forecasts;
};

export const weatherApi = {
  async getCurrentWeather(cityName: string, unit: TemperatureUnit = 'metric'): Promise<WeatherData> {
    try {
      const response = await axios.get<OpenWeatherMapResponse>(`${BASE_URL}/weather`, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: unit,
        },
      });

      return transformWeatherData(response.data);
    } catch (error) {
      console.error('API Error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
        } else if (error.response?.status === 401) {
          throw new Error('API key is invalid or missing.');
        } else if (error.response?.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        } else {
          throw new Error('Failed to fetch weather data. Please try again.');
        }
      }
      throw new Error('Network error. Please check your connection and try again.');
    }
  },

  async getForecast(cityName: string, unit: TemperatureUnit = 'metric'): Promise<WeatherForecast> {
    try {
      const [currentWeather, forecastResponse] = await Promise.all([
        this.getCurrentWeather(cityName, unit),
        axios.get<OpenWeatherMapForecastResponse>(`${BASE_URL}/forecast`, {
          params: {
            q: cityName,
            appid: API_KEY,
            units: unit,
          },
        }),
      ]);

      const forecast = transformForecastData(forecastResponse.data);

      return {
        city: currentWeather,
        forecast,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
        } else if (error.response?.status === 401) {
          throw new Error('API key is invalid or missing.');
        } else if (error.response?.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        } else {
          throw new Error('Failed to fetch forecast data. Please try again.');
        }
      }
      throw new Error('Network error. Please check your connection and try again.');
    }
  },

  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  },
};

export default weatherApi;