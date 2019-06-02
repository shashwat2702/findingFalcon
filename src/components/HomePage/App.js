import React, { Component, Fragment } from 'react';
import './App.scss';
import { getData } from '../../utils/apiCalls';
import { getPlanet, getVehicles } from '../../constants/apiUrls';
import DropDown from '../shared/DropDown/DropDown';

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
    const { planets } = this.state;
    return (
      <Fragment>
        <div className="listOfDropDown">
          <div className="planetDropDown">
            <DropDown planets={planets} />
          </div>
          <div className="planetDropDown">
            <DropDown planets={planets} />
          </div>
          <div className="planetDropDown">
            <DropDown planets={planets} />
          </div>
          <div className="planetDropDown">
            <DropDown planets={planets} />
          </div>
        </div>
      </Fragment>
    );
  }
}
