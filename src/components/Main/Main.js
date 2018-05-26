import React, { Component } from 'react';

class Main extends Component {

  renderRow () {
    return (
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
              <span className="story-author-score">
                50
              </span>
              Ed Bast.
            </span>
          </h4>
        </div>
        <div className="col-2">
          <span className="story-timestamp">7/17/2018</span>
        </div>

      </div>

    );
  }

  render () {
    return (
      <div className="container">

        { this.renderRow() }

      </div>




    );
  }
}

export default Main;