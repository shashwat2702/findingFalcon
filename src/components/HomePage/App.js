import React, { Component, Fragment } from 'react';
import './App.scss';
import { getData } from '../../utils/apiCalls';
import { getPlanet, getVehicles } from '../../constants/apiUrls';
import SearchDetails from '../SearchDetails/SearchDetails';

export default class App extends Component {
  state={
    planets: [],
    vehicles: [],
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

  render() {
    const { planets, vehicles } = this.state;
    return (
      <Fragment>
        <h1>Finding Falcon</h1>
        <h2>Please Select the planets where you want to send the army:</h2>
        <div className="listOfDropDown">
          <SearchDetails
            planets={planets}
            vehicles={vehicles}
            planetNumber={1}
          />
          <SearchDetails
            planets={planets}
            vehicles={vehicles}
            planetNumber={2}
          />
          <SearchDetails
            planets={planets}
            vehicles={vehicles}
            planetNumber={3}
          />
          <SearchDetails
            planets={planets}
            vehicles={vehicles}
            planetNumber={4}
          />
        </div>
      </Fragment>
    );
  }
}
