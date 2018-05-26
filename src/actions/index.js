import axios from 'axios';

const NUM_ARTICLES = 3;

// export const actions = {};
export const types = {};

/**
* fetch article json from hacker news api
*/

types.GET_ARTICLE_IDS = 'GET_ARTICLE_IDS';

export const getArticles = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'Content-Type: application/json'
      }
    })
    .then(items => {
      const randomArticlesDispatch = getRandomArticleIds(items.data);
      dispatch(randomArticlesDispatch);
      // JOE: NOTE: check out to see if passing dispatch as arg is an anti-pattern
      getArticleDetail(randomArticlesDispatch.data, dispatch);

      resolve(items);
    })
    .catch(error => {
      console.error('ERROR: ', error);
      reject();
    });
  });
};

/**
* pick out ten random articles
*/

const getRandomArticleIds = (jsonArray) => {
  let len = jsonArray.length;
  let n = NUM_ARTICLES;
  const articles = new Array(NUM_ARTICLES);
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

const getArticleDetail = (jsonArray, dispatch) => {

  jsonArray.forEach(id => {
    new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'Content-Type: application/json'
        }
      })
      .then(items => {
        dispatch({
          type: types.SET_ARTICLE_DETAIL,
          data: items.data
        });

        getAuthorDetail(items.data.by).then(data => {
          dispatch({
            type: types.SET_AUTHOR_DETAIL,
            data: data
          });
        });

        resolve(items);
      })
      .catch(error => {
        console.error('ERROR: ', error);
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
      url: 'https://hacker-news.firebaseio.com/v0/user/' + id + '.json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'Content-Type: application/json'
      }
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
*
*/