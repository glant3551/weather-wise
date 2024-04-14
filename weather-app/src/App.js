import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import { getFormattedWeatherData } from "./services/weatherSerice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * The main component of the weather app.
 * Renders the weather information and user interface.
 *
 * @component
 * @returns {JSX.Element} The rendered App component
 */
const App = () => {
  // State variables
  const [city, setCity] = useState("Charlotte");
  const [unit, setUnit] = useState("f");
  const [weather, setWeather] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);

  // Fetch weather data on component mount and whenever city or unit changes
  useEffect(() => {
    /**
     * Fetches weather data for the selected city and updates the state.
     * Shows toast messages for success or failure.
     *
     * @async
     * @function fetchWeather
     */
    const fetchWeather = async () => {
      toast.info("Fetching weather for " + city);
      try {
        const data = await getFormattedWeatherData(city);
        toast.success(`Fetched ${data.loc_name}, ${data.loc_country}`);
        console.log(data);
        setWeather(data);
      } catch (error) {
        toast.error("Failed to fetch weather data");
        console.error(error);
      }
    };

    fetchWeather();
  }, [city, unit]);

  /**
   * Determines the CSS class for the background gradient based on the weather data.
   *
   * @function formatBackground
   * @returns {string} The CSS class for the background gradient
   */
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    return weather.is_day
      ? "from-yellow-700 to-orange-700"
      : "from-cyan-700 to-blue-700";
  };

  return (
    <div
      className={`max-w-screen-md mx-auto mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400 rounded-lg`}
    >
      <h1 className="text-4xl font-bold text-center mb-4 border-b-2 border-black">
        WEATHER WISE
      </h1>

      {/* Render the top buttons component */}
      <TopButtons
        setCity={setCity}
        favoriteCities={favoriteCities}
        setFavoriteCities={setFavoriteCities}
      />

      {/* Render the inputs component */}
      <Inputs
        setCity={setCity}
        unit={unit}
        setUnit={setUnit}
        city={city}
        favoriteCities={favoriteCities}
        setFavoriteCities={setFavoriteCities}
        is_day={weather && weather.is_day}
      />

      {/* Render the weather information if available */}
      {weather && (
        <>
          {/* Render the time and location component */}
          <TimeAndLocation weather={weather} />

          {/* Render the temperature and details component */}
          <TempAndDetails weather={weather} unit={unit} />

          {/* Render the hourly forecast component */}
          <Forecast
            title="hourly forecast"
            unit={unit}
            forecast={weather.hourlyForecast}
            is_day={weather.is_day}
          />

          {/* Render the daily forecast component */}
          <Forecast
            title="daily forecast"
            unit={unit}
            forecast={weather.dailyForecast}
            is_day={weather.is_day}
          />
        </>
      )}

      {/* Render the toast container */}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
};

export default App;
