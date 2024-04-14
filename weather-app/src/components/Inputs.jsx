import React, { useState } from "react";
import { UilSearch, UilFavorite, UilTrash } from "@iconscout/react-unicons";

/**
 * Renders the Inputs component.
 * @param {Object} props - The component props.
 * @param {function} props.setCity - The function to set the city value.
 * @param {string} props.city - The current city value.
 * @param {Array} props.favoriteCities - The array of favorite cities.
 * @param {function} props.setFavoriteCities - The function to set the favorite cities array.
 * @param {boolean} props.is_day - Indicates whether it is day or night.
 * @returns {JSX.Element} The rendered Inputs component.
 */
const Inputs = ({
  setCity,
  city,
  favoriteCities,
  setFavoriteCities,
  is_day,
}) => {
  // State for the input value
  const [cityInput, setCityInput] = useState("");

  /**
   * Handles the city search button click.
   * Sets the city value to the input value.
   */
  const handleCitySearch = () => {
    if (!cityInput) return;
    setCity(cityInput);
  };

  /**
   * Handles the favorite button click.
   * Adds the current city to the favorite cities array if it is not already included.
   */
  const handleFavoriteClick = () => {
    if (!favoriteCities.includes(city)) {
      setFavoriteCities([...favoriteCities, city]);
    }
  };

  /**
   * Handles the trash/delete button click.
   * Removes the current city from the favorite cities array.
   */
  const handleTrashClick = () => {
    setFavoriteCities(favoriteCities.filter((favCity) => favCity !== city));
  };

  // Determines the color of the icon based on whether it is day or night
  const iconColor = is_day ? "bg-yellow-700" : "bg-blue-500";

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="search for city..."
          className="text-xl text-gray-500 rounded-md font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <div
          className={`rounded-full cursor-pointer border-2 border-white transition ease-out hover:scale-125 ${iconColor} p-2`}
        >
          <UilSearch onClick={handleCitySearch} size={25} />
        </div>
        <div
          className={`rounded-full cursor-pointer border-2 border-white transition ease-out hover:scale-125 ${iconColor} p-2`}
        >
          {favoriteCities.includes(city) ? (
            <UilTrash onClick={handleTrashClick} size={25} />
          ) : (
            <UilFavorite onClick={handleFavoriteClick} size={25} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inputs;
