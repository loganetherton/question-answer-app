import React from 'react'

const styles = {
  title: {fontSize: '30px'},
};

const Title = (props) => <p style={Object.assign(styles.title, props.importedStyle || {})}>{props.text}</p>;

export default Title
