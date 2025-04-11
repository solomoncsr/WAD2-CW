require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { usersDb, coursesDb, classesDb, bookingsDb } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// const courseRoutes = require('./routes/courses');
// app.use('/api/courses', courseRoutes);

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});

exports.app = app;