import { createMemo, createSignal, onMount } from "solid-js";
import { SimpleTable } from "solid-simple-table";

import styles from "../css/Modal.module.css";

function GenerateReportModal () {
    const [courseList, setCourseList] = createSignal([]);
    const [error, setError] = createSignal('');

    const getCourseData = async () => {
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/courses/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const data = await response.json();
            
            try {
                const courseData = data.map((course) => {
                    return {
                        title: course.title,
                        description: course.description,
                        instructor: course.instructor,
                        schedule: course.schedule,
                        price: course.price,
                        capacity: course.capacity,
                        enrolledUsers: course.enrolledUsers,
                        id: course._id
                    };
                });
                setCourseList(courseData);
            } catch (error) {
                setError(error.message);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    onMount(async () => {
        await getCourseData();
        console.log('Courses:', courseList());
    });
    
    const formattedRows = createMemo(() => courseList());

    return (
        <div className="modal fade" id="generateReportModal" tabIndex="-1" aria-labelledby="generateReportModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="generateReportModalLabel">Generate report</h5>
                    </div>
                    <div className="modal-body">
                        {error() && <div className="alert alert-danger">{error()}</div>}
                        {courseList().length > 0 ? (
                            <div className={styles.userTable}>
                                <SimpleTable rows={formattedRows()} />
                            </div>
                        ) : (
                            <p>Generating report...</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><span className="roboto-bold">CLOSE</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GenerateReportModal;