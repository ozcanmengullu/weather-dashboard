# Weather Dashboard

A comprehensive, responsive weather dashboard built with Next.js 14+, TypeScript, and Tailwind CSS. Get real-time weather data and 5-day forecasts for any city worldwide.

![Weather Dashboard](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### Core Functionality
- **🔍 Smart Search**: Advanced city search with validation and error handling
- **🌤️ Complete Weather Display**: Temperature (both units), conditions, humidity, wind speed, and more
- **🎨 Dynamic Weather Icons**: Icons that change based on weather conditions
- **⚠️ Robust Error Handling**: User-friendly error messages for invalid searches and API failures
- **📝 Search History**: Persistent history of last 5 searched cities with localStorage

### User Experience & Design
- **📱 Fully Responsive**: Optimized for mobile, tablet, and desktop
- **🎯 Intuitive UI**: Clean, modern interface with smooth transitions
- **🌈 Beautiful Gradients**: Weather-condition-based color schemes
- **⚡ Smooth Animations**: Loading states and hover effects

### Technical Implementation
- **🚀 Next.js 14+**: Latest features with App Router
- **🔧 TypeScript**: Full type safety and better developer experience
- **🏪 Zustand State Management**: Lightweight and powerful state management
- **💾 Data Persistence**: localStorage integration for search history and preferences
- **⚡ Performance Optimized**: Image optimization and efficient rendering

### Extended Features
- **📅 5-Day Forecast**: Detailed weather predictions
- **🌡️ Unit Toggle**: Switch between Celsius and Fahrenheit
- **🏗️ Clean Architecture**: Well-organized component structure
- **🎨 Custom Icons**: Beautiful SVG icons for better performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your OpenWeatherMap API key:
   ```bash
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to the API keys section
4. Copy your API key
5. Add it to your `.env.local` file

**Note**: It may take a few minutes for your new API key to become active.

## 🏗️ Project Structure

```
weather-dashboard/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── page.tsx           # Main dashboard page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── SearchBar.tsx      # Smart search with history
│   │   ├── WeatherCard.tsx    # Current weather display
│   │   ├── Forecast.tsx       # 5-day forecast
│   │   ├── UnitToggle.tsx     # Temperature unit switcher
│   │   └── History.tsx        # Search history
│   ├── lib/                   # Utilities and API
│   │   └── api.ts            # OpenWeatherMap integration
│   ├── store/                 # State management
│   │   └── weatherStore.ts    # Zustand store
│   ├── types/                 # TypeScript definitions
│   │   └── weather.d.ts      # Weather data types
│   └── utils/                 # Helper functions
│       └── helper.ts         # Utility functions
├── public/                    # Static assets
├── .env.local.example        # Environment variables template
└── README.md                 # This file
```

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4+
- **State Management**: Zustand 5+
- **HTTP Client**: Axios
- **Data Persistence**: localStorage
- **Weather API**: OpenWeatherMap API
- **Icons**: Custom SVG icons
- **Deployment**: Vercel-ready

## 📱 Features in Detail

### Search Functionality
- Real-time input validation
- Debounced search to reduce API calls
- Comprehensive error handling
- Search suggestions from history

### Weather Display
- Current temperature with "feels like"
- Weather condition with description
- Humidity, wind speed, pressure, visibility
- Dynamic weather icons
- Beautiful, condition-based color schemes

### 5-Day Forecast
- Daily high/low temperatures
- Weather conditions and icons
- Humidity and wind speed
- Responsive grid layout

### Search History
- Automatically saves last 5 searches
- Persistent across browser sessions
- One-click to re-search
- Clear history option

### Unit Management
- Toggle between Celsius and Fahrenheit
- Remembers user preference
- Automatic data refresh on unit change

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add your `NEXT_PUBLIC_OPENWEATHER_API_KEY` in Environment Variables
   - Deploy!

3. **Set Environment Variables in Vercel**
   - Go to your project settings
   - Add Environment Variables:
     - `NEXT_PUBLIC_OPENWEATHER_API_KEY`: Your OpenWeatherMap API key

### Other Deployment Platforms
- **Netlify**: Works out of the box
- **Railway**: Easy deployment with environment variables
- **Heroku**: Add buildpacks for Node.js

## 🎯 Performance Optimizations

- **Image Optimization**: Next.js Image component for weather icons
- **Code Splitting**: Automatic with Next.js
- **Client-Side Caching**: Zustand persist middleware
- **Debounced Search**: Reduces unnecessary API calls
- **Responsive Images**: Optimized for all device sizes
- **Lazy Loading**: Components load as needed

## 🧪 Development Decisions & Assumptions

### API Choice
- **OpenWeatherMap**: Chosen for comprehensive free tier, reliable uptime, and extensive documentation
- **Rate Limiting**: Implemented client-side debouncing to respect API limits

### State Management
- **Zustand**: Selected over Redux for simplicity and smaller bundle size
- **Persistence**: localStorage used for search history and user preferences

### Styling Approach
- **Tailwind CSS**: Utility-first approach for rapid development and consistent design
- **Custom Components**: Built from scratch for better performance vs component libraries

### Error Handling
- **User-Friendly Messages**: Technical errors translated to understandable language
- **Graceful Degradation**: App remains functional even with API failures

### Mobile-First Design
- **Responsive Layouts**: Different layouts for mobile vs desktop forecast
- **Touch-Friendly**: Large buttons and adequate spacing for mobile use

### Data Fetching
- Used Axios instead of SWR/React Query for initial implementation
- Chose Axios for its simplicity and reliability
- State management handled via Zustand with proper error handling
- SWR package is installed and ready for future migration

### Assumptions Made
- Used OpenWeatherMap API for reliable weather data
- Implemented localStorage for search history persistence
- Chose emoji weather representations for better UX (easily changeable to API icons)
- Used Next.js 14+ App Router for modern development patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) for simple state management

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the [Issues](https://github.com/yourusername/weather-dashboard/issues) page
2. Create a new issue if your question isn't already answered
3. Provide as much detail as possible, including error messages and steps to reproduce

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
