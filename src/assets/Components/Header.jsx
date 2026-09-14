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
        <div>
            <h1 className="logo">
                Weather App
            </h1>

            <div className="searchbar">
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            props.setLocation(search)
                            setSearch("")
                        }
                    }}
                />
            </div>

            {search == ""
                ? ""
                : <div className="search-sugg">
                    {searchsugg.map((city, index) => (
                        <div
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
