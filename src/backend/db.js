const nedb = require('gray-nedb');

const usersDb = new nedb({ filename: './data/users.db', autoload: true });
const coursesDb = new nedb({ filename: './data/courses.db', autoload: true });
const classesDb = new nedb({ filename: './data/classes.db', autoload: true });
const bookingsDb = new nedb({ filename: './data/bookings.db', autoload: true });

module.exports = {
    usersDb,
    coursesDb,
    classesDb,
    bookingsDb,
};