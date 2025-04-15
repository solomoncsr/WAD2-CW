import styles from './css/Home.module.css';

import video from '../assets/videos/home.mp4';
import ballet from '../assets/images/ballet.jpg';
import breakdance from '../assets/images/breakdance.jpg';
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
                        <h1 className={`${styles.titleText} display-6`}>Welcome to the Edinburgh School of Dance!</h1>
                        <p className={`${styles.titleSubtext} lead`}>
                            At the Edinburgh School of Dance, we believe that dance is for everyone.
                            Whether you're taking your first steps or you're an experienced dancer, we have something for everyone.
                            From ballet and ballroom to contemporary and hip-hop, our experienced instructors are here to help you achieve your goals.
                        </p>
                    </div>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12 p-5">
                        <h1 className={`${styles.subtitle} roboto-bold`}>Join Our Dance Family Today</h1>
                        <p className="lead mt-3" style={{ "text-align": "justify", "font-weight": "400" }}>
                            Unlock access to tailored dance classes, expert instructors, exclusive member benefits
                            and a vibrant community of fellow dancers. Whether you're a beginner or an experienced dancer, we have something for everyone.
                        </p>
                        <div className="pt-3">
                            <a type="button" className={`${styles.standardButton} btn btn-primary`} href='/sign-up'><span className="roboto-bold">JOIN TODAY</span></a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <img className={`${styles.displayImg}`} src={laptop} alt="Ballet teacher and student using a laptop" />
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <img className={`${styles.displayImg}`} src={ballet} alt="Ballet teacher and student using a laptop" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 p-5">
                        <h1 className={`${styles.subtitle} roboto-bold`}>Discover Classes for Every Level</h1>
                        <p className="lead mt-3" style={{ "text-align": "justify", "font-weight": "400" }}>
                            Whether you're just beginning or perfecting your technique, our diverse range of classes ensures there’s something for everyone.
                            From casual learners to aspiring professionals, we support every dancer’s journey.
                        </p>
                        <div className="pt-3" style={{ "text-align": "right" }}>
                            <a type="button" className={`${styles.standardButton} btn btn-primary`} href='/catalogue'><span className="roboto-bold">BROWSE CATALOGUE</span></a>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12 p-5">
                        <h1 className={`${styles.subtitle} roboto-bold`}>Learn From Experienced Instructors</h1>
                        <p className="lead mt-3" style={{ "text-align": "justify", "font-weight": "400" }}>
                            Our dedicated team of instructors brings years of professional experience and a passion for teaching.
                            With personalised guidance and a supportive environment, you'll grow in confidence, skill, and creativity.
                        </p>
                        <div className="pt-3">
                            <a type="button" className={`${styles.standardButton} btn btn-primary`} href='/contact'><span className="roboto-bold">CONTACT US</span></a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <img className={`${styles.displayImg}`} src={breakdance} alt="Ballet teacher and student using a laptop" />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;