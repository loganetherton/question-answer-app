import React from 'react'
import { Editor } from 'react-draft-wysiwyg';

const QuestionAnswerEditor = (props) => (
<div style={props.topStyle}>
  <Editor
  editorState={props.editorState}
  wrapperStyle={props.style}
  onEditorStateChange={props.onEditorStateChange}
  toolbar={{
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
  }}
  />
</div>
);

export default QuestionAnswerEditor
