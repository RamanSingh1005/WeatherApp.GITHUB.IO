import React, { useState } from 'react';
import { citiesJsonArr } from './locations';

export const API_KEY = '79fa9e990444791b448e8fa6c330871d';
// const lat = '';
// const lon = '';
// const part = '';

// const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part || ''}&appid=${API_KEY}`

export function HomePage() {

    const [lat, setLat] = useState(28.666667);
    const [lon, setLon] = useState(77.216667);
    const [city, setCity] = useState({name: 'Delhi'});
    const [currentWeather, setCurrentWeather] = useState();
    const [canRain, setCanRain] = useState();

    const handleOnClick = () => {
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=&appid=${API_KEY}`)
        .then(res => res.json())
        .then((data)=>{
            console.log(data);
            setCurrentWeather(data.current);
            setCanRain(data.minutely.filter((obj) => 
                obj.precipitaion>0
            ));
        });
    }
    const handleCity = (e) => {
        setCity(e.target.value);
        const selectedCity = citiesJsonArr.filter((city) => city.name === e.target.value);
        setCity(selectedCity[0]);
        setLat(selectedCity[0].lat);
        setLon(selectedCity[0].lon);
        handleOnClick();
    }

    // console.log(canRain)
    return (<>
        Enter City
        <select onChange={handleCity}>
            {citiesJsonArr.map((city) => {
                return <option value={city.name} key={city.name}>{city.name}</option>
            })}
        </select>

        <button onClick={handleOnClick}> get weather</button>
        <div/>
        {currentWeather && <div>
            {`Temperature in ${city?.name} is ${currentWeather.temp - 273.2 } Celsius. 
            Feels like ${currentWeather.feels_like-273.2} Celsius.`}
            <div/>
            {` Humidity is ${currentWeather.humidity}.`}
            <div/>
            {canRain.length>0? `Can rain`: `No signs of rain`}
            <div/>
            {`Enjoy your day.`}
        </div>}
    </>);
}