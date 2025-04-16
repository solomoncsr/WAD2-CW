import { createSignal, onMount } from 'solid-js';
import { authState } from '../../stores/authStore';

import styles from '../css/auth/AuthForm.module.css';

import ViewUsersModal from '../../components/auth/ViewUsersModal';
import ManageUsersModal from '../../components/auth/ManageRolesModal';
import ManageCoursesModal from '../../components/auth/ManageCoursesModal';
import GenerateReportsModal from '../../components/auth/GenerateReportsModal';

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
                <h1><span className="roboto-bold">Admin Dashboard</span></h1>
                {userData() ? (
                    <div className="mt-4">
                        <h2><span className="roboto-bold">{`${userData().firstName} ${userData().lastName}`}</span></h2>
                        <div className="mt-4">
                            <h3><span className="roboto-bold">Admin Actions</span></h3>
                            <div className="d-flex flex-column gap-2">
                                <button className={`${styles.viewUsersButton} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#viewUsersModal"><span className="roboto-bold" style={{"text-transform": "uppercase"}}>View Users</span></button>
                                <button className={`${styles.manageRolesButton} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#manageRolesModal" disabled={!authState().user.superAdminTag}><span className="roboto-bold"  style={{"text-transform": "uppercase"}}>Manage Users</span></button>
                                <button className={`${styles.manageCoursesButton} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#manageCoursesModal"><span className="roboto-bold" style={{"text-transform": "uppercase"}}>Manage Courses</span></button>
                                <button className={`${styles.generateReportsButton} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#generateReportsModal"><span className="roboto-bold" style={{"text-transform": "uppercase"}}>Generate Report</span></button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {error() && <div className="alert alert-danger"><span className="roboto-bold">{error()}</span></div>}
                    </>
                )}
            </div>
            <ViewUsersModal />
            <ManageUsersModal />
            <ManageCoursesModal />
            <GenerateReportsModal />
        </main>
    );
}

export default Admin;