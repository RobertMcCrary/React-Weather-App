import React, { useCallback, useState } from 'react';
import Search from './components/search/search';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [foreCast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecast({city: searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err));

  }

  console.log(foreCast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {foreCast && <Forecast data={foreCast} />}
    </div>
  );
}

export default App;