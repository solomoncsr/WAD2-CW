import { createSignal } from "solid-js";

// Load initial state from localStorage
const token = localStorage.getItem('token');
const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

const [authState, setAuthState] = createSignal({
    isAuthenticated: false,
    user,
    token,
});

export {authState, setAuthState};