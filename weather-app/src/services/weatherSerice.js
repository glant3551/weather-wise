import { DateTime } from "luxon";

const API_KEY = "4f58f3e1ff944f6499d05328240304";
const BASE_URL = "http://api.weatherapi.com/v1";

// Function to fetch data from the API
const fetchData = (apiMethod, searchParams) => {
  const url = new URL(BASE_URL + "/" + apiMethod + ".json");
  url.search = new URLSearchParams({ key: API_KEY, ...searchParams });

  return fetch(url).then((res) => res.json());
};

// Function to get formatted weather data for a city
export const getFormattedWeatherData = async (city) => {
  // Fetch forecast data for the city
  const formattedWeather = await fetchData("forecast", {
    q: city,
    days: 7,
  }).then(formatForecastWeather);

  return formattedWeather;
};

// Function to format the forecast weather data
const formatForecastWeather = (data) => {
  const {
    location: {
      name: loc_name,
      country: loc_country,
      localtime_epoch: loc_epoch,
      tz_id: loc_tz,
    },
    forecast: { forecastday },
    current: {
      condition: { icon: condition_icon, text: condition_text },
      feelslike_f,
      humidity,
      temp_c,
      temp_f,
      wind_kph,
      wind_mph,
      is_day,
    },
  } = data;

  // Format the local date and time
  const locDateTime = formatToLocalTime(loc_epoch, loc_tz);

  return {
    loc_name,
    loc_country,
    locDateTime,
    condition_text,
    condition_icon: formatIconUrl(condition_icon),
    feelslike_f,
    humidity,
    temp_c,
    temp_f,
    wind_kph,
    wind_mph,
    is_day,
    maxtemp_f: forecastday[0].day.maxtemp_f,
    mintemp_f: forecastday[0].day.mintemp_f,
    ...formatAstroData(forecastday),
    dailyForecast: formatDailyForecast(forecastday, loc_tz),
    hourlyForecast: formatHourlyForecast(forecastday, loc_epoch, loc_tz),
  };
};

// Function to format the icon URL
const formatIconUrl = (iconUrl) => {
  return "https:" + iconUrl;
};

// Function to format the hourly forecast data
const formatHourlyForecast = (forecast, loc_epoch, timezone) => {
  let hourlyForecast = forecast.slice(0, 2).map(({ hour }) => hour);
  hourlyForecast = [...hourlyForecast[0], ...hourlyForecast[1]];
  hourlyForecast = hourlyForecast.filter(
    (forecast) => forecast.time_epoch > loc_epoch
  );
  hourlyForecast = hourlyForecast
    .slice(0, 23)
    .map(({ temp_c, temp_f, time_epoch, condition: { icon } }) => {
      return {
        temp_c,
        temp_f,
        icon: formatIconUrl(icon),
        title: formatToLocalTime(time_epoch, timezone, "hh:mm a"),
      };
    });

  return hourlyForecast;
};

// Function to format the daily forecast data
const formatDailyForecast = (forecast, timezone) => {
  const dailyForecast = forecast.map(({ date_epoch, day }) => {
    return {
      title: formatToLocalTime(date_epoch, timezone, "ccc"),
      temp_f: day.avgtemp_f,
      icon: formatIconUrl(day.condition.icon),
    };
  });

  return dailyForecast;
};

// Function to format the astrological data
const formatAstroData = (forecast) => {
  const {
    astro: { sunrise, sunset, moonrise, moonset },
  } = forecast[0];

  return { sunrise, sunset, moonrise, moonset };
};

// Function to format the epoch time to local time
const formatToLocalTime = (
  epoch,
  timezone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(epoch).setZone(timezone).toFormat(format);
};
