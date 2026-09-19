import React, { useEffect, useState } from 'react'
import { useWeather } from '../../context/WeatherContext'
import Skeleton from 'react-loading-skeleton'

const WindCompass = () => {
    const { weatherData } = useWeather();

    if (!weatherData) {
        return (
            <div className='flex flex-col items-center justify-center bg-(--surface-color1) rounded-2xl p-3 border border-(--border-color)'>
                <span className='w-full text-(--color) font-medium text-lg mb-3'>
                    Wind
                </span>

                <div className='w-full'>
                    <Skeleton height={220} borderRadius={16} />
                </div>
            </div>
        );
    }

    const windDir = weatherData.current.wind_direction;
    const windSpeed = weatherData.current.wind_speed;

    return (

        <div className='flex flex-col items-center justify-center bg-(--surface-color1) rounded-2xl p-3 border border-(--border-color) transition-colors duration-200 ease-linear relative'>

            <span className='w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear'>Wind</span>

            <div className='w-full h-55 flex flex-col justify-center items-center  relative z-10'>

                {Array.from({ length: 72 }).map((_, index) => (
                    <div className={`w-1 h-4 absolute origin-center rounded-full transition duration-200 ease-linear
                            ${[0, 18, 36, 54].includes(index)
                            ? "bg-(--muted-text-color)"
                            : "bg-(--bg2)"
                        }`}
                        style={{
                            transform: `rotate(${index * 5}deg) translateY(-100px)`
                        }}
                        key={index}>
                    </div>
                ))}
                <span className='absolute text-sm font-semibold origin-center transform -translate-y-20'>N</span>
                <span className='absolute text-sm font-semibold origin-center transform -translate-x-20'>W</span>
                <span className='absolute text-sm font-semibold origin-center transform translate-x-20'>E</span>
                <span className='absolute text-sm font-semibold origin-center transfrom translate-y-20'>S</span>

                <svg
                    className='absolute transition-all duration-200 ease'
                    style={{
                        transform: `rotate(${windDir}deg) translateY(-100px)`
                    }}
                    width="22"
                    height="22"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="var(--primary-color)"
                        d="M50 10
                        Q52 10 54 13
                        L88 78
                        Q90 82 86 85
                        L14 85
                        Q10 82 12 78
                        L46 13
                        Q48 10 50 10
                        Z"
                    />
                </svg>

                <div className='absolute flex flex-row justify-center items-center w-32 h-32 bg-gray-300 rounded-full border-b-3 border-(--primary-color)'
                    style={{
                        boxShadow: "inset 8px 8px 8px 0px #ffffffcf"
                    }}>
                    <span className='font-bold text-3xl text-gray-800'>{windSpeed}</span>
                    <span className='text-(--muted-text-color) mt-2'>Km/h</span>
                </div>
            </div>
        </div>
    )
}

export default WindCompass
