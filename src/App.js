import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

// WYSWIG CSS
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  )
};

App.propTypes = {
  history: PropTypes.object,
};

export default App
