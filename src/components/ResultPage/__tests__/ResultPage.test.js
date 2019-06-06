import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ResultPage } from '../ResultPage';

jest.mock('react-router-dom');

describe('ResultPage snapshot', () => {
  it('should render correctly when Falcon is found', () => {
    const location = {
      state: {
        timeTaken: 200,
        key: {
          status: 'success',
          planet_name: 'DonLon',
        },
      },
    };
    const history = {
      push: jest.fn(),
    };
    const wrapper = renderer.create(<ResultPage history={history} location={location} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when Falcon is not found', () => {
    const location = {
      state: {
        timeTaken: 200,
        key: {
          status: 'failure',
          planet_name: 'DonLon',
        },
      },
    };
    const history = {
      push: jest.fn(),
    };
    const wrapper = renderer.create(<ResultPage history={history} location={location} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('constructor', () => {
  it('call history.push with / when data is not received', () => {
    const location = {
      state: false,
    };
    const history = {
      push: jest.fn(),
    };
    const wrapper = shallow(<ResultPage history={history} location={location} />);
    const instance = wrapper.instance();
    expect(history.push).toHaveBeenCalledWith('/');
    expect(instance.state.foundStatus).toEqual('');
  });
});

describe('onSubmit', () => {
  it('call history.push with /', () => {
    const location = {
      state: {
        timeTaken: 200,
        key: {
          status: 'failure',
          planet_name: 'DonLon',
        },
      },
    };
    const history = {
      push: jest.fn(),
    };
    const wrapper = shallow(<ResultPage history={history} location={location} />);
    const instance = wrapper.instance();
    instance.onSubmit();
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/');
  });
});
