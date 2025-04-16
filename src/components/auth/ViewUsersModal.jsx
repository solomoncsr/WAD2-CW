import { createSignal, onMount } from "solid-js";
import { authState } from "../../stores/authStore";

function ViewUsersModal () {
    const [users, setUsers] = createSignal([]);
    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');

    const token = authState().token; // Get the token from the auth state
    
    const getUserData = async (e) => {
        setError('');
        setSuccess('');

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

            const { message, users } = await response.json();
            setSuccess(message);
            setUsers(users); // Set the users data
        } catch (error) {
            setError(error.message);
        }
    }

    onMount(async () => {  
        await getUserData();
        console.log('Users:', users());
    });
    
    return (
        <div className="modal fade" id="viewUsersModal" tabIndex="-1" aria-labelledby="viewUsersModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="viewUsersModalLabel">View users</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* Modal body content goes here */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewUsersModal;