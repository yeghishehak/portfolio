const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const xss = require('xss');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const User = require('./User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5553;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'Images')));
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Set secure headers

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 requests per minute per IP
  message: 'Too many requests, please try again later.',
});

app.set('trust proxy', 1);
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

// Serve resume file
app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'Yeghishe\'s Resume For Website.pdf'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  // Sanitize input
  const rawName = xss(req.body.username?.trim());
  const rawEmail = xss(req.body.email?.trim());
  const rawMessage = xss(req.body.message?.trim());

  if (!rawName || !rawEmail || !rawMessage) {
    return res.status(400).send('All fields are required.');
  }

  // Very basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(rawEmail)) {
    return res.status(400).send('Invalid email address.');
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const userName = escapeHTML(rawName);
  const userEmail = escapeHTML(rawEmail);
  const userMessage = escapeHTML(rawMessage);

  try {
    await User.create({ name: userName, email: userEmail, message: userMessage });
    console.log('Message saved to database');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Yeghishe's Portfolio" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: 'Message from portfolio',
      html: `
        <h2>New message from portfolio</h2>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Message:</strong><br>${userMessage}</p>
      `,
    });

    res.redirect('/');
  } catch (error) {
    console.error('Submission error:', error.message);
    if (error.code === 11000) {
      return res.status(409).send('Duplicate email not allowed.');
    }
    res.status(500).send('Something went wrong.');
  }
});

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'wrongpage.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
