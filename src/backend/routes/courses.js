const express = require('express');
const { coursesDb } = require('../db.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

// Get all courses
router.get('/', (_, res) => {
    coursesDb.find({}, (err, courses) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(courses);
    });
});

// Get course by ID
router.get('/:id', (req, res) => {
    const courseId = req.params.id;
    coursesDb.findOne({ _id: courseId }, (err, course) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    });
});

router.post('/:id/enroll', authMiddleware, (req, res) => {
    const courseId = req.params.id;
    const userId = req.user.id;

    coursesDb.findOne({ _id: courseId }, (err, course) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the user is already enrolled
        if (course.enrolledUsers.includes(userId)) {
            return res.status(400).json({ error: 'User already enrolled in this course' });
        }

        // Check if the course is full
        if (course.enrolledUsers.length >= course.maxUsers) {
            return res.status(400).json({ error: 'Course is full' });
        }

        // Enroll the user
        const updatedEnrolledUsers = course.enrolledUsers || [];
        updatedEnrolledUsers.push(userId);

        coursesDb.update(
            { _id: courseId },
            { $set: { enrolledUsers: updatedEnrolledUsers } },
            {},
            (updateErr) => {
                if (updateErr) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                res.status(200).json({ message: 'User enrolled successfully' });
            }
        );
    });
});

// Create a new course
router.post('/create', authMiddleware, (req, res) => {
    const { title, description, instructor, schedule, capacity, price } = req.body;
    const adminTag = req.user.adminTag;

    if (!adminTag) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const newCourse = {
        title,
        description,
        instructor,
        schedule,
        capacity,
        price,
        enrolledUsers: [],
    };

    coursesDb.insert(newCourse, (err, newDoc) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json(newDoc);
    });
});

// Delete a course
router.delete('/:id/delete', authMiddleware, (req, res) => {
    const courseId = req.params.id;
    const adminTag = req.user.adminTag;

    if (!adminTag) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    coursesDb.remove({ _id: courseId }, {}, (err, numRemoved) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (numRemoved === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    });
});

module.exports = router;