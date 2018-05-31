import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  getArticles,
  types
} from '../../actions';

import CONSTANTS from '../../utils/constants';

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

  refresh () {
    this.props.getArticles();
    this.setState({
      loadingMessage: phrasify()
    });
  }

  gussyUpThatDate (date) {
    return new Date(date * 1000).toLocaleTimeString() + ' '
        + new Date(date * 1000).toLocaleDateString();
  }

  renderRows () {
    const { articles, authors } = this.props;
    const rows = [];

    articles.forEach((article, i) => {
      if (typeof article === 'undefined' || typeof authors[article.by] === 'undefined') {
        return null;
      }

      const karma = authors[article.by].karma;
      const url = typeof article.url !== 'undefined' ? article.url
          : CONSTANTS.ARTICLE_BASE_URL + '?id=' + article.id;

      rows.push(
        <div className="row mb-4" key={ article.id }>
          <div className="col-1 mt-1">
            <h4 className="story-score">{ article.score }</h4>
          </div>
          <div className="col-9">
            <h3>
              <a className="story-link" href={ url }>
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
    const { requestState } = this.props;
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

        <div className="row">
          <button
              onClick={ this.refresh.bind(this) }
              className="btn btn-link btn-block mb-5">
            Refresh
          </button>
        </div>
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