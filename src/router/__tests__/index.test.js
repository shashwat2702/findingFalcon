import React from 'react';
import { shallow } from 'enzyme';
import Router from '../index';


describe('the root router\'s render function', () => {
  it('should have the correct number of routes', () => {
    const wrapper = shallow(<Router />).dive();
    expect(wrapper.children().length).toBe(1);
  });
});
