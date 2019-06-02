import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-router-dom');

describe('HomePage snapshot', () => {
  it('should render correctly', () => {
    const homePageSnap = renderer.create(<App />);
    const homePageSnapJson = homePageSnap.toJSON();
    expect(homePageSnapJson).toMatchSnapshot();
  });
});
