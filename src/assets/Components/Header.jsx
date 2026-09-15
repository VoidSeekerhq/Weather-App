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




    return (
        <div className='flex flex-row bg-gray-100 w-dvw p-4 justify-between items-center'>
            <h1 className="logo text-2xl font-medium">
                Weather App
            </h1>

            <div className="searchbar flex flex-row items-center justify-center bg-gray-300 rounded-full p-1 border border-gray-400">
                <input
                    className='w-60 hover:cursor-pointer rounded-full focus: outline-0'
                    type="text"
                    placeholder='Search Location...'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            props.setLocation(searchsugg[0])
                            setSearch("")
                        }
                    }}
                />
            </div>

            {search == ""
                ? <div className="search-sugg absolute right-4 top-13 bg-gray-100 border border-gray-400 rounded-xl w-62 shadow-xl shadow-gray-300 max-h-60 overflow-x-auto opacity-0 transition duration-200"></div>
                : <div className="search-sugg absolute right-4 top-13 bg-gray-100 border border-gray-400 rounded-xl w-62 shadow-xl shadow-gray-300 max-h-60 overflow-x-auto">
                    {searchsugg.map((city, index) => (
                        <div className='p-2 rounded-xl hover:bg-gray-200 transition-colors duration-200 text-gray-800'
                            key={index}
                            onClick={() => {
                                props.setLocation({
                                    name: city.formatted,
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
