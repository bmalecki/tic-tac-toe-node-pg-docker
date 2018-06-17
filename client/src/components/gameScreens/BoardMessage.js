import React from 'react';
import PropTypes from 'prop-types';

const BoardMessage = ({ text }) => (
  <h1>
    {text}
  </h1>
);

BoardMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BoardMessage;
