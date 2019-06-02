/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/shared/Header/Header';

export class PageLayout extends Component {
  render() {
    const {
      component: Component,
    } = this.props;
    return (
      <Fragment>
        <Header />
        <Component />
      </Fragment>
    );
  }
}

PageLayout.propTypes = {
  component: PropTypes.element.isRequired,
};
export default PageLayout;
