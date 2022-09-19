import React , {useState} from 'react';

const DeleteModal = (commentDelete , setDeleting ,setDeleteModalState ) => {
  

  const hideDeleteCommentDialog  = () => {
    setDeleting(false);
    setDeleteModalState(false)
  };

  const deleteComment = () => {
    commentDelete();
    setDeleteModalState(false);
  };

  return (
  
    <div className="delete-confirmation-wrapper">
    <div className="delete-container">
      <div className="title">Delete comment</div>
      <div className="confirmation-message">
      <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </div>
      <div className="btn-container">
        <button className="cancel-btn" icon="pi pi-times" onClick={hideDeleteCommentDialog}>
          Non, annuler
        </button>

        <button className="delete-btn" icon="pi pi-check" onClick={deleteComment}>
          Oui, supprimer
        </button>
      </div>
    </div>
  </div>

  )
}

export default DeleteModal
