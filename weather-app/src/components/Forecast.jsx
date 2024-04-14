import React from "react";

// This component represents a forecast display
const Forecast = ({ title, unit, forecast, is_day }) => {
    // Determine the background color of the forecast card based on whether it is day or night
    const cardColor = is_day ? "bg-yellow-700" : "bg-blue-500";

    return (
        <div>
            {/* Display the title of the forecast */}
            <div className="flex items-center justify-start my-6">
                <p className="font-medium first-letter:uppercase text-white">{title}</p>
            </div>

            {/* Display a horizontal line */}
            <hr className="my-2" />

            {/* Display the forecast cards */}
            <div className="flex flex-row items-center justify-start overflow-x-auto scrollbar scrollbar-thumb-blue-500 p-1">
                {/* Map through the forecast data and create a card for each item */}
                {forecast.map(({ title, icon, temp_c, temp_f }) => (
                    <div
                        key={Math.random()}
                        className={`flex flex-col items-center justify-center rounded-full border border-light-cyan p-4 ${cardColor} mx-2`}
                    >
                        {/* Display the title of the forecast item */}
                        <p className="font-light text-sm text-white">{title}</p>
                        {/* Display the weather condition icon */}
                        <img
                            className="w-12 my-1"
                            src={icon}
                            alt="weather condition icon"
                        />
                        {/* Display the temperature in either Celsius or Fahrenheit based on the selected unit */}
                        <p className="font-medium text-white">
                            {unit === "c" ? temp_c : temp_f}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
