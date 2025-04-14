function CourseCard(props) {
    return (
        <div class="col-sm-12 col-md-6 col-lg-4 p-2">
            <div class="card mx-auto" style="width: 22rem;">
                <div class="card-body">
                    <h5 class="card-title">{`${props.title}`}</h5>
                    <p class="card-text">{`${props.description}`}</p>
                    <a type="button" class="btn btn-primary mt-3 roboto-bold" style="background-color: #e75caf; color: white; border-color: #e75caf; width:100%;"><span class="roboto-medium">ENTER NOW</span></a>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;