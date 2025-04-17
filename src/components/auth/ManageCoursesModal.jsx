import { createSignal } from "solid-js";
import { authState } from "../../stores/authStore";

import styles from "../css/Modal.module.css";

function ManageCoursesModal () {
    const [createFormData, setCreateFormData] = createSignal({
        title: '',
        instructor: '',
        schedule: '',
        description: '',
        capacity: '',
        price: '',
    });
    
    const [deleteFormData, setDeleteFormData] = createSignal({
        courseId: '',
    });

    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');

    const createCourse = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = authState().token; // Get the token from the auth state
        console.log('Create Form Data:', createFormData());

        try {
            const response = await fetch('http://localhost:5000/api/courses/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(createFormData()),
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const { message } = await response.json();
            setSuccess(message);
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteCourse = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = authState().token; // Get the token from the auth state
        console.log('Delete Form Data:', deleteFormData());

        try {
            const response = await fetch(`http://localhost:5000/api/courses/${deleteFormData().courseId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const { message } = await response.json();
            setSuccess(message);
        } catch (error) {
            setError(error.message);
        }
    };
    
    return (
        <div className="modal fade" id="manageCoursesModal" tabIndex="-1" aria-labelledby="manageCoursesModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="manageCoursesModalLabel">Manage courses</h5>
                    </div>
                    <div className="modal-body">
                        {error() && <div className="alert alert-danger">{error()}</div>}
                        {success() && <div className="alert alert-success">{success()}</div>}
                        <h4 className="mb-3">Create a course</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Course Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter course name"
                                    value={createFormData().title}
                                    onInput={(e) => setCreateFormData({ ...createFormData(), title: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="instructor" className="form-label">Instructor Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="instructor"
                                    placeholder="Enter instructor name"
                                    value={createFormData().instructor}
                                    onInput={(e) => setCreateFormData({ ...createFormData(), instructor: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="schedule" className="form-label">Schedule ('Day at Time')</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="schedule"
                                    placeholder="Enter schedule"
                                    value={createFormData().schedule}
                                    onInput={(e) => setCreateFormData({ ...createFormData(), schedule: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="capacity" className="form-label">Capacity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="capacity"
                                    placeholder="Enter capacity"
                                    value={createFormData().capacity}
                                    onInput={(e) => setCreateFormData({ ...createFormData(), capacity: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Enter course price"
                                    value={createFormData().price}
                                    onInput={(e) => setCreateFormData({ ...createFormData(), price: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    placeholder="Enter course description"
                                    value={createFormData().description}
                                    onInput={(e) => setCreateFormData({ ...createFormData(), description: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="button" className={`${styles.standardButton} btn btn-primary`} onClick={createCourse}>
                                <span className="roboto-bold">CREATE COURSE</span>
                            </button>
                            <h4 className="mt-3 mb-3">Delete a course</h4>
                            <div className="mb-3">
                                <label htmlFor="courseId" className="form-label">Course Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="courseId"
                                    placeholder="Enter course ID"
                                    value={deleteFormData().courseId}
                                    onInput={(e) => setDeleteFormData({ ...deleteFormData(), courseId: e.target.value })}
                                />
                            </div>
                            <button type="button" className={`${styles.cancelButton} btn btn-primary`} onClick={deleteCourse}>
                                <span className="roboto-bold">DELETE COURSE</span>
                            </button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            <span className="roboto-bold">CLOSE</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageCoursesModal;