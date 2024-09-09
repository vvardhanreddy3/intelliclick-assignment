import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WeatherCard from '../WeatherCard';
import './index.css';

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cityName } = useParams()

  useEffect(() => {
   
    fetchWeather(cityName);
     // eslint-disable-next-line 
  }, [cityName]);

  const fetchWeather = async () => {
    try {
      const API_KEY = '23005a762b4e5c96b703986b00411efc';
      const cnt = 1;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=${cnt}&appid=${API_KEY}&units=metric`
      );

      const statusCode = response.status;
      console.log(statusCode);

      const data = await response.json();

      const formattedData = data.list.map((eachItem) => ({
        id: eachItem.dt, 
        name: cityName, 
        temp: eachItem.main.temp,
        humidity: eachItem.main.humidity,
        pressure: eachItem.main.pressure,
        
      }));

      setWeather(formattedData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching weather data', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-container">
      {isLoading ? (
        <h4>Loading ...</h4>
      ) : (
        <ul className="weather-list-container">
          {weather.map((each) => (
            <WeatherCard key={each.id} weatherDetails={each} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Weather;
