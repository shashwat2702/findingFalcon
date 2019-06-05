/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ResultPage.scss';
import Button from '../shared/Button/Button';

class ResultPage extends Component {
  constructor(props) {
    super(props);
    const { location, history } = props;
    const { state } = location;
    let foundStatus = '';
    let totalTimeTaken = 0;
    let foundOnPlanet = '';
    if (!state) {
      history.push('/');
    } else {
      const { key, timeTaken } = state;
      const { status, planet_name } = key;
      foundStatus = status;
      totalTimeTaken = timeTaken;
      foundOnPlanet = planet_name;
    }
    this.state = {
      foundStatus,
      totalTimeTaken,
      foundOnPlanet,
    };
  }

  onSubmit = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { foundStatus, totalTimeTaken, foundOnPlanet } = this.state;
    console.log(this.props);
    return (
      <div>
        <h1>Finding Falcon! </h1>
        {(foundStatus === 'success')
          ? <h2>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</h2>
          : <h2>Sorry! Falcone was not found on selected Planets. King Shan is dissappointed.</h2>
        }
        {
            (foundStatus === 'success') && (
            <div>
              <h2>
                Time taken
                {' '}
                {totalTimeTaken}
              </h2>
              <h2>
                Planet Found:
                {' '}
                {foundOnPlanet}
              </h2>
            </div>
            )
        }
        <div className="startAgainButton">
          <Button
            label="Start Again"
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}
ResultPage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default withRouter(ResultPage);
