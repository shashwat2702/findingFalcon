import React, { Component, Fragment } from 'react';
import './App.scss';
import { getData, postData } from '../../utils/apiCalls';
import {
  getPlanet, getVehicles, getToken, findFalcon,
} from '../../constants/apiUrls';
import SearchDetails from '../SearchDetails/SearchDetails';
import Button from '../shared/Button/Button';

export default class App extends Component {
  state={
    planets: [],
    vehicles: [],
    selectedPlanets: ['', '', '', ''],
    selectedVehicles: ['', '', '', ''],
    totalTimeTaken: 0,
    requestToken: '',
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

  onSubmit = async () => {
    const { selectedPlanets, selectedVehicles } = this.state;
    await postData(getToken, '').then(({ data }) => {
      const { token } = data;
      this.setState({ requestToken: token });
    });
    const { requestToken } = this.state;
    const requestBody = {
      token: requestToken,
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };
    postData(findFalcon, requestBody).then(console.log);
  };

  render() {
    const { totalTimeTaken, selectedVehicles } = this.state;
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
          {(totalTimeTaken === 0) ? '  Hour' : '  Hours'}
        </h2>
        <div className="findButton">
          <Button
            label="Find Falcon!"
            onClick={this.onSubmit}
            disabled={selectedVehicles.includes('')}
          />
        </div>
      </Fragment>
    );
  }
}
