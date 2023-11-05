import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class NewsContainer extends Component {
  static defaultProps = {
    country:"in",
    pagesize:9,
    category: "general",
  }
  
  static propTypes={
    country: PropTypes.string,
    pagecount: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    // console.log("Hello, this is constructor form news container");
    this.state = {
      // articles : this.articles,
      articles : [],
      loading : true,
      page : 1,
      totalResults : 0,
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - InsightVerse`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parsedata= await data.json();
    this.props.setProgress(70);
    // console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading : false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount(){
    // console.log("cdm")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e9d42809ccc4736a3f049cf0b866459&page=1&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedata= await data.json();
    // // console.log(parsedata);
    // this.setState({
    //   articles: parsedata.articles,
    //   totalResults: parsedata.totalResults,
    //   loading : false,
    // });
    this.updateNews();
  }



  handlePreClick=async()=>{
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e9d42809ccc4736a3f049cf0b866459&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true});
    // let data= await fetch(url);
    // let parsedata= await data.json();
    // this.setState({
    //   articles: parsedata.articles,
    //   page: this.state.page-1,
    //   loading : false,
    // })
    this.setState({page: this.state.page-1})
    this.updateNews();
  }

  handleNxtClick=async()=>{
    if(!(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pagesize))){
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e9d42809ccc4736a3f049cf0b866459&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
      // this.setState({loading:true});
      // let data= await fetch(url);
      // let parsedata= await data.json();
      // this.setState({
      //   articles: parsedata.articles,
      //   page: this.state.page+1,
      //   loading : false,
      // })
      this.setState({page: this.state.page+1})
      this.updateNews();
    }
  }
  fetchMoreData = async() => {
    this.setState({page: this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data= await fetch(url);
    let parsedata= await data.json();
    // console.log(parsedata);
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading:false
    });
    
  };

  render() {
    // console.log("render");
    return (
      <>
        <h1 className='text-center my-4'>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner />}
        >
        
        <div className="container">
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,66):""} imageUrl={element.urlToImage} newsurl={element.url} author={element.author?element.author:"Unknown"} time={element.publishedAt} publisher={element.source.name}/>
            </div>
          })}
        </div>
        </div>
        {/* {this.setState({loading: false})} */}
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePreClick}>&laquo; Previous</button>
          <button disabled={ Math.ceil(this.state.totalResults/this.props.pagesize)<this.state.page+1} type="button" className="btn btn-info" onClick={this.handleNxtClick}>Next &raquo;</button>
        </div> */}
        </>
    )
  }
}

export default NewsContainer
