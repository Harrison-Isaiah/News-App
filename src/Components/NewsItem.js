import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, url}=this.props;
    return (
      <div>
       <div  className="card my-3" >
        <img src={!imageUrl?"https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2022/06/app-store-fraud.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1":imageUrl}  className="card-img-top img-size" alt="..."/>
        <div  className="card-body">
            <h5  className="card-title">{title}</h5>
            <p  className="card-text">{description}</p>
            <a href={url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>
      </div>
    )
  }
}