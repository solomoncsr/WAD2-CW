import styles from './css/Home.module.css';

import video from '../assets/videos/home.mp4';

function Home() {

    const homeVideo = () => {
        return (
            <video width="100%" controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    return (
        <main className={`${styles.main} m-auto`}>
            <div className="container-fluid">
                {homeVideo()}
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 text-center">
                        <h1 className="display-4">Welcome to the Edinburgh School of Dance!</h1>
                        <p className="lead">
                            At the Edinburgh School of Dance, we believe that dance is for everyone.
                            Whether you're taking your first steps or you're an experienced dancer, we have something for everyone.
                            Based in the heart of Scotland's capital, we offer a wide range of classes and workshops for all ages and abilities.
                            From ballet and ballroom to contemporary and hip-hop, our experienced instructors are here to help you achieve your goals.
                            Join us for a fun and friendly environment where you can learn, grow, and express yourself through dance.
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 text-center">
                        <h2 className="display-4">Upcoming Classes</h2>
                        <p>Check out our latest classes and workshops.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;