const nedb = require("gray-nedb");
const express = require('express');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const db = new nedb({ filename: 'data.db', autoload: true });

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});

export default app;
export { db };