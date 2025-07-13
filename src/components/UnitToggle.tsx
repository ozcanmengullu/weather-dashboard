'use client';

import React from 'react';
import { useWeatherStore } from '@/store/weatherStore';

const UnitToggle: React.FC = () => {
  const { unit, toggleUnit, isLoading } = useWeatherStore();

  const handleToggle = () => {
    if (!isLoading) {
      toggleUnit();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">Temperature Unit:</span>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          unit === 'metric' ? 'bg-blue-600' : 'bg-gray-400'
        }`}
        role="switch"
        aria-checked={unit === 'metric'}
        aria-label="Toggle temperature unit"
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
            unit === 'metric' ? 'translate-x-1' : 'translate-x-9'
          }`}
        />
        
        <span className="absolute left-1 text-xs font-medium text-white">°C</span>
        <span className="absolute right-1 text-xs font-medium text-white">°F</span>
      </button>
      
      <span className="text-sm text-gray-600">
        {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}
      </span>
    </div>
  );
};

export default UnitToggle;