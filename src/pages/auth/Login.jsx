import styles from '../css/auth/AuthForm.module.css';

function Login() {
    return (
        <main className={`${styles.authFormWrapper} container`}>
            <div className={`${styles.authFormCard} card mx-auto m-2 p-5`}>
                <h1>Login</h1>
                <form className="mx-auto w-75 mt-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>    
        </main>
    );
}

export default Login;