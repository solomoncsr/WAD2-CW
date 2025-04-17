import styles from './css/Footer.module.css';

function Footer() {
    return (
        <footer className={`${styles.footer} text-center text-lg-start bg-light text-muted`}>
            <div className="container-fluid p-4">
                <section className="mb-4">
                    <a href="#" className="btn btn-outline-primary btn-floating m-1" role="button">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="btn btn-outline-primary btn-floating m-1" role="button">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="btn btn-outline-primary btn-floating m-1" role="button">
                        <i className="fab fa-instagram"></i>
                    </a>
                </section>
            </div>

            <div className={`${styles.footerText} text-center p-3`}>
                © 2025 Edinburgh School of Dance | All Rights Reserved
            </div>
        </footer>
    );
}

export default Footer;