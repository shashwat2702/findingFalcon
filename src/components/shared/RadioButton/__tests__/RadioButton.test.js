import React from 'react';
import renderer from 'react-test-renderer';
import RadioButton from '../RadioButton';


jest.mock('react-router-dom');

const onRadioClickMocked = jest.fn();
const planets = [{ name: 'PlanetA', distance: 100 }, { name: 'PlanetB', distance: 150 },
  { name: 'PlanetC', distance: 200 }, { name: 'PlanetD', distance: 50 },
  { name: 'PlanetE', distance: 250 }, { name: 'PlanetF', distance: 300 }];
const vehicles = [{ name: 'VehicleA', speed: 10 }, { name: 'VehicleB', speed: 5 },
  { name: 'VehicleC', speed: 20 }, { name: 'VehicleD', speed: 25 },
  { name: 'VehicleE', speed: 50 }, { name: 'VehicleF', speed: 40 }];
const selectedPlanets = ['PlanetC', 'PlanetF', 'PlanetD', 'PlanetA'];


describe('RadioButton snapshot', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<RadioButton
      vehicles={vehicles}
      selectedPlanets={selectedPlanets}
      planets={planets}
      onRadioClick={onRadioClickMocked}
      planetNumber={1}
      usedVehicles={{ name: 'VehicleC', speed: 20 }}
    />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
