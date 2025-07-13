import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  SearchHistoryItem,
  WeatherError,
  TemperatureUnit,
  WeatherState,
} from '@/types/weather';
import { weatherApi } from '@/lib/api';

interface WeatherActions {
  searchWeather: (cityName: string) => Promise<void>;
  fetchForecast: (cityName: string) => Promise<void>;
  
  toggleUnit: () => void;
  setUnit: (unit: TemperatureUnit) => void;
  
  addToHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  searchFromHistory: (historyItem: SearchHistoryItem) => Promise<void>;
  
  setError: (error: WeatherError | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  clearWeatherData: () => void;
}

type WeatherStore = WeatherState & WeatherActions;

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      currentWeather: null,
      forecast: [],
      searchHistory: [],
      isLoading: false,
      error: null,
      unit: 'metric',

      searchWeather: async (cityName: string) => {
        const { unit, addToHistory } = get();
        
        set({ isLoading: true, error: null });
        
        try {
          const weatherData = await weatherApi.getCurrentWeather(cityName.trim(), unit);
          
          set({ 
            currentWeather: weatherData, 
            isLoading: false,
            error: null 
          });
          
          addToHistory({
            cityName: weatherData.name,
            country: weatherData.country,
          });
          
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
          set({ 
            error: { message: errorMessage }, 
            isLoading: false,
            currentWeather: null 
          });
        }
      },

      fetchForecast: async (cityName: string) => {
        const { unit } = get();
        
        set({ isLoading: true, error: null });
        
        try {
          const forecastData = await weatherApi.getForecast(cityName.trim(), unit);
          
          set({ 
            currentWeather: forecastData.city,
            forecast: forecastData.forecast,
            isLoading: false,
            error: null 
          });
          
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
          set({ 
            error: { message: errorMessage }, 
            isLoading: false 
          });
        }
      },

      toggleUnit: () => {
        const { unit, currentWeather } = get();
        const newUnit = unit === 'metric' ? 'imperial' : 'metric';
        
        set({ unit: newUnit });
        
        if (currentWeather) {
          get().fetchForecast(currentWeather.name);
        }
      },

      setUnit: (unit: TemperatureUnit) => {
        set({ unit });
      },

      addToHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => {
        const { searchHistory } = get();
        
        const existingIndex = searchHistory.findIndex(
          h => h.cityName.toLowerCase() === item.cityName.toLowerCase() && 
               h.country.toLowerCase() === item.country.toLowerCase()
        );
        
        const newItem: SearchHistoryItem = {
          ...item,
          id: `${item.cityName}-${item.country}-${Date.now()}`,
          timestamp: Date.now(),
        };
        
        let newHistory = [...searchHistory];
        
        if (existingIndex !== -1) {
          newHistory.splice(existingIndex, 1);
        }
        
        newHistory.unshift(newItem);
        
        newHistory = newHistory.slice(0, 5);
        
        set({ searchHistory: newHistory });
      },

      clearHistory: () => {
        set({ searchHistory: [] });
      },

      searchFromHistory: async (historyItem: SearchHistoryItem) => {
        await get().fetchForecast(historyItem.cityName);
      },

      setError: (error: WeatherError | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      clearWeatherData: () => {
        set({ 
          currentWeather: null, 
          forecast: [], 
          error: null 
        });
      },
    }),
    {
      name: 'weather-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        unit: state.unit,
      }),
    }
  )
);

export default useWeatherStore;