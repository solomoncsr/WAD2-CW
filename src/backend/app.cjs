const nedb = require("gray-nedb");
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const usersDb = new nedb({ filename: './data/users.db', autoload: true });
const coursesDb = new nedb({ filename: './data/courses.db', autoload: true });
const classesDb = new nedb({ filename: './data/classes.db', autoload: true });
const bookingsDb = new nedb({ filename: './data/bookings.db', autoload: true });

// Routes
const userRoutes = require('./routes/users');
// const courseRoutes = require('./routes/courses');

app.use('/api/users', userRoutes);
// app.use('/api/courses', courseRoutes);

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});

exports.app = app;
exports.usersDb = usersDb;
exports.coursesDb = coursesDb;
exports.classesDb = classesDb;
exports.bookingsDb = bookingsDb;