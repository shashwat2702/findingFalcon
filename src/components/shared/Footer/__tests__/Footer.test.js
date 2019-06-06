import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

jest.mock('react-router-dom');

describe('Footer snapshot', () => {
  it('should render correctly', () => {
    const FooterSnap = renderer.create(<Footer />);
    const FooterJson = FooterSnap.toJSON();
    expect(FooterJson).toMatchSnapshot();
  });
});
