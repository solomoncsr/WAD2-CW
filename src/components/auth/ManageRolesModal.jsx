import { createSignal } from "solid-js";
import { authState } from "../../stores/authStore";

import styles from "../css/Modal.module.css";

function ManageUsersModal () {
    const [formData, setFormData] = createSignal({
        userEmail: '',
    });
    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');

    const processAccess = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = authState().token; // Get the token from the auth state
        console.log('Form Data:', formData());

        try {
            const response = await fetch('http://localhost:5000/api/users/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData()),
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

    const deleteUser = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = authState().token; // Get the token from the auth state
        console.log('Form Data:', formData());

        try {
            const response = await fetch('http://localhost:5000/api/users/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData()),
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
        <div className="modal fade" id="manageRolesModal" tabIndex="-1" aria-labelledby="manageRolesModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="manageRolesModalLabel">Manage users</h5>
                    </div>
                    <div className="modal-body">
                        {error() && <div className="alert alert-danger">{error()}</div>}
                        {success() && <div className="alert alert-success">{success()}</div>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="userSearch" className="form-label">Search User</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userSearch"
                                    placeholder="Enter email address"
                                    value={formData().userEmail}
                                    onInput={(e) => setFormData({ ...formData(), userEmail: e.target.value })}
                                />
                            </div>  
                            <div className="d-flex justify-content-between">
                                <button type="button" className={`${styles.standardButton} btn btn-primary`}>
                                    <span className="roboto-bold" onclick={processAccess}>GRANT / REVOKE ADMIN</span>
                                </button>
                                <button type="button" className={`${styles.cancelButton} btn btn-primary`}>
                                    <span className="roboto-bold" onclick={deleteUser}>DELETE USER</span>
                                </button>
                            </div>
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

export default ManageUsersModal;