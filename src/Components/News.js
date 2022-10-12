import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps = {
    country: 'us',  
    pageSize:6,
    category:'general'
  }
  static propTypes = {
    country: PropTypes.string,
    page:PropTypes.number,
    category:PropTypes.string
  }

  constructor(){
     super();
    // console.log('constructur for news component');
    this.state={
      articles:[],
      loading: false,
      page:1
    }
  }


  async componentDidMount(){
      console.log('cdm');
     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a9cfe66c58c448eb25adaf50393d570&page=1&pageSize=${this.props.pageSize}`;
     this.setState({loading:true})
     let data= await fetch(url)
     let parssedData = await data.json()
    console.log(parssedData); 
    this.setState({
      articles:parssedData.articles,
      totalResults:parssedData.totalResults,
      loading:false
    })
}

handlePreviousClick= async ()=>{
  console.log('Previous');
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a9cfe66c58c448eb25adaf50393d570&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data= await fetch(url);
    let parssedData = await data.json()
    console.log(parssedData); 
    this.setState({
      page:this.state.page-1,
      articles:parssedData.articles,
      loading:false
    });
}

handleNextClick= async()=>{
    console.log('Next');
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a9cfe66c58c448eb25adaf50393d570&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    let parssedData = await data.json()
    console.log(parssedData); 
    this.setState({
      page:this.state.page+1,
      articles:parssedData.articles,
      loading:false
    });

  }
  }
  render() {
    console.log('render');
    return (
      <div className="container my-3">
        <h2>Phenix News - Top headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
             {!this.state.loading && this.state.articles?.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                        <NewsItem  title={element.title?element.title.slice(0,45)+"...":" "  } description={element.description?element.description.slice(0, 88)+"...":" "} imageUrl={element.urlToImage} url={element.url}/>
                      </div>

            })}
        </div>
        <div className='container my-3 d-flex justify-content-between'>
        <button  disabled={this.state.page<=1} type="button"  onClick={this.handlePreviousClick} className="btn btn-dark">&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
         
      </div>

        
     
    )
  }
}