import React, { useEffect, useRef, useState } from 'react'

const Header = (props) => {
    const [search, setSearch] = useState("")
    const [searchsugg, setSearchsugg] = useState([])

    useEffect(() => {

        if (search.trim().length < 2) {
            setSearchsugg([]);
            return;
        }

        const timer = setTimeout(async () => {

            try {
                let response = await fetch(
                    `https://api.geoapify.com/v1/geocode/autocomplete?text=${search}&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`
                );

                let result = await response.json();

                console.log(result)

                let data = result.features.map(element => ({
                    formatted: element.properties.formatted,
                    latitude: element.properties.lat,
                    longitude: element.properties.lon
                }));

                setSearchsugg(data);

            } catch (err) {
                console.log(err);
            }

        }, 500);

        return () => clearTimeout(timer);

    }, [search]);

    const handleTheme = (e) => {
        if (props.theme === "light") {
            props.setTheme("dark")
            document.body.classList.add("dark")
        } else {
            props.setTheme("light")
            document.body.classList.remove("dark")
        }
    }



    const getCurrentLocation = async () => {
        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const response = await fetch(
                        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`
                    );

                    const result = await response.json();

                    props.setLocation({
                        formatted:
                            result.features?.[0]?.properties?.formatted ||
                            "Current Location",
                        latitude,
                        longitude
                    });

                } catch (err) {
                    console.log(err);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);



    return (
        <div className='lg:sticky lg:top-0 lg:left-0 lg:z-20'>
            <div className='flex flex-col lg:flex-row bg-(--surface-color1) w-dvw p-4 justify-between items-center border-b border-(--border-color) shadow-(--box-shadow) transition-colors duration-200 ease-linear gap-4 z-10 sticky top-0 left-0'>


                <h1 className="logo lg:w-full text-2xl font-medium text-(--color) transition-colors duration-200 ease-linear">
                    Weather App
                </h1>

                <div className='lg:flex lg:flex-row lg:gap-2 lg:relative lg:right-60'>
                    <button
                        className="theme-btn lg:static absolute right-4 top-4 rounded-full border border-(--border-color) flex items-center justify-center p-1 transition-colors duration-200 ease-linear hover:bg-(--hover) hover:cursor-pointer"
                        onClick={handleTheme}
                    >
                        {props.theme === "light"
                            ? <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="var(--muted-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            : <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="var(--muted-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        }
                    </button>

                    <button
                        className="location-btn flex items-center justify-center lg:static absolute left-4 top-4 rounded-full border border-(--border-color) p-1 hover:bg-(--hover) transition-colors duration-200 ease-linear hover:cursor-pointer"
                        onClick={getCurrentLocation}
                    >
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2a1 1 0 0 1 2 0v2.062A8.004 8.004 0 0 1 19.938 11H22a1 1 0 0 1 0 2h-2.062A8.004 8.004 0 0 1 13 19.938V22a1 1 0 0 1-2 0v-2.062A8.004 8.004 0 0 1 4.062 13H2a1 1 0 0 1 0-2h2.062A8.004 8.004 0 0 1 11 4.062V2zm7 10a6 6 0 1 0-12 0 6 6 0 0 0 12 0zm-3 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="var(--color)"></path></g></svg>
                    </button>
                </div>

            </div>

            <div className='flex items-center justify-center p-2 mt-2 lg:absolute lg:right-0 lg:-top-1 lg:z-20'>
                <div className="searchbar w-full flex flex-row items-center justify-center bg-(--bg2) rounded-full p-2 border border-(--border-color) gap-2 transition-colors duration-200 ease-linear relative">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="var(--muted-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <input
                        className='w-full text-(--color) focus:outline-0'
                        type="text"
                        placeholder='Search Location...'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && searchsugg.length > 0) {

                                props.setLocation({
                                    formatted: searchsugg[0].formatted,
                                    latitude: Number(searchsugg[0].latitude),
                                    longitude: Number(searchsugg[0].longitude)
                                });

                                setSearch("");
                                setSearchsugg([]);
                            }
                        }}
                    />

                    {search == ""
                        ? <div className="search-sugg absolute bg-(--surface-color1) border border-(--border-color) rounded-xl w-0 shadow-(--box-shadow) max-h-60 overflow-x-auto opacity-0 transition-all duration-200 z-8 top-12"></div>
                        : <div className="search-sugg lg:w-59 absolute bg-(--surface-color1) border border-(--border-color) rounded-xl w-82 opacity-100 transition-all duration-200 shadow-(--box-shadow) max-h-60 overflow-x-auto cursor-pointer z-8 top-12">
                            {searchsugg.map((city, index) => (
                                <div className='p-2 rounded-xl hover:bg-(--hover) transition-colors duration-200 text-(--color)'
                                    key={index}
                                    onClick={() => {
                                        props.setLocation({
                                            formatted: city.formatted,
                                            latitude: Number(city.latitude),
                                            longitude: Number(city.longitude)
                                        });

                                        setSearch("");
                                        setSearchsugg([]);
                                    }}
                                >
                                    {city.formatted}
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
