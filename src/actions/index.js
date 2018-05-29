import axios from 'axios';
import CONSTANTS from '../utils/constants';

// export const actions = {};
export const types = {};

/**
* fetch article json from hacker news api
*/

types.GET_ARTICLE_IDS = 'GET_ARTICLE_IDS';
types.CLEAR_ARTICLES = 'CLEAR_ARTICLES';

export const getArticles = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_ARTICLES
  });
  dispatch(fetching());

  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: CONSTANTS.HN_API_URL + 'topstories.json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'Content-Type: application/json'
      },
      timeout: CONSTANTS.TIMEOUT
    })
    .then(items => {
      const randomArticlesDispatch = getRandomArticleIds(items.data);
      dispatch(randomArticlesDispatch);
      dispatch(complete());

      // JOE: NOTE: check out to see if passing dispatch as arg is an anti-pattern
      getArticleDetail(randomArticlesDispatch.data, dispatch);

      resolve(items);
    })
    .catch(error => {
      console.error('ERROR: Top stories could not be requested. ', error);
      reject();
      dispatch(err());
    });
  });

};

/**
* pick out ten random articles
*/

const getRandomArticleIds = (jsonArray) => {
  let len = jsonArray.length;
  let n = CONSTANTS.NUM_ARTICLES;
  const articles = new Array(CONSTANTS.NUM_ARTICLES);
  const taken = new Array(len);

  if (n > len) {
    // throw new RangeError("getRandom: more elements taken than available");
    console.error('getRandomArticleIds: more elements taken than available');
  }

  while (n--) {
    const x = Math.floor(Math.random() * len);
    articles[n] = jsonArray[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return {
    type: types.GET_ARTICLE_IDS,
    data: articles
  };
};

/**
* fetch article details
*/

types.SET_ARTICLE_DETAIL = 'SET_ARTICLE_DETAIL';

// JOE: NOTE: I really do not like passing dispatch in this manner
const getArticleDetail = (jsonArray, dispatch) => {
  jsonArray.forEach(id => {
    dispatch(fetching());
    new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: CONSTANTS.HN_API_URL + 'item/' + id + '.json',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'Content-Type: application/json'
        },
        timeout: CONSTANTS.TIMEOUT
      })
      .then(items => {
        dispatch({
          type: types.SET_ARTICLE_DETAIL,
          data: items.data
        });

        dispatch(fetching());
        getAuthorDetail(items.data.by).then(data => {
          dispatch({
            type: types.SET_AUTHOR_DETAIL,
            data: data
          });
          dispatch(complete());
        })
        .catch(error => {
          console.error('ERROR: There was an error fetching author details.', error);
          dispatch(err());
        });

        dispatch(complete());

        resolve(items);
      })
      .catch(error => {
        dispatch(err());
        console.error('ERROR: There was an error fetching article details.', error);
        reject();
      });

    });

  });
};

/**
* Let's fetch some author details!
*/

types.SET_AUTHOR_DETAIL = 'SET_AUTHOR_DETAIL';

const getAuthorDetail = (id) => {
  return new Promise((resolve, reject) => {

    axios({
      method: 'GET',
      url: CONSTANTS.HN_API_URL + 'user/' + id + '.json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'Content-Type: application/json'
      },
      timeout: CONSTANTS.TIMEOUT
    })
    .then(items => {
      resolve(items.data);
    })
    .catch(error => {
      console.error('ERROR: ', error);
      reject();
    })

  });
};

/**
* App request state actions
*/

types.IDLE = 'IDLE'; // this might stay unused ..
types.COMPLETE = 'COMPLETE';
types.FETCHING = 'FETCHING';
types.ERROR = 'ERROR';

// JOE: NOTE: do I want to add the timeout thing?
// let timeout = null;

const complete = () => {
  return {
    type: types.COMPLETE
  };
};

const fetching = () => {
  return {
    type: types.FETCHING
  };
};

const err = () => {
  return {
    type: types.ERROR
  };
};