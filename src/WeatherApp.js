import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "77ab7d438cb7b63415360335f58a570f" ;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    if (city !== '') {
      fetchData();
    }
  }, [city, API_KEY]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city !== '') {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-200 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          React Weather App
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row justify-center items-center mb-8">
            <input
              type="text"
              placeholder="Enter city name..."
              className="border border-gray-400 rounded-md p-2 mr-0 md:mr-2 mb-2 md:mb-0 text-gray-800 w-full md:w-auto focus:outline-none focus:ring focus:border-blue-300"
              value={city}
              onChange={handleCityChange}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 rounded-md py-2 px-4 text-white font-bold text-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              Search
            </button>
          </div>
        </form>

        {weatherData && (
          <div className="rounded-lg shadow-lg bg-white p-8 text-gray-800">
            <h2 className="text-2xl font-bold mb-2">
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p className="text-lg mb-4">{weatherData.weather[0].description}</p>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                <p className="font-medium text-gray-600 mb-1">Temperature</p>
                <p className="text-2xl font-bold">
                  {Math.round(weatherData.main.temp)}°C
                </p>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                <p className="font-medium text-gray-600 mb-1">Feels like</p>
                <p className="text-2xl font-bold">
                  {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                <p className="font-medium text-gray-600 mb-1">Humidity</p>
                <p className="text-2xl font-bold">{weatherData.main.humidity}%</p>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
                <p className="font-medium text-gray-600 mb-1">Max Temperature</p>
                <p className="text-2xl font-bold">
                  {Math.round(weatherData.main.temp_max)}°C
                </p>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-4">
<p className="font-medium text-gray-600 mb-1">Min Temperature</p>
<p className="text-2xl font-bold">
{Math.round(weatherData.main.temp_min)}°C
</p>
</div>
</div>
</div>
)}
</div>
</div>
);
}

export default WeatherApp;