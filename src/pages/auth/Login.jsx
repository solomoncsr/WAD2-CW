import { createSignal } from 'solid-js';
import { authState, updateAuthState } from '../../stores/authStore';

import styles from '../css/auth/AuthForm.module.css';

function Login() {
    const [formData, setFormData] = createSignal({
        email: '',
        password: '',
    });
    const [error, setError] = createSignal('');
    const [success, setSuccess] = createSignal('');
    
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData(), [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('Form Data:', formData());

        try {
            const loginResponse = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData()),
            });

            if (!loginResponse.ok) {
                const { error } = await loginResponse.json();
                throw new Error(error);
            }

            const { message, token } = await loginResponse.json();
            localStorage.setItem('token', token); // Store the token in local storage
            
            // Fetch user profile data if the token is valid
            const profileResponse = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!profileResponse.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const userData = await profileResponse.json();

            updateAuthState({ isAuthenticated: true, user: userData.user, token }); // Update the auth state
            console.log('User Data:', authState());

            setSuccess(message);
            setTimeout(() => {
                window.location.href = '/profile'; // Redirect to user profile page
            }, 2000); // Redirect to user profile after 2 seconds
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <main className={`${styles.authFormWrapper} container`}>
            <div className={`${styles.authFormCard} card mx-auto m-2 p-5`}>
                <h1>Login</h1>
                {error() && <div className="alert alert-danger">{error()}</div>}
                {success() && <div className="alert alert-success">{success()}</div>}
                <form className="mx-auto w-75 mt-4" onsubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={formData().email}
                            onInput={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={formData().password}
                            onInput={handleInputChange}
                        />
                    </div>
                    <button type="submit" className={`${styles.standardButton} btn btn-primary w-100`}><span className="roboto-bold">SUBMIT</span></button>
                </form>
            </div>
        </main>
    );
}

export default Login;