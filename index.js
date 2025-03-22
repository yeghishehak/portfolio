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

app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'Yeghishe\'s Portfolio.pdf'));
});

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

    console.log('Message sent to database successfully');

    const transporter = nodemailer.createTransport({
        service: 'gmail', // SMTP server for Mail.ru
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

        await transporter.sendMail ({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Message from portfolio',
            html: 
            `<h1>Someone sent you a message from "Yeghishe's Portfolio".</h1> 
            <p>Name: <b>${userName}</b>, <br> Email: <b>${userEmail}</b>, <br> Message: <b>${userMessage}</b></p>`
        })
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