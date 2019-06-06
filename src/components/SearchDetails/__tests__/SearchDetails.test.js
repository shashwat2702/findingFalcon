import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchDetails from '../SearchDetails';

jest.mock('react-router-dom');
const planets = [{ name: 'PlanetA', distance: 100 }, { name: 'PlanetB', distance: 150 },
  { name: 'PlanetC', distance: 200 }, { name: 'PlanetD', distance: 50 },
  { name: 'PlanetE', distance: 250 }, { name: 'PlanetF', distance: 300 }];
const vehicles = [{ name: 'VehicleA', speed: 10 }, { name: 'VehicleB', speed: 5 },
  { name: 'VehicleC', speed: 20 }, { name: 'VehicleD', speed: 25 },
  { name: 'VehicleE', speed: 50 }, { name: 'VehicleF', speed: 40 }];
const selectedPlanets = ['PlanetC', 'PlanetF', 'PlanetD', 'PlanetA'];
const selectedVehicles = ['VehicleC', 'VehicleD', 'VehicleF', 'VehicleE'];

describe('SearchDetails snapshot', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<SearchDetails
      planets={planets}
      selectedPlanets={selectedPlanets}
      vehicles={vehicles}
      planetNumber={1}
      onDropDownChange={jest.fn()}
      onRadioClick={jest.fn()}
      selectedVehicles={selectedVehicles}
    />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('changeVisibilityOfVehicles', () => {
  it('should set the showVehicles attribute of state to be true for option other than Select One', () => {
    const wrapper = shallow(<SearchDetails
      planets={planets}
      selectedPlanets={selectedPlanets}
      vehicles={vehicles}
      planetNumber={1}
      onDropDownChange={jest.fn()}
      onRadioClick={jest.fn()}
      selectedVehicles={selectedVehicles}
    />);
    const instance = wrapper.instance();
    const event = {
      target: {
        value: 'PlanetC',
      },
    };
    expect(instance.state.showVehicles).toEqual(false);
    instance.changeVisibilityOfVehicles(event);
    expect(instance.state.showVehicles).toEqual(true);
  });
  it('should set the showVehicles attribute of state to be false for option "Select One"', () => {
    const wrapper = shallow(<SearchDetails
      planets={planets}
      selectedPlanets={selectedPlanets}
      vehicles={vehicles}
      planetNumber={1}
      onDropDownChange={jest.fn()}
      onRadioClick={jest.fn()}
      selectedVehicles={selectedVehicles}
    />);
    const instance = wrapper.instance();
    const event = {
      target: {
        value: 'Select One',
      },
    };
    const event2 = {
      target: {
        value: 'PlanetC',
      },
    };
    instance.changeVisibilityOfVehicles(event2);
    expect(instance.state.showVehicles).toEqual(true);
    instance.changeVisibilityOfVehicles(event);
    expect(instance.state.showVehicles).toEqual(false);
  });
});

describe('numberOfOccupiedvehicle', () => {
  it('should return an object having keys as vehicle name and count as value', () => {
    const wrapper = shallow(<SearchDetails
      planets={planets}
      selectedPlanets={selectedPlanets}
      vehicles={vehicles}
      planetNumber={1}
      onDropDownChange={jest.fn()}
      onRadioClick={jest.fn()}
      selectedVehicles={selectedVehicles}
    />);
    const instance = wrapper.instance();
    expect(instance.numberOfOccupiedvehicle(selectedVehicles)).toEqual({
      VehicleC: 1, VehicleD: 1, VehicleE: 1, VehicleF: 1,
    });
  });
});

describe('onChange', () => {
  it('should call on DropDownChange with an argument and should change the visibility of vehicle', () => {
    const onDropDownChangeMock = jest.fn();
    const wrapper = shallow(<SearchDetails
      planets={planets}
      selectedPlanets={selectedPlanets}
      vehicles={vehicles}
      planetNumber={1}
      onDropDownChange={onDropDownChangeMock}
      onRadioClick={jest.fn()}
      selectedVehicles={selectedVehicles}
    />);
    const event = {
      target: {
        value: 'PlanetC',
      },
    };
    const instance = wrapper.instance();
    instance.onChange(event);
    expect(onDropDownChangeMock).toHaveBeenCalledWith(event);
    expect(instance.state.showVehicles).toEqual(true);
  });
});
