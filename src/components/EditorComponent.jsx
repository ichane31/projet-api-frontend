import { Editor } from "react-draft-wysiwyg";
import React , {useState} from 'react'
import {EditorState , convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../css/Editor.css';

const EditorComponent = ({getContent}) => {

  const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

  const handleEditorChange = (state) => {
      setEditorState(state);
      sendContent();
  };

  const sendContent = () => {
    getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
};

  return (
    <div className='editorComp'>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClass"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorChange}
      />  
    </div>
  )
}

export default EditorComponent
