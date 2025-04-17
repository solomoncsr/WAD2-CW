import { createSignal } from "solid-js";
import { authState } from "../../stores/authStore";

import styles from "../css/Modal.module.css";

function ManageCoursesModal () {
    const [createFormData, setCreateFormData] = createSignal({
        courseName: '',
        instructorName: '',
        courseSchedule: '',
        courseDescription: '',
        capacity: '',
        price: ''
    });
    
    const [deleteFormData, setDeleteFormData] = createSignal({
        courseName: '',
    });

    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');
    
    return (
        <div className="modal fade" id="manageCoursesModal" tabIndex="-1" aria-labelledby="manageCoursesModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="manageCoursesModalLabel">Manage courses</h5>
                    </div>
                    <div className="modal-body">
                        <h4 className="mb-3">Create a course</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="courseName" className="form-label">Course Name</label>
                                <input type="text" className="form-control" id="courseName" placeholder="Enter course name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instructorName" className="form-label">Instructor Name</label>
                                <input type="text" className="form-control" id="instructorName" placeholder="Enter instructor name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="courseSchedule" className="form-label">Schedule ('Day at Time')</label>
                                <input type="text" className="form-control" id="courseSchedule" placeholder="Enter schedule" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="courseCapacity" className="form-label">Capacity</label>
                                <input type="number" className="form-control" id="courseCapacity" placeholder="Enter capacity" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="coursePrice" className="form-label">Price</label>
                                <input type="number" className="form-control" id="coursePrice" placeholder="Enter course price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="courseDescription" className="form-label">Description</label>
                                <textarea className="form-control" id="courseDescription" rows="3" placeholder="Enter course description"></textarea>
                            </div>
                            <button type="button" className={`${styles.standardButton} btn btn-primary`}>
                                <span className="roboto-bold">CREATE COURSE</span>
                            </button>
                        </form>
                        <h4 className="mt-3 mb-3">Delete a course</h4>
                        <div className="mb-3">
                            <label htmlFor="courseName" className="form-label">Course Name</label>
                            <input type="text" className="form-control" id="courseName" placeholder="Enter course name" />
                        </div>
                        <button type="button" className={`${styles.cancelButton} btn btn-primary`}>
                            <span className="roboto-bold">DELETE COURSE</span>
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageCoursesModal;