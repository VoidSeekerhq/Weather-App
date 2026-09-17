import React, { useState, useEffect } from 'react'
import CurrentCard from './CurrentCard';
import ForecastCard from './ForecastCard';

const CurrentWeatherCard = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const weatherData = props.weatherData

  const degreesToDirection = () => {
    const directions = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest"
    ];

    const index = Math.round(Number(weatherData.current.wind_direction) / 45) % 8;

    return directions[index];
  }

  const getDateTime = () => {
    const now = currentTime;

    const dayName = now.toLocaleDateString("en-US", {
      weekday: "long"
    });

    const date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    return {
      dayName,
      date,
      time
    };
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='weather-card flex flex-col justify-center items-center bg-(--surface-color1) text-white w-sm p-3 rounded-xl border border-(--border-color) transition-colors duration-200 ease-linear shadow-(--box-shadow)'>

      <CurrentCard
        location={props.location.formatted}
        dayName={getDateTime().dayName}
        date={getDateTime().date}
        time={getDateTime().time}
        temperature={weatherData.current.temperature}
        degreesToDirection={degreesToDirection()}
        wind_speed={weatherData.current.wind_speed}
        weather_code={weatherData.current.weather_code}
        weatherCodes={props.weatherCodes}
        weatherIcon={props.weatherCodes[weatherData.current.weather_code].icon}
        weather={props.weatherCodes[weatherData.current.weather_code].weather}
      />

      <ForecastCard
        weekly={weatherData.weekly}
        weather_icon={weatherData.current.weather_icon}
        temperature={weatherData.current.temperature}
        weatherCodes={props.weatherCodes}
      />
    </div>
  )
}

export default CurrentWeatherCard
