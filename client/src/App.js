import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CreateListing from './Pages/CreateListing';
import ListingDetails from './Pages/ListingDetails';
import TripList from './Pages/TripList';
import WishList from './Pages/WishList';
import PropertList from './Pages/PropertList';
import ReservationList from './Pages/ReservationList';
import CategoryPage from './Pages/CategoryPage';
import SearchPage from './Pages/SearchPage';

function App() {
  return (
    <div>
      <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/properties/:listingId' element={<ListingDetails />} />
          <Route path='/properties/search/:search' element={<SearchPage />} />
          <Route path='/properties/category/:category' element={<CategoryPage />} />
          <Route path='/:customerId/trips' element={<TripList />} />
          <Route path='/:customerId/wishlist' element={<WishList />} />
          <Route path='/:customerId/properties' element={<PropertList />} />
          <Route path='/:customerId/reservations' element={<ReservationList />} />


        </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
