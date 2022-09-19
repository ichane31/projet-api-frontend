import React , {useState} from 'react';
import { InputText } from 'primereact/inputtext';
import userImage from '../../data/user.jpg'

const NoteForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialNote = 0.00,
    image
}) => {
    const [note , setNote ] = useState(initialNote);
    const isInputDisabled  = note <= initialNote;

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(note)
        setNote('');

      };
      const url = 'https://projet-apis.herokuapp.com/api/v1/file';
  return (
    <>
    <form onSubmit={onSubmit}  encType="multipart/form-data">
        <div className="d-flex ">
        <span className='mr-2'>
        {image?
        <img src={`${url}/${image}`} alt="" className='w-12 h-11 rounded-full'/>:
        <img src={userImage} alt="" className='w-12 h-11 rounded-full'/>}
       </span>

        <InputText
        type="number"
        min="0"
        max="20"
        step="0.25"
        className="note-form-input py-2 "
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="attribuez une note"
        />
        </div>
        <button className="comment-form-button mt-4 ml-5 mb-4" disabled={isInputDisabled}>
        {submitLabel}
        </button>
        {hasCancelButton && (
        <button
            type="button"
            className="comment-form-button comment-form-cancel-button mb-4"
            onClick={handleCancel}
        >
            Annuler
        </button>
        )}
  </form>
  </>
  )
}

export default NoteForm
