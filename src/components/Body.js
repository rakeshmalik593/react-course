import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    console.log("Useeffect called");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await data.json();
    let listOfRestaurants =
      json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    window.listOfRestaurants = listOfRestaurants;
    setRestaurants(listOfRestaurants);
    setAllRestaurants(listOfRestaurants);
    setIsLoading(false);
    console.log(listOfRestaurants);
  };

  const handleTopRatedFilter = () => {
    const filteredRestaurants = allRestaurants.filter((restaurant) => {
      return parseFloat(restaurant.info.avgRating) > 4.5;
    });
    setRestaurants(filteredRestaurants);
    setIsLoading(false);
  };
  const handleSearchText = (event) => {
    setSearchText(event.target.value);
    //console.log(event.target.value);
  };
  const handleSearchButton = () => {
    console.log(searchText);
    const filterRest = allRestaurants.filter((rest) => {
      return rest.info.name
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
    });
    console.log(filterRest);
    setRestaurants(filterRest);
  };

  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={handleSearchText}
          />
          <button onClick={handleSearchButton}>Search</button>
        </div>
        <button className="filter-btn" onClick={handleTopRatedFilter}>
          {" "}
          Top rated Restaurants
        </button>
      </div>
      <div className="rest-container">
        {restaurants.map((restaurant) => (
          //console.log(restaurant),
          <RestaurantCard key={restaurant.info.id} restData={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default Body;
