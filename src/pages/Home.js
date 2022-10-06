import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_WEATHER_QUERY } from "../queries/weatherQueries";

function Home() {
  const [getWeatherData, { data, loading, error }] =
    useLazyQuery(GET_WEATHER_QUERY);

  const [cityName, setCityName] = useState("");

  const onSearch = () => {
    if (cityName === "") {
      return alert("Please Enter a City Name");
    }

    getWeatherData({ variables: { name: cityName } });
    setCityName("");
  };

  if (data) {
    console.log("data", data);
  }

  return (
    <>
      <div className="home">
        <h1>Search For Weather</h1>
        <input
          type="text"
          placeholder="Enter a City Name..."
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={() => onSearch()}>Search</button>
      </div>
      <div>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error: {error.message}</h2>}
        {data && data.getCityByName && (
          <>
            <h2>City: {data.getCityByName.name}</h2>
            <h2>Country: {data.getCityByName.country}</h2>
            <h2>
              Temperature: {data.getCityByName.weather.temperature.actual}
            </h2>
            <h2>Summary: {data.getCityByName.weather.summary.description}</h2>
            <h2>Wind Speed: {data.getCityByName.weather.wind.speed}</h2>
            <h2>Humidity: {data.getCityByName.weather.clouds.humidity}</h2>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
/**
 * {
    "__typename": "City",
    "id": "1277333",
    "name": "Bengaluru",
    "country": "IN",
    "coord": {
        "__typename": "Coordinates",
        "lon": 77.6033,
        "lat": 12.9762
    },
    "weather": {
        "__typename": "Weather",
        "summary": {
            "__typename": "Summary",
            "title": "Clouds",
            "description": "scattered clouds",
            "icon": "03n"
        },
        "temperature": {
            "__typename": "Temperature",
            "actual": 294.95,
            "feelsLike": 295.48,
            "min": 294.95,
            "max": 295.05
        },
        "wind": {
            "__typename": "Wind",
            "speed": 2.06,
            "deg": 260
        },
        "clouds": {
            "__typename": "Clouds",
            "all": 40,
            "visibility": 6000,
            "humidity": 88
        },
        "timestamp": 1665073126
    }
}
 */
