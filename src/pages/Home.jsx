import styles from './css/Home.module.css';

import video from '../assets/videos/home.mp4';
import laptop from '../assets/images/laptop.jpg';

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
        <main className={`${styles.main}`}>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: 0 }}>
                        {homeVideo()}
                    </div>
                    <div className={`${styles.titleTextContainer} col-lg-6 col-md-6 col-sm-12 position-relative mx-auto px-5`}>
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
                        <p className={`${styles.titleSubtext} lead`}>
                            At the Edinburgh School of Dance, we believe that dance is for everyone.
                            Whether you're taking your first steps or you're an experienced dancer, we have something for everyone.
                            From ballet and ballroom to contemporary and hip-hop, our experienced instructors are here to help you achieve your goals.
                        </p>
                    </div>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1>Join Our Dance Family Today</h1>
                        <p>
                            Unlock access to tailored dance classes, expert instructors, exclusive member benefits
                            and a vibrant community of fellow dancers. Whether you're a beginner or an experienced dancer, we have something for everyone.
                        </p>
                        <button type="button" class="btn btn-primary">JOIN TODAY</button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <img className={`${styles.laptopImg}`} src={laptop} alt="Ballet teacher and student using a laptop" />
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <img className={`${styles.laptopImg}`} src={laptop} alt="Ballet teacher and student using a laptop" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1>Join Our Dance Family Today</h1>
                        <p>
                            Unlock access to tailored dance classes, expert instructors, exclusive member benefits
                            and a vibrant community of fellow dancers. Whether you're a beginner or an experienced dancer, we have something for everyone.
                        </p>
                        <button type="button" class="btn btn-primary">JOIN TODAY</button>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1>Join Our Dance Family Today</h1>
                        <p>
                            Unlock access to tailored dance classes, expert instructors, exclusive member benefits
                            and a vibrant community of fellow dancers. Whether you're a beginner or an experienced dancer, we have something for everyone.
                        </p>
                        <button type="button" class="btn btn-primary">JOIN TODAY</button>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <img className={`${styles.laptopImg}`} src={laptop} alt="Ballet teacher and student using a laptop" />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;