import React from "react";
import Skeleton from "react-loading-skeleton";
import { useWeather } from "../../context/WeatherContext";

const SunriseAndSetCard = () => {
    const { weatherData } = useWeather();

    if (!weatherData) {
        return (
            <div className="bg-(--surface-color1) w-full h-71.5 lg:w-71.5 rounded-2xl border border-(--border-color) p-3">
                <span className="text-lg font-medium block mb-3">
                    Sunrise & Sunset
                </span>

                <div className="h-full w-full">
                    <Skeleton borderRadius={16} />
                </div>
            </div>
        );
    }

    const getSunPosition = (sunrise, sunset) => {
        const now = new Date();

        const sunriseTime = new Date(sunrise);
        const sunsetTime = new Date(sunset);

        const formattedTime = [now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), sunsetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })]


        const totalDayLength =
            sunsetTime.getTime() - sunriseTime.getTime();

        const elapsed =
            now.getTime() - sunriseTime.getTime();

        let progress = elapsed / totalDayLength;

        progress = Math.max(0, Math.min(1, progress));

        return {
            progress,
            percentage: progress * 100,
            formattedTime
        };
    };

    const sunData = getSunPosition(
        weatherData.today.sunrise,
        weatherData.today.sunset
    );

    const getSunCoords = (progress) => {
        const radius = 112;

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
        <div className="relative flex flex-col items-center w-full h-71.5 lg:w-71.5 lg:h-full p-3 border border-(--border-color) rounded-2xl bg-(--surface-color1) transition-colors duration-200 ease-linear">

            <span className="w-full text-(--color) font-medium text-lg mb-3 transition-colors duration-200 ease-linear">Sunrise & Sunset</span>

            <div
                className="flex items-center justify-center relative border-2 border-(--secondary-border) bg-linear-to-b from-(--secondary-color1) to-(--secondary-color2) rounded-t-full mt-auto mb-2"
                style={{
                    width: 240,
                    height: 120,
                    // bottom: 0,
                    // transform: "translateY(25%)"
                }}
            >

                <div
                    className="absolute flex items-center w-7 h-7 justify-center z-10 rounded-full transition-all duration-200 ease-out"
                    style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        // transform: "translate(0, 180%)",
                        transformOrigin: "center"
                    }}
                >

                    <div className="absolute z-10 rounded-xl border border-(--border-color) shadow-[--box-shadow] w-fit text-center flex items-center bg-(--surface-color1) p-2 justify-center origin-center -left-5 -top-9 transition-all duration-200 ease-linear">
                        <span className="text-nowrap text-xs font-medium transition-colors duration-200 ease-linear">
                            {sunData.formattedTime[0]}
                        </span>
                    </div>

                    <svg className="w-7 h-7 origin-center" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#ffe62e"> <path d="M20.5 59.7l7-7.2c-2.5-.5-4.8-1.5-6.9-2.9l-.1 10.1"> </path> <path d="M43.5 4.3l-7 7.2c2.5.5 4.8 1.5 6.9 2.9l.1-10.1"> </path> <path d="M4.3 43.5l10.1-.1C13 41.3 12 39 11.5 36.5l-7.2 7"> </path> <path d="M59.7 20.5l-10.1.1c1.3 2.1 2.3 4.4 2.9 6.9l7.2-7"> </path> <path d="M4.3 20.5l7.2 7c.5-2.5 1.5-4.8 2.9-6.9l-10.1-.1"> </path> <path d="M59.7 43.5l-7.2-7c-.5 2.5-1.5 4.8-2.9 6.9l10.1.1"> </path> <path d="M20.5 4.3l.1 10.1c2.1-1.3 4.4-2.3 6.9-2.9l-7-7.2"> </path> <path d="M43.5 59.7l-.1-10.1C41.3 51 39 52 36.5 52.5l7 7.2"> </path> </g> <g fill="#ffce31"> <path d="M14.8 44l-4 9.3l9.3-4C18 47.8 16.2 46 14.8 44"> </path> <path d="M49.2 20l4-9.3l-9.2 4c2 1.5 3.8 3.3 5.2 5.3"> </path> <path d="M11.4 28.3L2 32l9.4 3.7c-.3-1.2-.4-2.4-.4-3.7s.1-2.5.4-3.7"> </path> <path d="M52.6 35.7L62 32l-9.4-3.7c.2 1.2.4 2.5.4 3.7c0 1.3-.1 2.5-.4 3.7"> </path> <path d="M20 14.8l-9.3-4l4 9.3c1.5-2.1 3.3-3.9 5.3-5.3"> </path> <path d="M44 49.2l9.3 4l-4-9.3C47.8 46 46 47.8 44 49.2"> </path> <path d="M35.7 11.4L32 2l-3.7 9.4c1.2-.2 2.5-.4 3.7-.4s2.5.1 3.7.4"> </path> <path d="M28.3 52.6L32 62l3.7-9.4c-1.2.3-2.4.4-3.7.4s-2.5-.1-3.7-.4"> </path> <circle cx="32" cy="32" r="19"> </circle> </g> </g></svg>

                </div>

            </div>

            <div className="font-medium text-xs flex justify-between w-full">
                <div className="flex flex-col items-start gap-1">
                    <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 22H16" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 19H19" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 16H22" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z" stroke="var(--primary-color)" stroke-width="1.5"></path> <path d="M12 10L12.5303 9.46967C12.2374 9.17678 11.7626 9.17678 11.4697 9.46967L12 10ZM13.4697 12.5303C13.7626 12.8232 14.2374 12.8232 14.5303 12.5303C14.8232 12.2374 14.8232 11.7626 14.5303 11.4697L13.4697 12.5303ZM9.46967 11.4697C9.17678 11.7626 9.17678 12.2374 9.46967 12.5303C9.76256 12.8232 10.2374 12.8232 10.5303 12.5303L9.46967 11.4697ZM12.75 16V10H11.25V16H12.75ZM11.4697 10.5303L13.4697 12.5303L14.5303 11.4697L12.5303 9.46967L11.4697 10.5303ZM11.4697 9.46967L9.46967 11.4697L10.5303 12.5303L12.5303 10.5303L11.4697 9.46967Z" fill="var(--primary-color)"></path> <path d="M12 2V3" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12L21 12" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M3 12L2 12" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19.0708 4.92969L18.678 5.32252" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M5.32178 5.32227L4.92894 4.92943" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    <span className="transition-colors duration-200 ease-linear">
                        Sunrise
                    </span>
                    <span className="text-(--muted-text-color)">{sunData.formattedTime[1]}</span>
                </div>

                <div className="flex flex-col items-end text-end gap-1">
                    <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 22H16" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5 19H19" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M2 16H22" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 6C8.68629 6 6 8.68629 6 12C6 13.5217 6.56645 14.911 7.5 15.9687H16.5C17.4335 14.911 18 13.5217 18 12C18 8.68629 15.3137 6 12 6Z" stroke="var(--primary-color)" stroke-width="1.5"></path> <path d="M12 6V12M12 12L14 10M12 12L10 10" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 2V3" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12L21 12" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M3 12L2 12" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M19.0708 4.92969L18.678 5.32252" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M5.32178 5.32227L4.92894 4.92943" stroke="var(--primary-color)" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>

                    <span className="transition-colors duration-200 ease-linear">
                        Sunset
                    </span>
                    <span className="text-(--muted-text-color)">{sunData.formattedTime[2]}</span>
                </div>
            </div>
        </div>
    );
};

export default SunriseAndSetCard;
