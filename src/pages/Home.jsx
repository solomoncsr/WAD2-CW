import styles from './css/Home.module.css';

import video from '../assets/videos/home.mp4';

function Home() {

    const homeVideo = () => {
        return (
            <video className={`${styles.homeVideo}`} width="100%" autoplay muted loop>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    return (
        <main className={`${styles.main} m-auto`}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        {homeVideo()}
                    </div>
                    <div className={`${styles.titleTextContainer} col-lg-6 col-md-6 col-sm-12 text-center position-relative`}>
                        <svg
                          width="100%"
                          height="100%"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: -1,
                          }}
                        >
                          <rect width="100%" height="100%" fill="#f0f0f0" />
                        </svg>
                        <h1 className={`${styles.titleText} display-6`}>Welcome to the Edinburgh School of Dance!</h1>
                        <p className={`${styles.titleSubtext} lead mt-5 pt-5`}>
                            At the Edinburgh School of Dance, we believe that dance is for everyone.
                            Whether you're taking your first steps or you're an experienced dancer, we have something for everyone.
                            From ballet and ballroom to contemporary and hip-hop, our experienced instructors are here to help you achieve your goals.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;