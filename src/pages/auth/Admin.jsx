import { createSignal, onMount } from 'solid-js';
import { authState } from '../../stores/authStore';

import styles from '../css/auth/AuthForm.module.css';

function Admin() {    
    const [userData, setUserData] = createSignal(null);
    const [error, setError] = createSignal('');

    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime; // Check if the token is expired
    };

    const checkAdminTag = async () => {
        try {
            const token = authState().token; // Get the token from the auth state
            // Check if token exists and is not expired
            if (!token || isTokenExpired(token)) {
                alert('Session expired. Please log in again.');
                window.location.href = '/profile';
                return;
            }

            if (!authState().isAuthenticated || !authState().user?.adminTag) {
                window.location.href = '/profile';
                return;
            }

            setUserData(authState().user); // Set user data if authenticated and has adminTag
        } catch (error) {
            setError(error.message);
        }
    };

    onMount(async () => {
        await checkAdminTag();
    });
    
    return (
        <main className={`${styles.authFormWrapper} container`}>
            <div className={`${styles.authFormCard} card mx-auto m-2 p-5`}>
                <h1>Admin Dashboard</h1>
                {userData() ? (
                    <div className="mt-4">
                        <h2>{`${userData().firstName} ${userData().lastName}`}</h2>
                        <div className="mt-4">
                            <h3>Admin Actions</h3>
                            <div className="d-flex flex-column gap-2">
                                <button className="btn btn-primary" onClick={() => console.log('View Users')}>View Users</button>
                                <button className="btn btn-secondary" disabled={!authState().user.superAdminTag} onClick={() => console.log('Manage Roles')}>Manage Roles</button>
                                <button className="btn btn-success" onClick={() => console.log('Generate Reports')}>Generate Reports</button>
                                <button className="btn btn-warning" onClick={() => console.log('System Settings')}>System Settings</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {error() && <div className="alert alert-danger">{error()}</div>}
                    </>
                )}
            </div>
        </main>
    );
}

export default Admin;