import React from "react";

/**
 * Renders the time and location information for the weather.
 *
 * @component
 * @param {Object} weather - The weather object containing location and time data.
 * @param {string} weather.locDateTime - The local date and time.
 * @param {string} weather.loc_name - The name of the location.
 * @param {string} weather.loc_country - The country of the location.
 * @returns {JSX.Element} The rendered time and location component.
 */
const TimeAndLocation = ({
  weather: { locDateTime, loc_name, loc_country },
}) => {
  return (
    <div>
      <div className="flex items-center justify-center my-6 ">
        <p className="text-white text-xl font-extralight">{locDateTime}</p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${loc_name}, ${loc_country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
