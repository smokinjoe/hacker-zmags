import React, { Component } from 'react';

class Main extends Component {

  renderRow () {
    const rows = [];

    for (let i = 0; i < 10; i++) {
      rows.push(
        <div className="row">
          <div className="col-1">
            <span className="story-score">420</span>
          </div>
          <div className="col-9">
            <h3>
              <a className="story-link" href="#">
                Lorem ipsum dolor sit amet sit amet title.
              </a>
            </h3>
            <h4>
              <span className="story-author">
                <small>
                  <span className="story-author-score">
                    50
                  </span>
                  Ed Bast.
                </small>
              </span>
            </h4>
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
        <div class="page-header mt-3 mb-4">
          <h1>Welcome to my Hacker News viewer <small>scroll on down!</small></h1>
        </div>

        { this.renderRow() }

      </div>

    );
  }
}

export default Main;