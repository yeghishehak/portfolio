const User = require('./User');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
require('dotenv').config();

const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, './public')));

app.use('/images', express.static(path.join(__dirname, './Images')));

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

app.post('/submit', async (req, res) => {
    const userName = req.body.username;
    const userEmail = req.body.email;
    const userMessage = req.body.message;

    console.log("Name: ", userName);
    console.log("Email: ", userEmail);
    console.log("Message: ", userMessage);
    
    try {
    const user = await User.create({
        name: userName,
        email: userEmail,
        message: userMessage
    });

    console.log('Message sent successfully');
    res.redirect('/');
} 
catch (error) {
        console.log(error.message);
        res.write("email can't be duplicated");
        res.end();
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './index.html'));
});

// fetch('http://localhost:5000/')  
//   .then(response => response.text())  // Convert response to text (HTML)
//   .then(data => console.log("Received HTML:", data))  // Log the HTML content
//   .catch(error => console.log("Fetch error:", error));


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});