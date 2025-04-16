function ManageUsersModal () {
    return (
        <div className="modal fade" id="manageUsersModal" tabIndex="-1" aria-labelledby="manageUsersModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="manageUsersModalLabel">Manage users</h5>
                    </div>
                    <div className="modal-body">
                        {/* Modal body content for managing users goes here */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageUsersModal;