import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsurl, author, time,publisher} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{right:'-10%', zIndex:'1'}}>
            {publisher}
            <span className="visually-hidden">unread message</span>
          </span>
          <img
            src={
              !imageUrl
                ? "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {new Date(time).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
