import React from 'react'
import WeatherCard from "./WeatherCard"
import HourlyForecast from "./HourlyForecast"
import WindCompass from './WindCompass'
import SunriseAndSetCard from './SunriseAndSetCard'
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
        <div className='w-dvw h-fit flex flex-col lg:flex-row relative overflow-x-hidden p-2 gap-2'>
            <div>
                <WeatherCard
                    location={props.location}
                    weatherCodes={props.weatherCodes}
                    isDayTime={isDayTime}
                />
            </div>

            <div className=' h-fit lg:w-[calc(100%-392px)] flex flex-col gap-2 lg:h-full'>
                <div className='w-full h-fit'>
                    <HourlyForecast
                        weatherCodes={props.weatherCodes}
                    />
                </div>

                <div className='w-full flex flex-col lg:p-0 gap-2 lg:flex-row'>
                    <WindCompass />
                    <SunriseAndSetCard />
                </div>

            </div>


        </div>
    )
}

export default Center
