import {fromJS} from 'immutable';

const initialState = fromJS({
  questions: [{
    id     : 1,
    title  : 'Question 1',
    text   : 'Who was a famous scientist?',
    answers: [{
      id  : 1,
      text: 'James'
    }, {
      id  : 2,
      text: 'John'
    }, {
      id  : 3,
      text: 'Jim'
    }]
  }, {
    id     : 2,
    title  : 'Question 2',
    text   : 'Who first traveled around the sun?',
    answers: [{
      id  : 4,
      text: 'Sergio'
    }, {
      id  : 5,
      text: 'Michael'
    }, {
      id  : 6,
      text: 'Julie'
    },]
  }]
});

/**
 * Retrieve question being operated upon
 * @param state
 * @param action
 * @returns {*}
 */
function getQuestion(state, action) {
  return state.get('questions').filter(question => question.get('id') === action.questionId);
}

/**
 * Retrieve answer being operated upon
 * @param question
 * @returns {*}
 */
function getAnswers(question) {
  return question.getIn([0, 'answers']);
}

/**
 * Get index of answer
 * @param answers
 * @param action
 * @returns {*}
 */
function getAnswerIndex(answers, action) {
  return answers.findIndex(element => element.get('id') === action.answerId);
}

/**
 * Modify the question state
 * @param state
 * @param action
 * @param arrangedAnswers
 * @returns {*}
 */
function modifyQuestionState(state, action, arrangedAnswers) {
  return state.get('questions').map(question => {
    if (question.get('id') === action.questionId) {
      question = question.set('answers', arrangedAnswers);
    }
    return question;
  });
}

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_ANSWER':
      const question = getQuestion(state, action);
      const answers   = getAnswers(question);
      const index = getAnswerIndex(answers, action);
      const nextIndex = action.direction ? index - 1 : index + 1;
      const answer          = answers.get(index);
      // Move the answer to the proper index
      const arrangedAnswers = answers.delete(index).insert(nextIndex, answer);

      const finalState = modifyQuestionState(state, action, arrangedAnswers);
      return state.set('questions', finalState);
    case 'REMOVE_ANSWER':
      const dQuestions = getQuestion(state, action);
      const dAnswers   = getAnswers(dQuestions);
      const dIndex = getAnswerIndex(dAnswers, action);
      const updatedAnswers = dAnswers.delete(dIndex);
      const removedQuestionState = modifyQuestionState(state, action, updatedAnswers);
      return state.set('questions', removedQuestionState);
    default:
      return state
  }
};

/**
 * Reorder answer
 * @param up True is moving up, false if down
 * @param questionId
 * @param answerId
 * @returns {{type: string, direction: boolean, questionId: *, answerId: *}}
 */
export function reorderAnswer(up = true, questionId, answerId) {
  return {
    type     : 'MOVE_ANSWER',
    direction: up,
    questionId,
    answerId
  };
}

/**
 * Remove answer
 * @param questionId
 * @param answerId
 * @returns {{type: string, direction: *, questionId: *, answerId: *}}
 */
export function removeAnswer(questionId, answerId) {
  return {
    type: 'REMOVE_ANSWER',
    questionId,
    answerId
  };
}

export default questionReducer
