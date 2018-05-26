import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getArticles
} from '../../actions';

class Main extends Component {
  constructor (props) {
    super(props);

    this.props.getArticles();
  }

  renderRow () {
    const rows = [];

    for (let i = 0; i < 10; i++) {
      rows.push(
        <div className="row" key={ i }>
          <div className="col-1">
            <span className="story-score">420</span>
          </div>
          <div className="col-9">
            <h3>
              <a className="story-link" href={ '#' + i }>
                Lorem ipsum dolor sit amet sit amet title.
              </a>
            </h3>
            <h5>
              <span className="story-author">
                <small>
                  <span className="story-author-score">(50) </span> Ed Bast.
                </small>
              </span>
            </h5>
          </div>
          <div className="col-2">
            <span className="story-timestamp">7/17/2018</span>
          </div>

        </div>

      );
    }

    return rows;
  }

  render () {
    return (
      <div className="container">
        <div className="page-header mt-3 mb-4">
          <h1>Welcome to my Hacker News viewer <small>scroll on down!</small></h1>
        </div>

        { this.renderRow() }

      </div>

    );
  }
}

const _stateToProps = (state) => {
  return {};
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArticles
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Main);