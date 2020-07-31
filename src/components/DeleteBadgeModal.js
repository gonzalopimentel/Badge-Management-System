import React from "react";

import Modal from "./Modal";

function DeleteBadgeModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      {/* Modal's props */}
      <div className="DeleteBadgeModal ml-3">
        <h1>Are You Sure?</h1>
        <p>You are about to delete this badge!</p>

        <div>
          <button onClick={props.onDeleteBadge} className="btn btn-danger mr-4">
            Delete
          </button>

          {/* props.onClose comes from BadgeDetails */}
          <button onClick={props.onClose} className="btn btn-primary">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBadgeModal;
