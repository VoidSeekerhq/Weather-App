import React from "react";
import Skeleton from "react-loading-skeleton";
import { useWeather } from "../../context/WeatherContext";

const SunriseAndSetCard = () => {
    const { weatherData } = useWeather();

    if (!weatherData) {
        return (
            <div className="bg-(--surface-color1) rounded-2xl border border-(--border-color) p-3">
                <span className="text-lg font-medium block mb-3">
                    Sunrise & Sunset
                </span>

                <Skeleton height={250} borderRadius={16} />
            </div>
        );
    }

    const getSunPosition = (sunrise, sunset) => {
        const now = new Date();

        const sunriseTime = new Date(sunrise);
        const sunsetTime = new Date(sunset);

        const totalDayLength =
            sunsetTime.getTime() - sunriseTime.getTime();

        const elapsed =
            now.getTime() - sunriseTime.getTime();

        let progress = elapsed / totalDayLength;

        progress = Math.max(0, Math.min(1, progress));

        return {
            progress,
            percentage: progress * 100
        };
    };

    const sunData = getSunPosition(
        weatherData.today.sunrise,
        weatherData.today.sunset
    );

    const getSunCoords = (progress) => {
        const radius = 130;

        const angle =
            Math.PI - (Math.PI * progress);

        const x =
            radius + radius * Math.cos(angle);

        const y =
            radius - radius * Math.sin(angle);

        return { x, y };
    };

    const { x, y } =
        getSunCoords(sunData.progress);

    return (
        <div className="relative w-full h-71.5 lg:w-71.5 lg:h-71.5 p-2 border border-(--border-color) rounded-2xl bg-(--surface-color1)">

            <span className="w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear">Sunrise & Sunset</span>

            <div className="w-[260px] h- origin-center relative">
                <div
                    className="absolute border-t-4 border-orange-400 rounded-t-full"
                    style={{
                        width: 260,
                        height: 120,
                        bottom: 0,
                        transform: "translateY(50%)"
                    }}
                />

                <div
                    className="absolute w-8 h-8 bg-yellow-400 rounded-full"
                    style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: "translateY(-50%, -50%)"
                    }}
                />
            </div>
        </div>
    );
};

export default SunriseAndSetCard;
