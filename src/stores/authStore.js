import { createSignal } from "solid-js";

// Load initial state from localStorage
const token = localStorage.getItem('token');
const user = token ? JSON.parse(localStorage.getItem('user')) : null;

const [authState, setAuthState] = createSignal({
    isAuthenticated: !!token,
    user,
    token,
});

const updateAuthState = (newState) => {
    setAuthState(newState);
    if (newState.token) {
        localStorage.setItem('token', newState.token); // Store the token in local storage
        localStorage.setItem('user', JSON.stringify(newState.user)); // Store full user data
    } else {
        localStorage.removeItem('token'); // Clear token if user logs out
        localStorage.removeItem('user');  // Clear user data if user logs out
    }
};

export {authState, updateAuthState};