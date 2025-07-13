'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherStore } from '@/store/weatherStore';
import { debounce, validateCityName, formatRelativeTime } from '@/utils/helper';
import { SearchHistoryItem } from '@/types/weather';

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    searchHistory,
    isLoading,
    error,
    fetchForecast,
    clearHistory,
    searchFromHistory,
    clearError,
  } = useWeatherStore();

  const debouncedValidation = debounce((value: string) => {
    if (value.trim()) {
      const validation = validateCityName(value);
      setValidationError(validation.isValid ? null : validation.error || null);
    } else {
      setValidationError(null);
    }
  }, 300);

  useEffect(() => {
    debouncedValidation(query);
  }, [query, debouncedValidation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setValidationError('Please enter a city name');
      return;
    }

    const validation = validateCityName(query);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Invalid city name');
      return;
    }

    setValidationError(null);
    clearError();
    setShowHistory(false);
    
    await fetchForecast(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (error) {
      clearError();
    }
  };

  const handleInputFocus = () => {
    if (searchHistory.length > 0) {
      setShowHistory(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowHistory(false), 200);
  };

  const handleHistoryItemClick = async (item: SearchHistoryItem) => {
    setQuery(`${item.cityName}, ${item.country}`);
    setShowHistory(false);
    setValidationError(null);
    clearError();
    
    await searchFromHistory(item);
  };

  const handleClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearHistory();
    setShowHistory(false);
  };

  const clearInput = () => {
    setQuery('');
    setValidationError(null);
    if (error) {
      clearError();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for a city... (e.g., London, Tokyo, New York)"
            className={`w-full px-4 py-3 pl-12 pr-12 text-lg rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600 ${
              validationError || error
                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-200 bg-white hover:border-gray-300 focus:border-blue-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isLoading}
          />
          
          <div className="absolute left-4">
            <SearchIcon 
              className={`h-5 w-5 ${
                validationError || error ? 'text-red-400' : 'text-gray-400'
              }`} 
            />
          </div>

          {query && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              disabled={isLoading}
            >
              <XIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !!validationError || !query.trim()}
          className="mt-3 w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            'Search Weather'
          )}
        </button>
      </form>

      {validationError && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {validationError}
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <span>{error.message}</span>
            <button
              onClick={clearError}
              className="ml-2 text-red-400 hover:text-red-600"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
            <button
              onClick={handleClearHistory}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
          </div>
          
          <div className="py-2">
            {searchHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => handleHistoryItemClick(item)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {item.cityName}, {item.country}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(item.timestamp)}
                    </div>
                  </div>
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;