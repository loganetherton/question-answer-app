import React, {Component} from 'react';

import Question from './Question';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class QuestionBlock extends Component {

  render() {
    const {questions} = this.props;
    return (
    <div>
      {questions.questions.map((question, index) => <Question question={question} key={index}/>)}
    </div>
    );
  }
}

QuestionBlock.propTypes = {
  questions: PropTypes.object
};

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  questions: state.questions.toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionBlock)
