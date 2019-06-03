import React, { Component, Fragment } from 'react';
import './App.scss';
import { getData } from '../../utils/apiCalls';
import { getPlanet, getVehicles } from '../../constants/apiUrls';
import DropDown from '../shared/DropDown/DropDown';
import RadioButton from '../shared/RadioButton/RadioButton';

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
          <div className="planetDropDown">
            <h3>Planet 1</h3>
            <DropDown planets={planets} />
            <RadioButton vehicles={vehicles} />
          </div>
          <div className="planetDropDown">
            <h3>Planet 2</h3>
            <DropDown planets={planets} />
            <RadioButton vehicles={vehicles} />
          </div>
          <div className="planetDropDown">
            <h3>Planet 3</h3>
            <DropDown planets={planets} />
            <RadioButton vehicles={vehicles} />
          </div>
          <div className="planetDropDown">
            <h3>Planet 4</h3>
            <DropDown planets={planets} />
            <RadioButton vehicles={vehicles} />
          </div>
        </div>
      </Fragment>
    );
  }
}
