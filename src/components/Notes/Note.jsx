import React from 'react';
import NoteForm from './NoteForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const Note = ({
    note , 
    setActiveNote ,
    activeNote,
    updateNote ,
    deleteNote,
    currentUserId,
}) => {
    const isEditing = activeNote && activeNote.id === note.id &&
    activeNote.type ==="editing";

    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(note.createdAt) > fiveMinutes;
    const canDelete =
       currentUserId === note.author.id && !timePassed;

    const canEdit = currentUserId === note.author.id && !timePassed;
    const createdAt  = new Date(note.createdAt).toLocaleDateString();
    

  return (
    <div key={note.id} className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{note.author.firstname} </div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{note.value}</div>}
        {isEditing && (
          <NoteForm
            submitLabel="Update"
            hasCancelButton
            initialNote={note.value}
            handleSubmit={(value) => updateNote(note.id, value)}
            handleCancel={() => {
              setActiveNote(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveNote({ id: note.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Note;
