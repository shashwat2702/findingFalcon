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
    totalTimeTaken: 0,
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
    this.getTotalTimeTaken();
  }

  getSearchDetails = () => {
    const {
      planets, vehicles, selectedPlanets, selectedVehicles,
    } = this.state;
    const listOfSearchDetails = selectedPlanets.map((planet, index) => (
      <SearchDetails
        planets={planets}
        selectedPlanets={selectedPlanets}
        vehicles={vehicles}
        planetNumber={index + 1}
        onDropDownChange={this.onDropDownChange}
        onRadioClick={this.onRadioClick}
        selectedVehicles={selectedVehicles}
      />
    ));
    return listOfSearchDetails;
  }

  getTotalTimeTaken = () => {
    const {
      planets, vehicles, selectedPlanets, selectedVehicles,
    } = this.state;
    let totalTime = 0;
    selectedVehicles.forEach((selectedvehicle, index) => {
      if (selectedvehicle !== '') {
        const indexOfVehicle = vehicles.findIndex((vehicle) => {
          if (vehicle.name === selectedvehicle) {
            return true;
          }
          return false;
        });
        const indexOfPlanet = planets.findIndex((planet) => {
          if (planet.name === selectedPlanets[index]) {
            return true;
          }
          return false;
        });
        totalTime += (planets[indexOfPlanet].distance / vehicles[indexOfVehicle].speed);
      }
    });
    this.setState({ totalTimeTaken: totalTime });
  }

  render() {
    const { totalTimeTaken } = this.state;
    return (
      <Fragment>
        <h1>Finding Falcon</h1>
        <h2>Please Select the planets where you want to send the army:</h2>
        <div className="listOfDropDown">
          {this.getSearchDetails()}
        </div>
        <h2>
Time Taken:
          {' '}
          {totalTimeTaken}
        </h2>
      </Fragment>
    );
  }
}
