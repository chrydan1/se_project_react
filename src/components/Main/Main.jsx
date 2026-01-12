import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {

// TODO-make temp change with context 
// TODO-filter item cards based on weather 

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">Today is {weatherData.temp?.F} F° / You may want to wear:</p>
      <ul className="main__card-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
