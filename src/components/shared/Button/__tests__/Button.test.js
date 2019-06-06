import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';


jest.mock('react-router-dom');

describe('Button snapshot', () => {
  it('should render correctly', () => {
    const wrapper = renderer.create(<Button onClick={jest.fn()} label="Search Falcon" />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
