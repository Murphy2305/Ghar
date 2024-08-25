import React, { useEffect, useState } from 'react'
import {categories} from '../../src/data'
import '../Pages/styles/Listings.css'
import {useDispatch, useSelector} from 'react-redux'
import Loader from './Loader'
import ListingCard from './ListingCard' 
import {setListings} from '../redux/state'
const Listings = () => {

    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    const [selectCategory, setSelectCategory] = useState("All");
    const listings = useSelector((state)=>state.listings);
    // console.log(listings);
    
    
    const getData = async()=>{
        try {
            
            const response = await fetch(
                selectCategory!=='All' ?
                `http://localhost:3001/properties?category=${selectCategory}`
                :
                "http://localhost:3001/properties"
                ,{
                    method: 'GET',
                }
                
                );

        const dataResponse = await response.json();
        dispatch(setListings({ listings: dataResponse })); 
        // console.log(dataResponse);
        
        setLoading(false)   
        

        } catch (err) {
            console.log("Fetch Listinigs Failed", err.message);
            
        }
    }

    useEffect(()=>{
        getData();
    },[selectCategory]);

    

  return (
    <>
    <div className="category-list">
        {
            categories?.map((item,index)=>(
                <div className={`category ${ item.label===selectCategory ? "selected" : ""}`} key={index} onClick={()=>setSelectCategory(item.label)}>
                    <div className="cateogry_icon">
                        {item.icon}
                    </div>
                    <p>{item.label}</p>
                </div>
            ))
        }
    </div>
        {loading ? (
                <Loader />
            ) : (
                <div className="listings">
                {listings?.map(
                    ({
                    _id,
                    creator,
                    listingPhotoPaths,
                    city,
                    province,
                    country,
                    category,
                    type,
                    price,
                    booking=false
                    }) => (
                    <ListingCard
                        listingId={_id}
                        creator={creator}
                        listingPhotoPaths={listingPhotoPaths}
                        city={city}
                        province={province}
                        country={country}
                        category={category}
                        type={type}
                        price={price}
                        booking={booking}
                    />
                    )
                )}
        </div>
      )}
</>
    
)
}

export default Listings