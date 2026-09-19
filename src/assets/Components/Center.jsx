import React from 'react'
import WeatherCard from "./WeatherCard"
import HourlyForecast from "./HourlyForecast"
import WindCompass from './WindCompass'
import { useWeather } from '../../context/WeatherContext'

const Center = (props) => {
    const { weatherData } = useWeather();

    const isDayTime = (sunrise, sunset) => {

        const now = new Date();

        const sunriseTime = new Date(sunrise);

        const sunsetTime = new Date(sunset);

        return now >= sunriseTime &&
            now <= sunsetTime;
    };

    return (
        <div className='p-2 w-full min-h-full flex flex-col justify-center gap-2'>
            <WeatherCard
                location={props.location}
                weatherCodes={props.weatherCodes}
                isDayTime={isDayTime}
            />
            <HourlyForecast
                weatherCodes={props.weatherCodes}
            />
            <WindCompass />
        </div>
    )
}

export default Center
