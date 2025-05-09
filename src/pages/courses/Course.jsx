import { onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import { authState } from "../../stores/authStore";

import styles from './css/Course.module.css';

function Course() {
    const [course, setCourse] = createSignal(null);
    const [success, setSuccess] = createSignal('');
    const [error, setError] = createSignal('');

    const params = useParams();
    const courseId = params.id; // Get the course ID from the URL parameters

    const fetchCourse = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const data = await response.json();
            
            setCourse(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEnroll = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState().token}`,
                },
                body: JSON.stringify({ userId: authState().user._id }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const data = await response.json();
            setSuccess(data.message); // Handle success message
        } catch (error) {
            setError(error.message);
        }
    };

    onMount(async () => {
        await fetchCourse();
        console.log(course());
    });

    return (
        <main className="container">
            <h1>Course</h1>
            {error() && <div className="alert alert-danger">{error()}</div>}
            {success() && <div className="alert alert-success">{success()}</div>}
            {course() ? (
                <div>
                    <h2>{course().title}</h2>
                    <p>{course().description}</p>
                    <p>Instructor: {course().instructor}</p>
                    <p><strong>Schedule:</strong> {course().schedule}</p>
                    <p><strong>Price:</strong> £{course().price}</p>
                    <p><strong>Capacity:</strong> {course().enrolledUsers.length}/{course().capacity}</p>
                    <button type="button" className={`${styles.standardButton} btn btn-primary w-100 mt-4`} onclick={handleEnroll} disabled={!authState().isAuthenticated}><span class="roboto-bold">ENROLL IN COURSE</span></button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="actions">
                <button className={`${styles.cancelButton} btn btn-primary mt-4`} onClick={() => window.history.back()}><span class="roboto-bold">BACK</span></button>
            </div>
        </main>
    );
}

export default Course;