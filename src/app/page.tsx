"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cities_json from "./cities.json";

const yellow = "#FEE143";

interface HamburgerMenuProps {
  onCitySelect: (city: string) => void;
}

function HamburgerMenu({ onCitySelect }: HamburgerMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const cities = cities_json.cities;
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 bg-white rounded shadow hover:bg-gray-100"
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={
          "no-scrollbar h-[450px] absolute mt-2 bg-white text-black rounded shadow-lg z-10 transform transition-all duration-300 overflow-y-auto " +
          (menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none")
        }
      >
        <div className="p-4">
          <input
            type="text"
            placeholder="Filter cities..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-[200px] border border-gray-300 p-2 rounded"
          />
        </div>
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div
              key={city}
              onClick={() => {
                onCitySelect(city);
                setMenuOpen(false);
                setFilter("");
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
            >
              {city}
            </div>
          ))
        ) : (
          <div className="px-4 py-2 text-gray-500">No cities found</div>
        )}
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<
    { date: string; averageTemperature: number; icon: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [CITY, setCITY] = useState("London");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/weather/current?city=${CITY}`);
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [CITY]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(`/api/weather/forecast?city=${CITY}&days=4`);
        const data = await response.json();
        // Assuming your API returns the forecast data under the "forecast" key
        setWeeklyForecast(data.forecast);
        console.log(data.forecast);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchForecast();
  }, [CITY]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-black p-6 font-[Iceberg]">
      <div className="md:text-7xl absolute top-3 text-9xl font-bold text-white">{CITY}</div>
      <div className="absolute top-45 left-6 text-5xl font-bold text-white">
        Minimalist
      </div>
      <div className="absolute top-45 right-14 text-5xl font-bold text-white">
        Weather
      </div>
      <div className="md:hidden absolute bottom-5 text-2xl font-bold text-white font-serif">
        [This is a weather app]
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { duration: 1 } }
        }}
        whileInView={{
          backgroundImage: [
            "linear-gradient(45deg, #FEE143, #FF5733)",
            "linear-gradient(45deg, #FF5733, #DAF7A6)",
            "linear-gradient(45deg, #DAF7A6, #FEE143)",
            "linear-gradient(45deg, #FEE143, #FF5733)"
          ]
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity
        }}
        className="relative w-[320px] h-[660px] rounded-[40px] p-6 flex flex-col gap-4 shadow-xl mt-20 border-8 border-white"
      >
        <div className="absolute top-4 left-4">
          <HamburgerMenu onCitySelect={setCITY} />
        </div>
        <motion.div
          key={`header-${CITY}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center mt-5 text-lg font-bold"
        >
          {CITY}
        </motion.div>
        <motion.div
          key={`weather-${CITY}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center flex-grow"
        >
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : weatherData ? (
            <>
              <div
                style={{ backgroundColor: "black", borderRadius: "15px" }}
                className="text-sm text-white px-4 py-1 mb-2"
              >
                {weatherData.date}
              </div>
              <div className="text-lg">{weatherData.condition}</div>
              <div className="text-9xl font-bold text-black">
                {weatherData.temperature}&deg;
              </div>
              <h3 className="self-start ml-3 font-bold">Daily Summary</h3>
              <p className="text-xs text-left mt-2 ml-3">
                {weatherData.summary}
              </p>
            </>
          ) : (
            <p className="text-white">Failed to load data</p>
          )}
        </motion.div>
        <motion.div
          key={`stats-${CITY}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-40 flex justify-between bg-black/80 backdrop-blur-lg text-white p-6 rounded-lg text-sm"
        >
            <div className="flex flex-col items-center">
            <Image
              src="/wind.svg"
              alt="Wind Icon"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span>{weatherData?.wind ? `${weatherData.wind} km/h` : 'N/A'}</span>
            <span>Wind</span>
            </div>
            <div className="flex flex-col items-center">
            <Image
              src="/water_drop.svg"
              alt="Humidity Icon"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span>{weatherData?.humidity ? `${weatherData.humidity}%` : 'N/A'}</span>
            <span>Humidity</span>
            </div>
            <div className="flex flex-col items-center">
            <Image
              src="/visibility.svg"
              alt="Visibility Icon"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            <span>{weatherData?.visibility ? `${weatherData.visibility} km` : 'N/A'}</span>
            <span>Visibility</span>
            </div>
        </motion.div>
        <motion.div
          key={`forecast-${CITY}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-2"
        >
          <div className="text-sm font-semibold">Weekly Forecast</div>
          {weeklyForecast.length > 0 ? (
            <div className="flex justify-between mt-3 text-xs h-20">
              {weeklyForecast.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center border-2 border-black px-2 py-1 rounded-lg"
                >
                  <span className="text-black mb-1" >{item.averageTemperature}&deg;</span>
                  <Image
                    src={item.icon.startsWith("//") ? `https:${item.icon}` : item.icon}
                    alt={item.icon}
                    width={24}
                    height={24}
                    className="w-6 h-6 brightness-0 mb-2"
                  />
                  <span>{item.date.slice(5)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-white mt-2">Loading Forecast...</div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
