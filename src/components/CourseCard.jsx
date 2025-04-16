import styles from './css/CourseCard.module.css';

function CourseCard(props) {
    return (
        <div className={`col-sm-12 col-md-12 col-lg-6 p-2`}>
            <div className={`${styles.courseCard} card mx-auto`}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text">Instructor: {props.instructor}</p>
                    <p className="card-text">Schedule: {props.schedule}</p>
                    <p className="card-text">Price: £{props.price}</p>
                    <p><strong>Capacity:</strong> {props.enrolledUsers.length}/{props.capacity}</p>
                    <a type="button" className={`${styles.standardButton} btn btn-primary w-100 mt-5`} href={`/course/${props.id}`}><span className="roboto-bold">VIEW COURSE</span></a>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;