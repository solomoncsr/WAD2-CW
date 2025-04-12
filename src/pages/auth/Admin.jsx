import { createSignal, onMount } from 'solid-js';

import styles from '../css/auth/AuthForm.module.css';

function Admin() {    
    const [userData, setUserData] = createSignal(null);
    const [error, setError] = createSignal('');

    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime; // Check if the token is expired
    };

    const fetchAdminData = async () => {
        try {
            const token = localStorage.getItem('token');
            // Check if token exists and is not expired
            if (!token || isTokenExpired(token)) {
                alert('Session expired. Please log in again.');
                window.location.href = '/login';
                return;
            }

            // Fetch admin data if the token is valid
            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch admin data');
            }

            const data = await response.json();

            if (!data.user.adminTag) {
                throw new Error('You do not have admin privileges');
            }

            setUserData(data.user);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login page after error
            }, 3000); // Redirect user after 3 seconds
        }
    };

    onMount(() => {
        fetchAdminData();
    });
    
    return (
        <main className={`${styles.authFormWrapper} container`}>
            <div className={`${styles.authFormCard} card mx-auto m-2 p-5`}>
                <h1>Admin Dashboard</h1>
                {userData() ? (
                    <div className="mt-4">
                        <h2>{`${userData().firstName}${userData().lastName}`}</h2>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        <div className="mt-4">
                            <h3>Admin Actions</h3>
                            <div className="d-flex flex-column gap-2">
                                <button className="btn btn-primary" onClick={() => console.log('View Users')}>View Users</button>
                                <button className="btn btn-secondary" onClick={() => console.log('Manage Roles')}>Manage Roles</button>
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