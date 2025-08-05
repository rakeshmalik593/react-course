import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer";


const Body = () => {
  const [restaurants, setRestaurants] = useState(Object.values([]))

  useEffect(()=>{
    console.log("Useeffect called")
    fetchData();
  },[]);
  const fetchData = async()=>{
    const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&page_type=DESKTOP_WEB_LISTING`);
const json = await data.json();
let listOfRestaurants = json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
//console.log("listOfRestaurants", listOfRestaurants)
window.listOfRestaurants = listOfRestaurants;
//console.log(listOfRestaurants.info.info)
setRestaurants(listOfRestaurants);
  }
  const handleTopRatedFilter = ()=>{
    const filteredRestaurants = restaurants.filter(
      (restaurant)=>{
       return parseFloat(restaurant.info.avgRating) > 4.5;
      }
    );
    setRestaurants(filteredRestaurants);
     
    
    
  }

  if ([restaurants].length===0){
    return <Shimmer/>
  }
  return (
    <div className="body">
      <div className="filter">
       
        <button className="filter-btn" onClick={handleTopRatedFilter}> Top rated Restaurants</button>
        </div>
      <div className="rest-container">
        {restaurants.map((restaurant) => (
          //console.log(restaurant),
          <RestaurantCard
            key={restaurant.info.id}
            restData={restaurant}
          />
        ))}
      </div>
    </div>
  );
};
export default Body;