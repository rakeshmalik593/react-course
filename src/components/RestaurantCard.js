import { IMG_CDN_URL } from "../utils/constants";
const RestaurantCard = ({ restData }) => {
//console.log(restData.info.id)
if (!restData?.info) return null;
  const {
    id,
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    sla,
    costForTwo
  } = restData.info;
  
  return (
    <div className="rest-card">
     <img className="rest-img" src={IMG_CDN_URL + cloudinaryImageId} alt={name} />
      <h3>{name}</h3>
      <div className="rest-details">
        <div className="rest-info-row">
          <span>★ {avgRating}</span>
          <span>{cuisines?.join(', ')}</span>
        </div>
        <div className="rest-info-row">
          <span>{sla?.deliveryTime} minutes</span>
          <span>{costForTwo}</span>
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;