import { findIndexOfVehicle, findIndexOfPlanet } from './helperFunction';

describe('findIndexOfVehicle', () => {
  const vehicles = [{ name: 'Maruti' }, { name: 'Hyundai' }, { name: 'GM' },
    { name: 'Chevorlet' }, { name: 'BMW' }, { name: 'Audi' }];
  it('should return index of given vehicle in a list of vehicles', () => {
    const selectedVehicle = 'BMW';
    expect(findIndexOfVehicle(vehicles, selectedVehicle)).toEqual(4);
  });
  it('should return index -1 when given vehicle is not in list of vehicles', () => {
    const selectedVehicle = 'Porsche';
    expect(findIndexOfVehicle(vehicles, selectedVehicle)).toEqual(-1);
  });
});

describe('findIndexOfPlanet', () => {
  const planets = [{ name: 'Mercury' }, { name: 'Venus' }, { name: 'Earth' },
    { name: 'Mars' }, { name: 'Jupiter' }, { name: 'Saturn' }];
  const selectedPlanets = ['Earth', 'Mars', 'Venus', 'Saturn', 'Pluto'];
  it('should return index of given planet in a list of planets', () => {
    const index = 0;
    expect(findIndexOfPlanet(planets, selectedPlanets, index)).toEqual(2);
  });
  it('should return index -1 when given Planet is not in list of Selected Planets', () => {
    const index = 4;
    expect(findIndexOfPlanet(planets, selectedPlanets, index)).toEqual(-1);
  });
});
