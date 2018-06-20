import React, {Component} from 'react'
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import QuestionBlock from '../components/QuestionBlock';

const styles = {
  background: {backgroundColor: '#f1f1f1', minHeight: '100%', padding: '10px'},
  bg: {position: 'absolute', top: 0, bottom:0, left:0, right:0, zIndex:-1, height: '100%'}
};

class Home extends Component {

  render() {
    return (
    <div>
      <Row className="show-grid">
        <Col md={8} mdOffset={2} style={styles.bg}>
          <QuestionBlock/>
        </Col>
      </Row>
    </div>
    );
  }
}

Home.propTypes = {

};

const mapStateToProps = () => ({});

function mapDispatchToProps() {
  return ({});
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
