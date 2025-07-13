'use client';

import React from 'react';
import Image from 'next/image';
import { WeatherData } from '@/types/weather';
import { useWeatherStore } from '@/store/weatherStore';
import { formatTemperature, formatWindSpeed, capitalizeWords, getWeatherConditionStyle } from '@/utils/helper';
import { weatherApi } from '@/lib/api';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { unit } = useWeatherStore();
  const conditionStyle = getWeatherConditionStyle(weather.condition);

  const weatherDetails = [
    {
      label: 'Feels like',
      value: formatTemperature(weather.feelsLike, unit),
      icon: '🌡️'
    },
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      icon: '💧'
    },
    {
      label: 'Wind Speed',
      value: formatWindSpeed(weather.windSpeed, unit),
      icon: '💨'
    },
    {
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      icon: '📊'
    },
    {
      label: 'Visibility',
      value: `${Math.round(weather.visibility / 1000)} km`,
      icon: '👁️'
    }
  ];

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 ${conditionStyle.bgColor} transition-all duration-300 hover:shadow-xl`}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
      </div>

      <div className="relative p-6">
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold ${conditionStyle.textColor} mb-1`}>
            {weather.name}, {weather.country}
          </h2>
          <p className="text-gray-600 text-sm">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Image
                  src={weatherApi.getIconUrl(weather.icon)}
                  alt={weather.description}
                  width={80}
                  height={80}
                  className="drop-shadow-lg"
                />
              </div>
            </div>

            <div className={`text-5xl font-bold ${conditionStyle.textColor} mb-2`}>
              {formatTemperature(weather.temperature, unit)}
            </div>

            <div className="text-lg font-medium text-gray-700 mb-1">
              {capitalizeWords(weather.condition)}
            </div>
            <div className="text-sm text-gray-600">
              {capitalizeWords(weather.description)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {weatherDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center transition-all duration-200 hover:bg-white/80 hover:scale-105"
            >
              <div className="text-2xl mb-2">{detail.icon}</div>
              <div className="text-xs text-gray-600 mb-1 font-medium">
                {detail.label}
              </div>
              <div className="text-sm font-bold text-gray-800">
                {detail.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;