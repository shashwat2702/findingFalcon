/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchDetails.scss';
import DropDown from '../shared/DropDown/DropDown';
import RadioButton from '../shared/RadioButton/RadioButton';

export default class SearchDetails extends Component {
  state={
    showVehicles: false,
  }

  changeVisibilityOfVehicles = (event) => {
    const { target } = event;
    const { value } = target;
    if (value === 'Select One') {
      this.setState({ showVehicles: false });
    } else {
      this.setState({ showVehicles: true });
    }
  }

  render() {
    const { planets, vehicles, planetNumber } = this.props;
    const { showVehicles } = this.state;
    return (
      <div className="planetDropDown">
        <h3>
    Planet
          {' '}
          {planetNumber}
        </h3>
        <DropDown
          planets={planets}
          onChange={this.changeVisibilityOfVehicles}
        />
        {showVehicles
          && <RadioButton vehicles={vehicles} />
        }
      </div>
    );
  }
}

SearchDetails.propTypes = {
  planets: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  planetNumber: PropTypes.number.isRequired,
};
