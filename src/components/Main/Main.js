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
    const { articles } = this.props;
    const rows = [];

    // JOE: TODO: I have url address to article and to comments

    articles.forEach((article, i) => {
      rows.push(
        <div className="row" key={ i }>
          <div className="col-1">
            <span className="story-score">{ article.score }</span>
          </div>
          <div className="col-9">
            <h3>
              <a className="story-link" href={ article.url }>
                { article.title }
              </a>
            </h3>
            <h5>
              <span className="story-author">
                <small>
                  <span className="story-author-score">(50) </span> { article.by }.
                </small>
              </span>
            </h5>
          </div>
          <div className="col-2">
            <span className="story-timestamp">{ article.time }</span>
          </div>

        </div>
      );
    });

    return rows;
  }

  render () {
    const { articles } = this.props;

    console.log('JOE: articles: ', articles);

    if (articles.length < 3) {
      return <h1>Loading...</h1>;
    }

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
  return {
    articles: state.articles.data
  };
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArticles
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Main);