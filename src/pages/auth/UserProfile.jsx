import { createSignal, onMount } from 'solid-js';

import styles from '../css/auth/AuthForm.module.css';

function UserProfile() {
    const [userData, setUserData] = createSignal(null);
    const [error, setError] = createSignal('');

    const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime; // Check if the token is expired
    };

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            // Check if token exists and is not expired
            if (!token || isTokenExpired(token)) {
                alert('Session expired. Please log in again.');
                window.location.href = '/login';
                return;
            }

            // Fetch user profile data if the token is valid
            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const data = await response.json();
            setUserData(data.user);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
    };

    onMount(() => {
        fetchUserProfile();
    });
    
    return (
        <main className={`${styles.authFormWrapper} container`}>
            <div className={`${styles.authFormCard} card mx-auto m-2 p-5`}>
                <h1>Your Profile</h1>
                {userData() ? (
                    <div className="mt-4">
                        <h2>{`${userData().firstName} ${userData().lastName}`}</h2>
                        <p>Email: {userData().email}</p>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        {error() && <div className="alert alert-danger">{error()}</div>}
                        <div className="alert alert-danger">Loading...</div>
                    </>
                )}
            </div>
        </main>
    );
}

export default UserProfile;