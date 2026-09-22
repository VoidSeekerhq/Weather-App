import React from 'react'
import { useWeather } from '../../context/WeatherContext'
import Skeleton from 'react-loading-skeleton'

const Highlights = () => {
    const { weatherData } = useWeather()

    if (!weatherData) {
        return <div className='w-full lg:w-71.5 h-71.5 bg-(--surface-color1) rounded-2xl border border-(--border-color) p-3 transition-colors duration-200 ease-linear text-(--color)'>
            <span className="w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear">Highlights</span>

            <Skeleton className='w-full h-57' borderRadius={16} />
        </div>
    }

    const humidity = weatherData.current.humidity
    const feelsLike = weatherData.current.feels_like
    const pressure = weatherData.current.pressure

    return (
        <div className='w-full lg:w-71.5 h-71.5 bg-(--surface-color1) rounded-2xl border border-(--border-color) p-3 transition-colors duration-200 ease-linear text-(--color)'>
            <span className="w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear">Highlights</span>

            <div className='flex flex-col w-full h-57'>
                <div className='flex flex-row gap-3 h-full items-center justify-between p-2 border-b-(--border-color)'>
                    <svg fill="var(--primary-color)" height="34px" width="34px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M144.97,154.226l-42.398-73.439c-3.755-6.504-10.695-10.511-18.207-10.511c-7.511,0-14.451,4.007-18.205,10.511 l-45.188,78.27c-0.434,0.753-0.818,1.525-1.151,2.312c-5.408,10.371-8.256,21.971-8.256,33.704 c0,40.232,32.73,72.962,72.961,72.962c40.229,0,72.958-32.732,72.958-72.962C157.485,180.427,153.161,166.326,144.97,154.226z M84.527,225.992c-17.048,0-30.917-13.87-30.917-30.918c0-5.389,1.338-10.49,3.979-15.158c0.299-0.53,0.573-1.068,0.823-1.615 l25.954-44.955l24.602,42.609c0.296,0.512,0.614,1.012,0.952,1.498c3.613,5.191,5.523,11.285,5.523,17.621 C115.442,212.122,101.573,225.992,84.527,225.992z"></path> <path d="M485.573,102.591l-53.16-92.08C428.66,4.007,421.719,0,414.208,0c-7.509,0-14.451,4.007-18.205,10.511l-56.558,97.962 c-0.468,0.81-0.876,1.643-1.225,2.493c-6.444,12.28-9.84,26.028-9.84,39.939c0,47.436,38.593,86.027,86.028,86.027 c47.435,0,86.024-38.593,86.026-86.027C500.434,133.571,495.298,116.888,485.573,102.591z M414.41,194.89 c-24.253,0-43.984-19.73-43.984-43.983c0-7.56,1.958-15.021,5.665-21.577c0.338-0.597,0.643-1.207,0.917-1.825l37.202-64.436 l35.368,61.264c0.296,0.513,0.615,1.013,0.954,1.501c5.141,7.384,7.858,16.054,7.858,25.073 C458.39,175.16,438.661,194.89,414.41,194.89z"></path> <path d="M270.823,205.398c-3.753-6.504-10.695-10.511-18.205-10.511c-7.511,0-14.451,4.007-18.205,10.511L154.588,343.66 c-0.538,0.932-0.999,1.896-1.383,2.88c-8.563,16.177-13.074,34.324-13.074,52.687c0,62.182,50.588,112.773,112.77,112.773 c62.179,0,112.767-50.591,112.766-112.773c0-22.824-6.79-44.79-19.65-63.584L270.823,205.398z M252.901,469.957 c-38.998,0-70.726-31.73-70.726-70.729c0-12.161,3.152-24.163,9.115-34.709c0.412-0.73,0.778-1.477,1.096-2.238l60.23-104.323 l57.41,99.441c0.296,0.513,0.615,1.013,0.954,1.501c8.271,11.878,12.643,25.824,12.643,40.329 C323.624,438.227,291.897,469.957,252.901,469.957z"></path> </g> </g> </g> </g></svg>

                    <span className='w-full font-normal text-md'>Humidity</span>

                    <span className='font-medium text-lg'>
                        {humidity}%
                    </span>
                </div>

                <div className='flex flex-row gap-3 h-full items-center justify-between p-2 border-b-(--border-color)'>
                    <svg className='w-10 h-10' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0955 10L18.396 11.3006M13.896 13.1994L15.1966 14.5M10.6868 16.4087L11.9873 17.7093M5.57866 20.5576L5.96229 20.1739C6.39492 19.7413 7.00076 19.5288 7.60886 19.5964L8.40799 19.6851C9.32013 19.7865 10.2289 19.4677 10.8778 18.8188L19.8202 9.87642C21.3933 8.30334 21.3933 5.75288 19.8202 4.17981C18.2471 2.60673 15.6967 2.60673 14.1236 4.17981L5.18123 13.1222C4.53228 13.7711 4.2135 14.6799 4.31485 15.592L4.40364 16.3911C4.47121 16.9992 4.25869 17.6051 3.82606 18.0377L3.44243 18.4213C2.85252 19.0112 2.85252 19.9677 3.44243 20.5576C4.03233 21.1475 4.98875 21.1475 5.57866 20.5576Z" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 15L15.5 8.5" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>

                    <span className='w-full font-normal text-md'>Feels Like</span>

                    <span className='font-medium text-lg'>
                        {feelsLike}°C
                    </span>
                </div>

                <div className='flex flex-row gap-3 h-full items-center justify-between p-2 border-b-(--border-color)'>
                    <svg className='w-13 h-13' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 15l3.5-3.5"></path> <path d="M20.3 18c.4-1 .7-2.2.7-3.4C21 9.8 17 6 12 6s-9 3.8-9 8.6c0 1.2.3 2.4.7 3.4"></path> </g></svg>

                    <span className='w-full font-normal text-md'>Pressure</span>

                    <span className='font-medium text-lg'>
                        {pressure}hPa
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Highlights
