const router = require("express").Router();
const Booking = require('../models/Booking');

router.post("/create", async(req,res) =>{

    try {
            const {customerId,listingId, hostId , startDate, endDate, totalPrice} = req.body;
            console.log(req.body);
            
        const newBooking = new Booking({customerId, listingId,hostId, startDate, endDate, totalPrice});
        await newBooking.save();
        res.status(200).json({"Booking successful!" : newBooking});
    } catch (error) {
        res.status(400).json("faied to create new booking", error.message);
    }
    

});

module.exports=router;