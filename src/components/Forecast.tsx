'use client';

import React from 'react';
import Image from 'next/image';
import { ForecastDay } from '@/types/weather';
import { useWeatherStore } from '@/store/weatherStore';
import { formatTemperature, formatWindSpeed, formatDate, capitalizeWords, getWeatherConditionStyle } from '@/utils/helper';
import { weatherApi } from '@/lib/api';

interface ForecastProps {
  forecast: ForecastDay[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  const { unit } = useWeatherStore();

  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          5-Day Weather Forecast
        </h3>

        <div className="hidden md:grid md:grid-cols-5 gap-4">
          {forecast.map((day, index) => {
            const conditionStyle = getWeatherConditionStyle(day.condition);
            
            return (
              <div
                key={index}
                className={`${conditionStyle.bgColor} rounded-xl p-4 text-center transition-all duration-200 hover:shadow-md hover:scale-105 border border-gray-100`}
              >
                <div className={`font-semibold ${conditionStyle.textColor} mb-3 text-sm`}>
                  {formatDate(day.date)}
                </div>

                <div className="flex justify-center mb-3">
                  <Image
                    src={weatherApi.getIconUrl(day.icon)}
                    alt={day.description}
                    width={50}
                    height={50}
                    className="drop-shadow-sm"
                  />
                </div>

                <div className="mb-2">
                  <div className={`text-lg font-bold ${conditionStyle.textColor}`}>
                    {formatTemperature(day.tempMax, unit)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatTemperature(day.tempMin, unit)}
                  </div>
                </div>

                <div className="text-xs text-gray-700 mb-2 font-medium">
                  {capitalizeWords(day.condition)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center text-xs text-gray-600">
                    <span className="mr-1">💧</span>
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center text-xs text-gray-600">
                    <span className="mr-1">💨</span>
                    <span>{formatWindSpeed(day.windSpeed, unit)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:hidden space-y-3">
          {forecast.map((day, index) => {
            const conditionStyle = getWeatherConditionStyle(day.condition);
            
            return (
              <div
                key={index}
                className={`${conditionStyle.bgColor} rounded-xl p-4 border border-gray-100`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className={`font-semibold ${conditionStyle.textColor} text-sm`}>
                        {formatDate(day.date)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {capitalizeWords(day.condition)}
                      </div>
                    </div>
                    <Image
                      src={weatherApi.getIconUrl(day.icon)}
                      alt={day.description}
                      width={40}
                      height={40}
                      className="drop-shadow-sm"
                    />
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`text-lg font-bold ${conditionStyle.textColor}`}>
                        {formatTemperature(day.tempMax, unit)}
                      </span>
                      <span className="text-sm text-gray-600">
                        / {formatTemperature(day.tempMin, unit)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-end space-x-3 text-xs text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-1">💧</span>
                        <span>{day.humidity}%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">💨</span>
                        <span>{formatWindSpeed(day.windSpeed, unit)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Forecast data updates every 3 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forecast;