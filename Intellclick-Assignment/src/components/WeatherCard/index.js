import React from 'react';
import './index.css';

const WeatherCard = (props) => {
  const { weatherDetails } = props;
  const { name, temp, humidity, pressure } = weatherDetails;

  return (
    <li className="item">
      
       <div>
       <h1 className='weather-heading'>{name}</h1>
        <p className='weather-item'>Temperature: {temp}°C</p>
        <p className='weather-item'>Humidity: {humidity}%</p>
        <p className='weather-item'>Pressure: {pressure} hPa</p>
       </div>
       
        
      
    </li>
  );
};

export default WeatherCard;
