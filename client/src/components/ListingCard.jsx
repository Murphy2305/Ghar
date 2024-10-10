import React, { useState } from 'react';
import '../../src/Pages/styles/ListingCard.css';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setWishList } from '../redux/state';
import { Favorite } from '@mui/icons-material';

let URL = 'http://localhost:3001/';


const ListingCard = ({
    listingId,
    creator,
    listingPhotoPaths,
    city,
    province,
    country,
    category,
    type,
    price,
    startDate,
    endDate,
    totalPrice,
    booking }) => {

    const ph = [];
    listingPhotoPaths?.forEach((item) => {
        ph.push(`${URL}${item.replace("public", "")}`);
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    const previ = () => {
        setCurrentIndex((currentIndex - 1 + ph.length) % ph.length);
    };

    const nexti = () => {
        setCurrentIndex((currentIndex + 1) % ph.length);
    };
    const navigate = useNavigate();

    //ADDING WISHLIST FUNCTIONALITY
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const wishList = user?.wishList || [];
    const isLiked = wishList?.find((item) => item?._id === listingId);

    const handleFav = async () => {

        if (creator._id !== user?._id) {
            const response = await fetch(`${URL}users/${user?._id}/${listingId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
            });
            const data = await response.json();
            console.log(data);

            dispatch(setWishList(data.wishList));

        }
        else return;

    }



    return (
        <>
            <div className="listing-card" onClick={() => { navigate(`/properties/${listingId}`); }}>
                <div className="slider-container">
                    <div
                        className="slider"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: 'transform 0.5s ease-in-out'
                        }}
                    >
                        {

                            ph.map((item, index) => (
                                <div className="slidee" key={index}>
                                    <img src={item} alt={`photo ${index + 1}`} />
                                </div>
                            ))


                        }
                    </div>
                    <div className="prev-button" style={{ top: "150px", left: "20px" }} onClick={(e) => { e.stopPropagation(); previ(); }}>
                        <MdArrowBackIos />
                    </div>
                    <div className="next-button" style={{ top: "150px", right: "20px" }} onClick={(e) => { e.stopPropagation(); nexti(); }}>
                        <MdArrowForwardIos />
                    </div>
                </div>
                <h3>{city}, {province}, {country}</h3>
                <p>{category}</p>

                {!booking ? (
                    <>
                        <p>{type}</p>
                        <p>
                            <span>${price}</span> per night
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            {startDate} - {endDate}
                        </p>
                        <p>
                            <span>${totalPrice}</span> total
                        </p>
                    </>
                )}

                <button
                    className="favorite"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFav();
                    }}
                    disabled={!user}
                >
                    {isLiked ? (
                        <Favorite sx={{ color: "red" }} />
                    ) : (
                        <Favorite sx={{ color: "white" }} />
                    )}
                </button>
            </div>
        </>
    );
};

export default ListingCard;
