'use client';

import React from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import { getTimeGreeting } from '@/utils/helper';
import SearchBar from '@/components/SearchBar';
import UnitToggle from '@/components/UnitToggle';
import WeatherCard from '@/components/WeatherCard';
import Forecast from '@/components/Forecast';
import History from '@/components/History';

export default function Home() {
  const { currentWeather, forecast, isLoading, error } = useWeatherStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Weather Dashboard
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            {getTimeGreeting()}! Get real-time weather information for any city.
          </p>
          
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <UnitToggle />
            </div>
          </div>
        </header>

        <section className="mb-8">
          <SearchBar />
        </section>

        <main className="space-y-8">
          {isLoading && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span className="text-white font-medium">Loading weather data...</span>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center">
              <div className="bg-red-100 border border-red-300 rounded-xl p-6 max-w-2xl mx-auto">
                <div className="text-red-600 font-medium mb-2">
                  Unable to fetch weather data
                </div>
                <div className="text-red-500 text-sm">
                  {error.message}
                </div>
              </div>
            </div>
          )}

          {currentWeather && !isLoading && (
            <div className="space-y-8">
              <section>
                <WeatherCard weather={currentWeather} />
              </section>

              {forecast && forecast.length > 0 && (
                <section>
                  <Forecast forecast={forecast} />
                </section>
              )}
            </div>
          )}

          {!currentWeather && !isLoading && !error && (
            <div className="text-center py-16">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🌤️</div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Welcome to Weather Dashboard
                </h2>
                <p className="text-blue-100 mb-6">
                  Search for any city above to get started with real-time weather information 
                  and 5-day forecasts.
                </p>
                <div className="text-sm text-blue-200">
                  <p>✨ Real-time weather data</p>
                  <p>📅 5-day forecast</p>
                  <p>📱 Fully responsive design</p>
                  <p>🔄 Metric & Imperial units</p>
                </div>
              </div>
            </div>
          )}

          {!currentWeather && !isLoading && (
            <section>
              <History />
            </section>
          )}
        </main>

        <footer className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-blue-100 text-sm">
              Weather data provided by OpenWeatherMap API
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
