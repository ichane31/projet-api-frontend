import React , {useState} from 'react';
import '../../css/Comments/Comments.css';
import { InputTextarea } from 'primereact/inputtextarea';
import { Editor } from 'primereact/editor';

const CommentForm = ({
    handleSubmit,
    submitLabel,
    initialText = "",
}) => {
    const [comment , setComment ] = useState(initialText);
    const isTextareaDisabled  = comment.length === 0;
    const [hasCancelButton , setHasCancelButton ] = useState(false);
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(comment)
        setComment('');

      };
    const handleCancel = () => {
        setComment('')
        // setHasCancelButton(true)
    }
  return (
    <>
    <form onSubmit={onSubmit}>
       <InputTextarea
        className="comment-form-textarea fs-7"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="ecrire un commentaire"
        />
        <button className="comment-form-button mt-5 bg-success" disabled={isTextareaDisabled}>
        {submitLabel}
        </button>
        {  !hasCancelButton && (
        <button
            type="button"
            className="comment-form-button comment-form-cancel-button bg-gray text-black-700 "
            disabled={isTextareaDisabled}
            onClick={handleCancel}
        >
            Annuler
        </button>
        )}
  </form>
  </>
  )
}

export default CommentForm;
