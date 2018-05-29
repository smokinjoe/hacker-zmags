## Welcome to my Hacker News challenge app!

The project is a React-powered viewer of a random set of ten top articles from Hacker News. The project's key steps are:

### Async fetching

We need to get that data! How do we do it? A slew of `GET` requests!

A series of Redux actions were created to retrieve an array of top articles. And from each article id, a set of article details. And with those article details, data about the author. Each successive function would be called within the success callback. The flow goes,

`getArticles` - Fetches array of ids that represent the top articles on Hacker News. The array was reduced to ten random article ids that were each then passed to,

`getArticleDetail` - As each set of details comes back as a response, the data is saved into the Redux store as well as passed to,

`getAuthorDetail` - Here, one final API endpoint is sent a request. The response is then saved to the Redux store.

### Ensure a complete set of requests

A fairly simple combination of actions of `complete` and `fetching` were implemented and integrated into each of the above functions in order to keep track of all the async transfer occurring. As a new `getArticles` call is performed, `fetch` is also called and the `requests.length` state property is increased by one.

As each requests returns and `complete` is called, the counter is decremented.

Once that counter hits zero, the application enters a request `IDLE` state.

### In the case of errors

Errors happen. Sometimes the connection cuts out or the request simply times out (a defined 30 second wait time). If such issues arise, the `err` action is dispatched and Redux handles modifying `requests.length` so that any requests are ultimately balanced out.

### Display the data

Once the app has completed all the requests, the `request.state` becomes `IDLE` and the returned data is rendered on the screen for the viewer!

In the case of incomplete data (due to errors), a quick check is performed. If the required data for display is incomplete, the entire row is ignored.

### Extas

A personal library, `phrasify` was implemented because I love a dynamic combination of buzzwords with the hopes of providing the user with a chuckle or a raised set of eyebrows.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).