import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getArticles,
  types
} from '../../actions';

import { phrasify } from '../../utils/phrasify';

import './Main.css';

class Main extends Component {
  constructor (props) {
    super(props);

    this.props.getArticles();

    this.state = {
      loadingMessage: phrasify()
    };
  }

  gussyUpThatDate (date) {
    return new Date(date * 1000).toLocaleTimeString() + ' '
        + new Date(date * 1000).toLocaleDateString();
  }

  renderRows () {
    const { articles, authors } = this.props;
    const rows = [];

    // JOE: NOTE: I have url address to article and to comments

    articles.forEach((article, i) => {
      const karma = authors[article.by].karma;

      rows.push(
        <div className="row mb-4" key={ i }>
          <div className="col-1 mt-1">
            <h4 className="story-score">{ article.score }</h4>
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
                  <span className="story-author-score">({ karma }) </span> { article.by }
                </small>
              </span>
            </h5>
          </div>
          <div className="col-2">
            <span className="story-timestamp">
              <small>{ this.gussyUpThatDate(article.time) }</small>
            </span>
          </div>

        </div>
      );
    });

    return rows;
  }

  render () {
    const { articles, authors, requestState } = this.props;
    const { loadingMessage } = this.state;

    if (requestState !== types.IDLE) {
      return (
        <div className="absolute-middle">
          <h1>{ loadingMessage }...</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="page-header mt-3 mb-4">
          <h1>Welcome to my Hacker News viewer <small>scroll on down!</small></h1>
        </div>

        { this.renderRows() }

      </div>
    );
  }
}

const _stateToProps = (state) => {
  return {
    articles: state.articles.data,
    authors: state.authors,
    requestState: state.requests.state
  };
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getArticles
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Main);