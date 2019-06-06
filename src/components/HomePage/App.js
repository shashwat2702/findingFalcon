import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.scss';
import { getData, postData } from '../../utils/apiCalls';
import { findIndexOfVehicle, findIndexOfPlanet } from '../../utils/helperFunction';
import {
  getPlanet, getVehicles, getToken, findFalcon,
} from '../../constants/apiUrls';
import SearchDetails from '../SearchDetails/SearchDetails';
import Button from '../shared/Button/Button';

export class App extends Component {
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
        const indexOfVehicle = findIndexOfVehicle(vehicles, selectedvehicle);
        const indexOfPlanet = findIndexOfPlanet(planets, selectedPlanets, index);
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
    const { requestToken, totalTimeTaken } = this.state;
    const { history } = this.props;
    const requestBody = {
      token: requestToken,
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };
    postData(findFalcon, requestBody).then((response) => {
      const { data, status } = response;
      if (status === 200) {
        history.push({
          pathname: '/result',
          state: {
            key: data,
            timeTaken: totalTimeTaken,
          },
        });
      }
    });
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
App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
export default withRouter(App);
