import React , {useState} from 'react';
import { Editor } from "react-draft-wysiwyg";
import {EditorState , convertToRaw ,ContentState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../css/Comments/Comments.css';
import { InputTextarea } from 'primereact/inputtextarea';
import user from '../../data/user.jpg';
import { convertFromHTML } from 'draft-convert';


const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton= false,
    handleCancel,
    initialText = "",
    image
}) => {
    const [Comment , setComment ] = useState(initialText);
    const isNull = Comment?.length === 0;
    console.log(Comment)
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(Comment)
        setComment('');

      };


    let editorState = null;

    if (initialText.length === 0) {
      editorState = EditorState.createEmpty();
      
    }
    else {
      editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(initialText).contentBlocks)
        )
       }
    
      
    const [text , setText] = useState(editorState);
    const handleEditorChange = (editorState) => {
        setText(editorState)
        // setComment(draftToHtml(convertToRaw(text.getCurrentContent())))
        
    };
    
    
  
  return (
    <>
    <form onSubmit={onSubmit} encType="multipart/form-data" >
        <div className="d-flex">
        <span className="commenter-pic mr-2">
          <img src={user} className=" w-12 h-12 rounded-full mr-5" />
        </span>
      
        <Editor
            editorState={text}
            toolbarClassName="toolbarClass"
            wrapperClassName="card"
            editorClassName="card-body"
            onEditorStateChange={handleEditorChange}
            //toolbarOnFocus
          /> 
          <InputTextarea
            disabled
            style={{display: 'none'}}
            className="comment-form-textarea fs-7"
            ref={(val) =>setComment(val.value)}
            value={draftToHtml(convertToRaw(text.getCurrentContent()))}
            // onChange={(e) => setComment(e.target.value)
            // }
            />
        </div>
       
        <button className="comment-form-button mt-4  bg-success" disabled={isNull}>
        {submitLabel}
        </button>
        {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
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
