/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-named-as-default
import Header from '../../components/shared/Header/Header';
import Footer from '../../components/shared/Footer/Footer';

export class PageLayout extends Component {
  render() {
    const {
      component: Component,
    } = this.props;
    return (
      <Fragment>
        <Header />
        <Component />
        <Footer />
      </Fragment>
    );
  }
}

PageLayout.propTypes = {
  component: PropTypes.element.isRequired,
};
export default PageLayout;
