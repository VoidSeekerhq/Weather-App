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
        if(props.theme === "light") {
            props.setTheme("dark")
            document.body.classList.add("dark")
        } else {
            props.setTheme("light")
            document.body.classList.remove("dark")
        }
    }




    return (
        <div className='flex flex-row bg-(--surface-color1) w-dvw p-4 justify-between items-center border-b border-(--border-color) shadow-(--box-shadow) transition-colors duration-200 ease-linear sticky top-0 left-0 z-10'>
            <h1 className="logo text-2xl font-medium text-(--color) transition-colors duration-200 ease-linear">
                Weather App
            </h1>

            <div className='flex flex-row gap-4'>
                <div
                    className="theme-btn rounded-full border border-(--border-color) flex items-center justify-center p-1 transition-colors duration-200 ease-linear hover:bg-(--hover)"
                    onClick={handleTheme}
                >
                    {props.theme === "light"
                        ? <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="var(--muted-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        : <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="var(--muted-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    }
                </div>

                <div className="searchbar flex flex-row items-center justify-center bg-(--surface-color2) rounded-full p-1 border border-(--border-color) gap-2 transition-colors duration-200 ease-linear">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="var(--muted-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <input
                        className='w-60 text-(--color) hover:cursor-pointer  focus:outline-0'
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
                </div>
            </div>

            {search == ""
                ? <div className="search-sugg absolute right-4 top-13 bg-(--surface-color1) border border-(--border-color) rounded-xl w-0 shadow-(--box-shadow) max-h-60 overflow-x-auto opacity-0 transition-all duration-200"></div>
                : <div className="search-sugg absolute right-4 top-13 bg-(--surface-color1) border border-(--border-color) rounded-xl w-69 opacity-100 transition-all duration-200 shadow-(--box-shadow) max-h-60 overflow-x-auto cursor-pointer">
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
    )
}

export default Header
