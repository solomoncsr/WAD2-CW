import { createSignal, onMount } from "solid-js";

function Catalogue() {
    const [courses, setCourses] = createSignal('');
    const [error, setError] = createSignal('');
    
    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const data = await response.json();
            setCourses(data);
        } catch (err) {
            setError(err.message);
        }
    };

    onMount(async () => {
        await fetchCourses();
        console.log(courses());
    });

    return (
        <main className="container">
            <h1>Available Courses</h1>
            {error() && <div className="alert alert-danger">{error()}</div>}
        </main>
    );
}

export default Catalogue;