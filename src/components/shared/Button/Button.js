import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, label, disabled }) => (
  <button
    className="editTaskButton"
    type="submit"
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
export default Button;
