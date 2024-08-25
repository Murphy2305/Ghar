const express = require("express");
const app = express(); // Initialize the Express application
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
//IMPORTING BITCHY ROUTES

const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/lisitng');
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');

// Middleware
app.use(cors()); // Corrected by calling cors() as a function (important to call it as a function)
app.use(express.json()); 
app.use(express.static('public'));



//ROUTES BITCHES
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings",bookingRoutes);
app.use("/users",userRoutes);
// Mongoose setup
const PORT =  3001;
// const PORT = process.env.PORT || 3600;

mongoose.connect(process.env.MONGO_URL, {
    dbName : "Ghar_Jaisa"
})
.then(() => {
    app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));
