import React, {Component} from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import FA from 'react-fontawesome';
import Button from 'react-bootstrap/lib/Button';

import QuestionAnswerEditor from './QuestionAnswerEditor';
import {reorderAnswer, removeAnswer} from '../reducers/question';

const styles = {
  border: {border: '1px solid'},
  mt30: {marginTop: '30px'},
  answerRow: {backgroundColor:'#ffd9d9', minWidth: '100%', minHeight: '5px'},
  faCircle: {
    display     : 'inline-block',
    borderRadius: '20px',
    boxShadow   : '0px 0px 2px #888',
    padding     : '0.1em 0.2em',
    marginRight: '0.5em',
    cursor: 'pointer'
  }
};

class Question extends Component {

  constructor(props) {
    super();

    this.markAsCorrect = ::this.markAsCorrect;
    this.onEditorStateChange = ::this.onEditorStateChange;
    this.onFeedBackStateChange = ::this.onFeedBackStateChange;
    this.reoderQuestionDown = ::this.reoderQuestion.bind(this, false);
    this.reoderQuestionUp = ::this.reoderQuestion.bind(this, true);
    this.removeAnswer = ::this.removeAnswer;

    // Move question up or down
    this.moveUp = props.reorderAnswer.bind(this, true);
    this.moveDown = props.reorderAnswer.bind(this, false);

    this.state = {
      editorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(`<p>${props.content}</p>`))),
      feedBackEditorState: EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(`<p>Feedback</p>`))),
    };
  }

  /**
   * I hate to do this, but draft.js won't play nicely with re-rendering otherwise
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const content = this.props.content;
    const nextContent = nextProps.content;
    if (content !== nextContent) {
      const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(nextContent));
      this.setState({ editorState });
    }
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
   * Handle feedback state change
   * @param editorState
   */
  onFeedBackStateChange = (editorState) => {
    this.setState({
      feedBackEditorState: editorState,
    });
  };

  /**
   * Change position of answer
   * @param up
   */
  reoderQuestion(up = true) {
    const {questionId, answerId} = this.props;
    up ? this.moveUp(questionId, answerId) : this.moveDown(questionId, answerId);
  }

  /**
   * Remove an answer
   */
  removeAnswer() {
    const {questionId, answerId, removeAnswer} = this.props;
    removeAnswer(questionId, answerId);
  }

  /**
   * Create font-awesome icon if necessary
   * @param position
   * @param icon
   * @param up
   * @returns {*}
   */
  createFaIcon(position, icon, up = true) {
    if (!position && icon === 'angle-up') {
      return <span/>;
    }
    return (<FA
    name={icon}
    size="2x"
    style={styles.faCircle}
    onClick={up ? this.reoderQuestionUp : this.reoderQuestionDown}
    />);
  }

  markAsCorrect() {

  }

  render() {
    const {editorState, feedBackEditorState} = this.state;
    const {position, length} = this.props;
    return (
    <div>
      <div style={styles.answerRow} >
        {this.createFaIcon(position, 'angle-up')}
        {position !== length - 1 ? this.createFaIcon(position, 'angle-down', false) : <span/>}
        <FA
        name="times"
        size="2x"
        style={styles.faCircle}
        onClick={this.removeAnswer}
        />
        <div style={styles.answerRow}><Button onClick={this.markAsCorrect} bsStyle="info">Mark as Correct</Button></div>
      </div>
      <QuestionAnswerEditor editorState={editorState} style={styles.border}
                            onEditorStateChange={this.onEditorStateChange}/>
      <QuestionAnswerEditor editorState={feedBackEditorState} style={styles.border}
                            onEditorStateChange={this.onFeedBackStateChange}/>
    </div>
    );
  }
}

Question.propTypes = {
  content: PropTypes.string,
  questionId: PropTypes.number,
  answerId: PropTypes.number,
  position: PropTypes.number,
  length: PropTypes.number,
  item: PropTypes.number
};

const mapDispatchToProps = {
  reorderAnswer,
  removeAnswer
};

const mapStateToProps = (state) => ({
  questions: state.questions.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(Question)
