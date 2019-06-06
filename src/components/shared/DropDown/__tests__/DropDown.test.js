import React from 'react';
import renderer from 'react-test-renderer';
import DropDown from '../DropDown';


jest.mock('react-router-dom');

const planets = [{ name: 'PlanetA', distance: 100 }, { name: 'PlanetB', distance: 150 },
  { name: 'PlanetC', distance: 200 }, { name: 'PlanetD', distance: 50 },
  { name: 'PlanetE', distance: 250 }, { name: 'PlanetF', distance: 300 }];
const onChangeMocked = jest.fn();
const name = 1;
const selectedPlanets = ['PlanetC', 'PlanetF', 'PlanetD', 'PlanetA'];


describe('DropDown snapshot', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<DropDown
      planets={planets}
      onChange={onChangeMocked}
      name={name}
      selectedPlanets={selectedPlanets}
    />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
