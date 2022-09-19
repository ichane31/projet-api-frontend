import React from 'react';
import NoteForm from './NoteForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import userImage from '../../data/user.jpg';


const Note = ({
    note , 
    setActiveNote ,
    activeNote,
    updateNote ,
    deleteNote,
    currentUserId,
    image
}) => {
    const isEditing = activeNote && activeNote.id === note.id &&
    activeNote.type ==="editing";

    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(note.createdAt) > fiveMinutes;
    const canDelete =
       currentUserId === note.user?.id && !timePassed;

    const canEdit = currentUserId === note.user?.id ;
    const createdAt  = new Date(note.createdAt).toLocaleDateString();
    const url = 'https://projet-apis.herokuapp.com/api/v1/file';
    

  return (
    <div key={note.id} className="comment">
      <div className="comment-image-container">
        {note.user?.image ?
        <img src={`${url}/${user.image}`} className="w-12 h-12 mr-3 rounded-full" />:
        <img src={userImage} className="w-12 h-12 mr-3 rounded-full" />}
      
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{`${note?.user?.firstname} ${note?.user?.lastname}`} </div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{note.value}</div>}
        {isEditing && (
          <NoteForm
            submitLabel="Modifier"
            hasCancelButton
            initialNote={note.value}
            handleSubmit={(value) => updateNote(note.id, value)}
            handleCancel={() => {
              setActiveNote(null);
            }}
            image={image}
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
              Modifier
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteNote(note.id)}
            >
              Supprimer
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Note;
