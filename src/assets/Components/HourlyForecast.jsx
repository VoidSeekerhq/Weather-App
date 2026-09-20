import React, { useState } from 'react'
import { useWeather } from '../../context/WeatherContext'
import Skeleton from 'react-loading-skeleton';

const HourlyForecast = (props) => {
    const { weatherData } = useWeather();

    const isDayTime = (time, sunrise, sunset) => {

        const now = new Date(time);

        const sunriseTime = new Date(sunrise);

        const sunsetTime = new Date(sunset);

        return now >= sunriseTime &&
            now <= sunsetTime;
    }

    let weatherContent

    if (!weatherData) {

        weatherContent = Array.from({ length: 24 }).map((_, index) => (
            <li className='w-30 flex-none rounded-xl p-2 bg-(--surface-color2) relative flex flex-col items-center justify-center transition-colors duration-200 ease-linear' key={index}>
                <Skeleton className='my-3' width={48} height={48} borderRadius={100} />
                <Skeleton width={50} height={16} />
                <Skeleton className='mb-3' width={65} height={36} />
                <Skeleton width={65} height={20} />
            </li>
        ));

    } else {
        const now = new Date()

        const currentIndex = weatherData.hourly.findIndex(item => {
            const forecastTime = new Date(item.time);

            return (
                forecastTime.getFullYear() === now.getFullYear() &&
                forecastTime.getMonth() === now.getMonth() &&
                forecastTime.getDate() === now.getDate() &&
                forecastTime.getHours() === now.getHours()
            );
        })

        const startIndex = currentIndex === -1 ? 0 : currentIndex;


        const next24hours = weatherData.hourly.slice(
            startIndex,
            startIndex + 24
        )

        weatherContent = next24hours.map((item, index) => {
            const day = isDayTime(item.time, weatherData.today.sunrise, weatherData.today.sunset);

            return (
                <div
                    className={`w-30 flex-none rounded-xl p-2 relative flex flex-col items-center justify-center transition-all duration-200 ease-linear
                        ${index === 0 ? "bg-linear-to-t from-10% from-[#3f72ffc0] via-50% via-[#4677ff85] to-100% to-[#5582ff12] text-white! border border-blue-400" : "bg-(--surface-color2)"}`}
                    key={index}
                >
                    <img
                        className='w-12 h-12 my-3'
                        src={day
                            ? (props.weatherCodes[item.weather_code].dayIcon ?? props.weatherCodes[item.weather_code].icon)
                            : (props.weatherCodes[item.weather_code].nightIcon ?? props.weatherCodes[item.weather_code].icon)
                        }
                        alt={props.weatherCodes[item.weather_code].weather}
                    />

                    <span className={`text-xs text-nowrap font-medium ${index === 0 ? "text-white" : "text-(--muted-text-color)"}`}>
                        {props.weatherCodes[item.weather_code].weather}
                    </span>

                    <span className='font-semibold text-3xl mb-3'>
                        {Math.round(item.temperature)}°C
                    </span>

                    <span className={`text-xs text-nowrap font-medium ${index === 0 ? "text-white" : "text-(--muted-text-color)"}`}>
                        {index === 0
                            ? "Now"
                            : new Date(item.time).toLocaleTimeString(
                                "en-US",
                                {
                                    hour: "numeric",
                                    hour12: true
                                }
                            )
                        }
                    </span>
                </div>
            );
        })
    }







    return (
        <div className='lg:min-w-52.5 flex-1 w-full h-fit bg-(--surface-color1) rounded-2xl border border-(--border-color) shadow-(--box-shadow) p-3 transition-colors duration-200 ease-linear flex flex-col items-center overflow-hidden'>

            <span className='w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear'>
                Upcoming Weather
            </span>

                <div className='max-w-full overflow-x-auto flex gap-2 h-fit items-center transition-colors duration-200 ease-linear rounded-xl'>
                    {weatherContent}
                </div>
        </div>
    );
}

export default HourlyForecast
