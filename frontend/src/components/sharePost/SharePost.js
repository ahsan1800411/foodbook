import { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BiImage } from 'react-icons/bi';

// import { Restaurants } from "../../dummyData";

import './sharePost.css';

const SharePost = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [restaurantName, setRestaurantName] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  const desc = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set('img', file);
      data.set('userId', user._id);
      data.set('desc', desc.current.value);
      data.set('restaurantId', restaurantName);
      await axios.post('/api/posts', data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/api/restaurants/restaurants`);
      setRestaurants(res.data);
    };
    fetchRestaurants();
  }, [file]);

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img className='shareProfileImg' src={user.profilePicture} alt='' />

          <input
            className='shareInput'
            placeholder={'What do you think ' + user.username + '?'}
            ref={desc}
          />
        </div>
        <hr className='shareHr' />

        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              {/* <PermMedia htmlColor='tomato' className='shareIcon' /> */}
              <span className='shareText'>Upload</span>
              <BiImage fontSize={22} color={'red'} />
              <input
                style={{ display: 'none' }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg,.jfif'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              {/* <Label htmlColor='blue' className='shareIcon' /> */}
              {/* <span className='shareText'>Tag- </span>
              <label htmlFor='restaurant'> a place:</label> */}
              <select
                className='select'
                name='restaurant'
                id='restaurant'
                defaultValue={'DEFAULT'}
                required
                onChange={(e) => setRestaurantName(e.target.value)}
              >
                <option value='DEFAULT' disabled>
                  {' '}
                  Restaurant{' '}
                </option>
                {restaurants.map((res) => {
                  return (
                    <option key={res._id} value={res._id}>
                      {res.restaurantname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button className='shareButton' type='submit'>
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default SharePost;
