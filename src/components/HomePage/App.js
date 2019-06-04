import React, { Component, Fragment } from 'react';
import './App.scss';
import { getData } from '../../utils/apiCalls';
import { getPlanet, getVehicles } from '../../constants/apiUrls';
import SearchDetails from '../SearchDetails/SearchDetails';

export default class App extends Component {
  state={
    planets: [],
    vehicles: [],
    selectedPlanets: ['', '', '', ''],
    selectedVehicles: ['', '', '', ''],
  }

  componentDidMount() {
    getData(getPlanet).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({ planets: data });
      }
    });
    getData(getVehicles).then((response) => {
      if (response.status === 200) {
        const { data } = response;
        this.setState({ vehicles: data });
      }
    });
  }

  onDropDownChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    const { selectedPlanets } = this.state;
    selectedPlanets[Number(name) - 1] = value;
    this.setState({ selectedPlanets });
  }

  onRadioClick = (event) => {
    const { target } = event;
    const { name, value } = target;
    const vehicleIndex = name.substring(7);
    const { selectedVehicles } = this.state;
    selectedVehicles[Number(vehicleIndex) - 1] = value;
    this.setState({ selectedVehicles });
  }

  render() {
    const {
      planets, vehicles, selectedPlanets, selectedVehicles,
    } = this.state;
    return (
      <Fragment>
        <h1>Finding Falcon</h1>
        <h2>Please Select the planets where you want to send the army:</h2>
        <div className="listOfDropDown">
          <SearchDetails
            planets={planets}
            selectedPlanets={selectedPlanets}
            vehicles={vehicles}
            planetNumber={1}
            onDropDownChange={this.onDropDownChange}
            onRadioClick={this.onRadioClick}
            selectedVehicles={selectedVehicles}
          />
          <SearchDetails
            planets={planets}
            selectedPlanets={selectedPlanets}
            vehicles={vehicles}
            planetNumber={2}
            onDropDownChange={this.onDropDownChange}
            onRadioClick={this.onRadioClick}
            selectedVehicles={selectedVehicles}
          />
          <SearchDetails
            planets={planets}
            selectedPlanets={selectedPlanets}
            vehicles={vehicles}
            planetNumber={3}
            onDropDownChange={this.onDropDownChange}
            onRadioClick={this.onRadioClick}
            selectedVehicles={selectedVehicles}
          />
          <SearchDetails
            planets={planets}
            selectedPlanets={selectedPlanets}
            vehicles={vehicles}
            planetNumber={4}
            onDropDownChange={this.onDropDownChange}
            onRadioClick={this.onRadioClick}
            selectedVehicles={selectedVehicles}
          />
        </div>
      </Fragment>
    );
  }
}
