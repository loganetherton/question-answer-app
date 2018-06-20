import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';

import QuestionAnswerEditor from './QuestionAnswerEditor';
import Title from './Title';
import Answer from './Answer';

const styles = {
  border: {border: '1px solid'},
  mt30: {marginTop: '30px'}
};

class Question extends Component {

  constructor(props) {
    super();

    this.onEditorStateChange = ::this.onEditorStateChange;
    this.arrangeAnswers = ::this.arrangeAnswers;

    this.state = {
      editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(`<p>${props.question.text}</p>`))),
    };
  }

  /**
   * Handle editor text change
   * @param editorState
   */
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  /**
   * Arrange answers in proper order
   * @param answers
   * @returns {*}
   */
  arrangeAnswers(answers) {
    const {question} = this.props;
    return answers.map(
    (answer, index) => <Answer key={index} item={index} content={answer.text} questionId={question.id} answerId={answer.id}
                               position={index} length={answers.length}/>)
  }

  render() {
    const {editorState} = this.state;
    const {question} = this.props;
    return (
    <div>
      <Title text={question.title}/>
      <QuestionAnswerEditor editorState={editorState} style={styles.border}
                            onEditorStateChange={this.onEditorStateChange}/>
      <Title text="Answers"/>
      {this.arrangeAnswers(question.answers)}
    </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object
};

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  questions: state.questions.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(Question)
