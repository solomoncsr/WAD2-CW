import { createMemo, createSignal, onMount } from "solid-js";
import { authState } from "../../stores/authStore";
import { SimpleTable } from "solid-simple-table";

import styles from '../css/Modal.module.css';

function ViewUsersModal () {
    const [users, setUsers] = createSignal([]);
    const [userList, setUserList] = createSignal([]);
    const [error, setError] = createSignal('');

    const token = authState().token; // Get the token from the auth state
    
    const getUserData = async () => {
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/users/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error);
            }

            const { users } = await response.json();
            setUsers(users); // Set the users data
        } catch (error) {
            setError(error.message);
        }
    }

    onMount(async () => {  
        await getUserData();
        console.log('Users:', users());

        try {
            const userRows = users().map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                adminTag: user.adminTag,
                superAdminTag: user.superAdminTag,
                createdAt: new Date(user.createdAt).toLocaleDateString(),
            }));
            setUserList(userRows); // Set the user list for the table
        } catch (error) {
            setError(error.message);
        }
    });

    const formattedRows = createMemo(() => userList());
    
    return (
        <div className="modal fade" id="viewUsersModal" tabIndex="-1" aria-labelledby="viewUsersModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="viewUsersModalLabel">View users</h5>
                    </div>
                    {error() && <div className="alert alert-danger">{error()}</div>}
                    <div className="modal-body">
                        {userList().length > 0 ? (
                            <div className={styles.userTable}>
                                <SimpleTable rows={formattedRows()} />
                            </div>
                        ) : (
                            <p>Loading users...</p>
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

export default ViewUsersModal;