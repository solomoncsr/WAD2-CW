import { createSignal, onMount } from 'solid-js';

import styles from '../css/auth/AuthForm.module.css';

function UserProfile() {
    const [userData, setUserData] = createSignal(null);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
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
            console.error(error.message);
        }
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
                    </div>
                ) : (
                    <div className="alert alert-danger">Loading...</div>
                )}
            </div>
        </main>
    );
}

export default UserProfile;