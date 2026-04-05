import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ clothingItems, handleOpenItemModal, weatherData, onCardLike }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData?.temp?.[currentTempUnit];

  const tempF = currentTempUnit === "F" ? temp : (temp * 9) / 5 + 32;

  let weatherType = "warm";
  if (tempF <= 45) weatherType = "cold";
  if (tempF >= 75) weatherType = "hot";

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType,
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__text">
        Today is {weatherData.temp?.[currentTempUnit]} &deg;
        {currentTempUnit} / You may want to wear:
      </p>

      <ul className="main__card-list">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id ?? item.link}
            data={item}
            onCardClick={handleOpenItemModal}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
