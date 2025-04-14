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
            const response = await fetch('http://localhost:5000/api/courses/:id', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: courseId }), // Replace with actual course ID
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
        </main>
    );
}

export default Course;