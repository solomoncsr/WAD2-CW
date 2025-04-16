function SystemSettingsModal () {
    return (
        <div className="modal fade" id="systemSettingsModal" tabIndex="-1" aria-labelledby="systemSettingsModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="systemSettingsModalLabel">System settings</h5>
                    </div>
                    <div className="modal-body">
                        {/* Modal body content goes here */}
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

export default SystemSettingsModal;