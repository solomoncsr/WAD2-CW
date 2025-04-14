import { onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import { createSignal } from "solid-js";

function Course() {
    const [course, setCourse] = createSignal(null);
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

    onMount(async () => {
        await fetchCourse();
        console.log(course());
    });

    return (
        <main className="container">
            <h1>Course</h1>
            {error() && <div className="alert alert-danger">{error()}</div>}
            {course() ? (
                <div>
                    <h2>{course().title}</h2>
                    <p>{course().description}</p>
                    <p>Instructor: {course().instructor}</p>
                    <p><strong>Schedule:</strong> {course().schedule}</p>
                    <p><strong>Price:</strong> £{course().price}</p>
                    <p><strong>Capacity:</strong> {course().enrolledUsers.length}/{course().capacity}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="actions">
                <button className="btn btn-primary" onClick={() => window.history.back()}>Back</button>
            </div>
        </main>
    );
}

export default Course;