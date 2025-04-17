import { createSignal, onMount } from "solid-js";

import CourseCard from "../../components/CourseCard";

function Catalogue() {
    const [courses, setCourses] = createSignal(null);
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
            
            try {
                const cards = data.map((course) => {
                    return (
                        <CourseCard
                            title={course.title}
                            description={course.description}
                            instructor={course.instructor}
                            schedule={course.schedule}
                            price={course.price}
                            capacity={course.capacity}
                            enrolledUsers={course.enrolledUsers}
                            id={course._id}
                        />
                    );
                });
                setCourses(cards);
            } catch (error) {
                setError(error.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    onMount(async () => {
        await fetchCourses();
    });

    return (
        <main className="container">
            <h1>Available Courses</h1>
            {error() && <div className="alert alert-danger">{error()}</div>}
            <div class="container">
                <div className="row">
                    {courses()}
                </div>
            </div>
        </main>
    );
}

export default Catalogue;