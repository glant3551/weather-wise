import React from "react";

const TopButtons = ({ setCity, favoriteCities, setFavoriteCities }) => {
  return (
    <div className="flex items-center justify-around my-6">
      {favoriteCities.map((city, index) => (
        <div key={index} className="flex flex-col items-center">
          <button
            onClick={() => setCity(city)}
            className="text-white first-letter:uppercase text-lg font-medium "
          >
            {city}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TopButtons;
