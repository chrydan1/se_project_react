import cloudy from "../../assets/cloudy.svg";
import "../WeatherCard/weathercard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { weatherConditionImages } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  // TODO-destructure the current temp unit

  const contextValue = useContext(CurrentTemperatureUnitContext);
  const timeOfDay = weatherData.isDay ? "day" : "night";

  //TODO vary image base on day/night (hint:ternary)

  return (
    <section className="weather-card">
      <img
        src={
          weatherConditionImages[timeOfDay]?.[weatherData.weatherCondition]?.image || 
          weatherConditionImages[timeOfDay]?.["default"]?.image
        }
        alt="weather"
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {weatherData.temp?.[contextValue.currentTempUnit]} &deg;
        {contextValue.currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
