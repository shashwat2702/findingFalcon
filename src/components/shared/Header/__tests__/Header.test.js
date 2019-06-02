import React from 'react';
import renderer from 'react-test-renderer';
import { Header } from '../Header';

jest.mock('react-router-dom');

describe('HomePage snapshot', () => {
  it('should render correctly', () => {
    const HeaderSnap = renderer.create(<Header />);
    const HeaderJson = HeaderSnap.toJSON();
    expect(HeaderJson).toMatchSnapshot();
  });
});
