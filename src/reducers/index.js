/* eslint-disable no-unreachable */
// Above is needed to kill warnings about all these reducer blocks

import { combineReducers } from 'redux';
import { types } from '../actions';
import CONSTANTS from '../utils/constants';

/**
* Article reducers
*/

const initialArticlesState = {
  ids: [],
  data: []
};

const articles = (state = initialArticlesState, action) => {
  switch (action.type) {
    case types.CLEAR_ARTICLES:
      return Object.assign({}, state, {
        ids: [],
        data: []
      });
      break;

    case types.GET_ARTICLE_IDS:
      return Object.assign({}, state, {
        ids: action.data
      });
      break;

    case types.SET_ARTICLE_DETAIL:
      const data = state.data.slice();
      data.push(action.data);

      if (data.length === CONSTANTS.NUM_ARTICLES) {
        data.sort((a, b) => {
          return b.score - a.score;
        });
      }

      return Object.assign({}, state, {
        data: data
      });
      break;

    default:
      return state;
  }
};

/**
* Author reducers
*/

const initialAuthorsState = {};

const authors = (state = initialAuthorsState, action) => {
  switch (action.type) {
    case types.SET_AUTHOR_DETAIL:
      const authors = Object.assign({}, state.authors);
      authors[action.data.id] = action.data;
      return Object.assign({}, state, authors);
      break;

    default:
      return state;
  }
};

/**
* App request state
*/

const initialAppReqState = {
  length: 0,
  state: types.IDLE,
  message: ''
};

const requests = (state = initialAppReqState, action) => {
  switch (action.type) {
    case types.IDLE:
      let idleAssignState = Object.assign({}, state);

      if (action.state.length === 0) {
        idleAssignState.type = types.IDLE;
      }
      return Object.assign({}, idleAssignState);
      break;

    case types.FETCHING:
      let fetchingAssignState = Object.assign({}, state);

      fetchingAssignState.length += 1;
      fetchingAssignState.state = types.FETCHING;

      return Object.assign({}, fetchingAssignState);
      break;

    case types.COMPLETE:
      let completeAssignState = Object.assign({}, state);
      completeAssignState.length -= 1;

      if (completeAssignState.length === 0) {
        completeAssignState.state = types.IDLE;
      }
      else {
        // Still in fetching state
        completeAssignState.state = types.FETCHING;
      }

      return Object.assign({}, completeAssignState);
      break;

    case types.ERROR:
      let errorAssignState = Object.assign({}, state);
      errorAssignState.length -= 1;

      if (errorAssignState.length === 0) {
        errorAssignState.state = types.IDLE;
      }
      else {
        // Still in fetching state
        errorAssignState.state = types.FETCHING;
      }

      return Object.assign({}, errorAssignState);
      break;

    default:
      return state;

  }
};


const reducers = {
  articles,
  authors,
  requests
};

const rootReducer = combineReducers(reducers);
export default rootReducer;