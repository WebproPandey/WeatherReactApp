import React, { useEffect, useRef, useState } from "react";

import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import searchicon from "../assets/search.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
const Weather = () => {
  const inputRef =  useRef()
  const [weatherdata, setweatherdata] = useState(false);
  const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": rain,
    "04n": rain,
    "05D": snow,
    "05n": snow,

  };

  const Search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      const icon = allicons[data.weather[0].icon] || clear;
      setweatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    Search("Bhopal");
  },[]);
  return (
    <div className="WeatherBox border-2 flex flex-col  gap-2 justify-center  items-center rounded-lg p-[40px]">
      <div className="search_bar flex gap-4 ">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="outline-none inline-block rounded-md  cursor-auto pl-3 pr-12"
        />
        <div className="h-10 w-10 flex justify-center  items-center  bg-white rounded-full ">
          <img src={searchicon} alt="" className="w-1/2  " onClick={() => Search(inputRef.current.value)} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 h-auto w-auto ">
        <img
          src={weatherdata.icon}
          alt=""
          className="h-full  w-full object-cover"
        />
        <p className="text-[10vh]  text-white">{weatherdata.temperature}॰c</p>
        <h1 className="text-3xl font-sans text-white ">
          {weatherdata.location}
        </h1>
      </div>
      <div className="Weather-data  flex  justify-around   items-center  gap-8 w-full mt-[2rem]">
        <div className="data1  flex gap-2  justify-center items-center ">
          <div className="h-auto w-[3vw]">
            <img src={humidity} alt="" />
          </div>
          <div className="">
            <p className="text-sm font-sans  text-white">
              {weatherdata.humidity} %
            </p>
            <h1 className="text-sm text-white  font-sans font-semibold">
              Humidity
            </h1>
          </div>
        </div>
        <div className="data2 flex gap-2 justify-center items-center">
          <div className="h-auto w-[3vw]">
            <img src={wind} alt="" />
          </div>
          <div className="">
            <p className="text-sm text-white">{weatherdata.windSpeed} km/h</p>
            <h1 className="text-sm text-white  font-sans  font-semibold">
              Wind Speed
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
