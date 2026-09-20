import React, { useState, useEffect } from 'react'
import CurrentCard from './CurrentCard';
import ForecastCard from './ForecastCard';
import { useWeather } from '../../context/WeatherContext';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeatherCard = (props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { weatherData } = useWeather();

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
    <div className='weather-card flex-none flex flex-col justify-center items-center bg-(--surface-color1) text-white w-full p-3 rounded-2xl border border-(--border-color) transition-colors duration-200 ease-linear shadow-(--box-shadow)'>

      {(!weatherData
        ? <>
          <span className='w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear'>Current Weather</span>

          <div className='w-full'>
            <Skeleton borderRadius={16} height={200} />
          </div>

          <span className='w-full text-(--color) font-medium text-lg my-3 transition-colors duration-200 ease-linear'>Forecast</span>

          {/* <nav className='w-full transition-colors duration-200 ease-linear bg-(--bg2) p-1 flex flex-row justify-around items-center rounded-full'>
            <div className="weekly-pill bg-(--surface-color1) py-2 rounded-full border-(--border-color) w-full text-center transition-colors duration-200 ease-linear cursor-pointer shadow-(--box-shadow)">
              <span className='text-(--color) transition-colors duration-200 ease-linear'>Weekly</span>
            </div>

            <div className="monthly-pill w-full text-center transition-colors duration-200 ease-linear cursor-pointer">
              <span className='text-(--muted-text-color) transition-colors duration-200 ease-linear'>Monthly</span>
            </div>
          </nav> */}

          <ul className='text-sm w-full h-full flex flex-col transition-colors duration-200 ease-linear font-normal gap-5 my-5 mb-2'>

            {Array.from({ length: 7 }).map((_, index) => (
              <li className='w-full h-6 transition-colors duration-200 ease-linear' key={index}>
                <Skeleton />
              </li>
            ))}

          </ul>
        </>
        : <>
          <CurrentCard
            location={props.location.formatted}
            getDateTime={getDateTime()}
            degreesToDirection={degreesToDirection()}
            weatherCodes={props.weatherCodes}
            weatherIcon={props.weatherCodes[weatherData.current.weather_code]}
            weather={props.weatherCodes[weatherData.current.weather_code].weather}
            isDayTime={props.isDayTime}
          />

          <ForecastCard
            weekly={weatherData.weekly}
            weather_icon={weatherData.current.weather_icon}
            temperature={weatherData.current.temperature}
            weatherCodes={props.weatherCodes}
          />
        </>
      )}
    </div>
  )
}

export default WeatherCard
