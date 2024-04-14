import React from "react";
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";

// Component to render each detail item
function RenderDetail(props) {
    const Icon = props.icon;
    return (
        <div className="flex font-light text-sm items-center justify-center">
            <Icon size={20} className="mr-1" />
            <span className="capitalize text-white">{`${props.text} :`}</span>
            <span className="font-medium ml-1 text-white">{`${props.data}`}</span>
        </div>
    );
}

// Main component
const TempAndDetails = ({
    unit,
    weather: {
        is_day,
        condition_icon,
        condition_text,
        feelslike_f,
        humidity,
        temp_c,
        temp_f,
        wind_kph,
        wind_mph,
        sunrise,
        sunset,
        maxtemp_f,
        mintemp_f,
    },
}) => {
    // Details to be displayed on the left side
    const leftDetails = [
        {
            id: 4,
            icon: UilSun,
            text: "Rise",
            data: sunrise,
        },
        {
            id: 5,
            icon: UilSunset,
            text: "Set",
            data: sunset,
        },
        {
            id: 6,
            icon: UilArrowUp,
            text: "High",
            data: `${maxtemp_f}°F`,
        },
        {
            id: 7,
            icon: UilArrowDown,
            text: "Low",
            data: `${mintemp_f}°F`,
        },
    ];

    // Details to be displayed on the right side
    const rightDetails = [
        {
            id: 1,
            icon: UilTemperature,
            text: "real feel",
            data: `${feelslike_f}°F`,
        },
        {
            id: 2,
            icon: UilTear,
            text: "humidity",
            data: humidity + " %",
        },
        {
            id: 3,
            icon: UilWind,
            text: "wind",
            data: `${unit === "c" ? wind_kph + " km/h" : wind_mph + "m/h"}`,
        },
    ];

    // Determine the background color of the cards based on whether it is day or night
    const cardColor = is_day ? "bg-yellow-700" : "bg-blue-500";
    // Determine the text color based on whether it is day or night
    const textColor = is_day ? "text-yellow-300" : "text-cyan-300";

    return (
        <div>
            {/* Display the condition text */}
            <div className="flex items-center justify-center py-6 text-left ${textColor}">
                <p className={textColor}>{condition_text}</p>
            </div>

            {/* Display the left details */}
            <div className="flex flex-row items-stretch justify-center py-3">
                <div
                    className={`flex flex-col items-start space-y-2 mr-6 ${cardColor} rounded-lg border-2 p-3`}
                >
                    {leftDetails.map(({ id, icon, text, data }) => (
                        <RenderDetail key={id} icon={icon} text={text} data={data} />
                    ))}
                </div>

                {/* Display the weather condition icon and temperature */}
                <div className="flex flex-col items-center justify-center p-3">
                    <img
                        className="w-20"
                        src={condition_icon}
                        alt="weather-condition-icon"
                    />
                    <p className="text-5xl text-white">
                        {unit === "c" ? temp_c : temp_f}
                        <sup>°{unit === "c" ? "C" : "F"}</sup>
                    </p>
                </div>

                {/* Display the right details */}
                <div
                    className={`flex flex-col items-start space-y-2 ml-6 ${cardColor} rounded-lg border-2 p-3`}
                >
                    {rightDetails.map(({ id, icon, text, data }) => (
                        <RenderDetail key={id} icon={icon} text={text} data={data} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TempAndDetails;
