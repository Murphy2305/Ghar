import React, { useEffect, useState } from 'react';
import '../Pages/styles/List.css';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setTripList } from '../redux/state';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const TripList = () => {

let URL = 'https://ghar-backend.onrender.com/';

  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.user._id); 
  const tripList = useSelector((state) => state.user.tripList); 
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(`${URL}users/${userId}/trips`, {
        method: 'GET',
      });

      const data = await response.json();
      // console.log('Fetched trip data:', data);

      dispatch(setTripList(data));
      // console.log(data);
      
      setLoading(false); 
    } catch (err) {
      console.log('Fetch Trip List failed!', err.message);
    }
  };

  useEffect(() => {
      getTripList(); 
  }, []); 

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip Details</h1>
      <div className="list">
        {tripList && tripList.length > 0 ? (
          tripList.map(({ listingId, hostId,startDate, endDate, totalPrice, booking = true }) => (
            <ListingCard
              key={listingId._id}
              creator={hostId}
              listingId={listingId}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              booking={booking}
            />
          ))
        ) : (
          <h1>No trips found</h1>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default TripList;
