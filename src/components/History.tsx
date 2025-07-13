'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import { formatRelativeTime } from '@/utils/helper';
import { SearchHistoryItem } from '@/types/weather';

const History: React.FC = () => {
  const { searchHistory, searchFromHistory, clearHistory, isLoading } = useWeatherStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || searchHistory.length === 0) {
    return null;
  }

  const handleHistoryClick = async (item: SearchHistoryItem) => {
    if (!isLoading) {
      await searchFromHistory(item);
    }
  };

  const handleClearHistory = () => {
    if (!isLoading) {
      clearHistory();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Recent Searches
          </h3>
          <button
            onClick={handleClearHistory}
            disabled={isLoading}
            className="text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-2">
          {searchHistory.map((item) => (
            <button
              key={item.id}
              onClick={() => handleHistoryClick(item)}
              disabled={isLoading}
              className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-700">
                    {item.cityName}, {item.country}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatRelativeTime(item.timestamp)}
                  </div>
                </div>
                
                <div className="text-blue-400 group-hover:text-blue-600 transition-colors">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Click on any city to view its current weather
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;