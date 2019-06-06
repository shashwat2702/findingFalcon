import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { App } from '../App';
import {
  getPlanet, getVehicles, getToken, findFalcon,
} from '../../../constants/apiUrls';

jest.mock('react-router-dom');
const history = {
  push: jest.fn(),
};
const planets = [{ name: 'PlanetA', distance: 100 }, { name: 'PlanetB', distance: 150 },
  { name: 'PlanetC', distance: 200 }, { name: 'PlanetD', distance: 50 },
  { name: 'PlanetE', distance: 250 }, { name: 'PlanetF', distance: 300 }];
const vehicles = [{ name: 'VehicleA', speed: 10 }, { name: 'VehicleB', speed: 5 },
  { name: 'VehicleC', speed: 20 }, { name: 'VehicleD', speed: 25 },
  { name: 'VehicleE', speed: 50 }, { name: 'VehicleF', speed: 40 }];
const selectedPlanets = ['PlanetC', 'PlanetF', 'PlanetD', 'PlanetA'];
const selectedVehicles = ['VehicleC', 'VehicleD', 'VehicleF', 'VehicleE'];
const requestHeader = { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } };

describe('HomePage snapshot', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<App history={history} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onDropDownChange', () => {
  it('should change the value of selectedPlanets in state', () => {
    const wrapper = shallow(<App history={history} />);
    const instance = wrapper.instance();
    const event = {
      target: {
        name: 2,
        value: 'Mars',
      },
    };
    expect(instance.state.selectedPlanets).toEqual(['', '', '', '']);
    instance.onDropDownChange(event);
    expect(instance.state.selectedPlanets).toEqual(['', 'Mars', '', '']);
  });
});

describe('onRadioClick', () => {
  it('should change the value of selectedVehicles in state', () => {
    const wrapper = shallow(<App history={history} />);
    const instance = wrapper.instance();
    const event = {
      target: {
        name: 'Vehicle1',
        value: 'VehicleA',
      },
    };
    instance.setState({
      planets, vehicles, selectedPlanets, selectedVehicles,
    });
    expect(instance.state.selectedVehicles).toEqual(selectedVehicles);
    instance.onRadioClick(event);
    expect(instance.state.selectedVehicles).toEqual(['VehicleA', 'VehicleD', 'VehicleF', 'VehicleE']);
  });
});

describe('getSearchDetails', () => {
  it('should return 4 dropdowns and Radio Buttons', () => {
    const wrapper = shallow(<App history={history} />);
    const instance = wrapper.instance();
    instance.setState({ planets, vehicles, selectedPlanets });
    const result = instance.getSearchDetails();
    expect(result.length).toEqual(4);
  });
});

describe('getTotalTimeTaken', () => {
  it('should return the total time to search on all the planets for Queen Falcon', () => {
    const wrapper = shallow(<App history={history} />);
    const instance = wrapper.instance();
    instance.setState({
      planets, vehicles, selectedPlanets, selectedVehicles,
    });
    instance.getTotalTimeTaken();
    expect(instance.state.totalTimeTaken).toEqual(35.25);
  });
});

describe('onSubmit', () => {
  const token = '1234567890';
  let postMock;
  beforeAll(() => {
    postMock = jest.spyOn(axios, 'post');
    postMock.mockImplementation(() => Promise.resolve({ data: { token }, status: 200 }));
  });
  afterAll(() => {
    postMock.mockRestore();
  });
  it('should call postData api to get token', async () => {
    const wrapper = shallow(<App history={history} />);
    const instance = wrapper.instance();
    instance.setState({
      planets, vehicles, selectedPlanets, selectedVehicles,
    });
    const requestBody = {
      token,
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };
    await instance.onSubmit();
    expect(instance.state.requestToken).toEqual(token);
    expect(postMock).toHaveBeenCalledTimes(2);
    expect(postMock).toHaveBeenNthCalledWith(1, getToken, '', requestHeader);
    expect(postMock).toHaveBeenNthCalledWith(2, findFalcon, requestBody, requestHeader);
    expect(history.push).toHaveBeenCalledWith({ pathname: '/result', state: { key: { token: '1234567890' }, timeTaken: 0 } });
  });
});

describe('componentDidMount', () => {
  let getMock;
  it('should call get API to fetch planets list and set planet names', async () => {
    getMock = jest.spyOn(axios, 'get');
    getMock.mockImplementation(() => Promise.resolve({ status: 200, data: planets }));
    const wrapper = shallow(<App history={history} />);
    const instance = await wrapper.instance();
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(getMock).toHaveBeenNthCalledWith(1, getPlanet);
    expect(instance.state.planets).toEqual(planets);
    getMock.mockRestore();
  });
  it('should call get API to fetch vehicles list and set vehicle names', async () => {
    getMock = jest.spyOn(axios, 'get');
    getMock.mockImplementation(() => Promise.resolve({ status: 200, data: vehicles }));
    const wrapper = shallow(<App history={history} />);
    const instance = await wrapper.instance();
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(getMock).toHaveBeenNthCalledWith(2, getVehicles);
    expect(instance.state.vehicles).toEqual(vehicles);
    getMock.mockRestore();
  });
});
