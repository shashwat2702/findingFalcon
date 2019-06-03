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

  onChange = (event) => {
    const { onDropDownChange } = this.props;
    onDropDownChange(event);
    this.changeVisibilityOfVehicles(event);
  }

  render() {
    const {
      planets, vehicles, planetNumber, selectedPlanets, onRadioClick,
    } = this.props;
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
          selectedPlanets={selectedPlanets}
          onChange={this.onChange}
          name={planetNumber}
        />
        {showVehicles
          && (
          <RadioButton
            vehicles={vehicles}
            onRadioClick={onRadioClick}
            planetNumber={planetNumber}
          />
          )
        }
      </div>
    );
  }
}

SearchDetails.propTypes = {
  planets: PropTypes.array.isRequired,
  selectedPlanets: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  planetNumber: PropTypes.number.isRequired,
  onDropDownChange: PropTypes.func.isRequired,
  onRadioClick: PropTypes.func.isRequired,
};
