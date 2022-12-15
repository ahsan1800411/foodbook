import { Link } from 'react-router-dom';
import './restaurantsList.css';

const RestaurantsList = ({ restaurant }) => {
  return (
    <>
      <li className='rest-div'>
        <div className='rightbarProfileImgContainer'>
          <Link to={`/restaurant/${restaurant.restaurantname}`}>
            <img
              className='rightbarProfileImg'
              src={restaurant.profilePicture}
              alt=''
            />
          </Link>
        </div>
        <span className='rightbarRestaurant'> {restaurant.restaurantname}</span>
      </li>
    </>
  );
};

export default RestaurantsList;
