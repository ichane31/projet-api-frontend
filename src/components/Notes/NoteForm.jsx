import React , {useState} from 'react';
import { InputText } from 'primereact/inputtext';

const NoteForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = false,
    handleCancel,
    initialNote = 0.00,
}) => {
    const [note , setNote ] = useState(initialNote);
    const isInputDisabled  = note <= initialNote;

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(note)
        setNote('');

      };
  return (
    <>
    <form onSubmit={onSubmit}>
        <InputText
        type="number"
        min="0"
        max="20"
        step="0.25"
        className="note-form-input py-2"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="attribuez une note"
        />
        <button className="comment-form-button mt-4" disabled={isInputDisabled}>
        {submitLabel}
        </button>
        {hasCancelButton && (
        <button
            type="button"
            className="comment-form-button comment-form-cancel-button"
            onClick={handleCancel}
        >
            Cancel
        </button>
        )}
  </form>
  </>
  )
}

export default NoteForm
