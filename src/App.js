import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  apikey =process.env.REACT_APP_API_KEY
  state={
    progress:0
  }
  setProgress=(progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>

        <BrowserRouter>
          <NavBar/>
          <LoadingBar
          color='#f11946'
          height={3}
          progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={6} country={"in"} category="general"/>}></Route>
            <Route exact path="/business" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="business" pagesize={6} country={"in"} category="business"/>}></Route>
            <Route exact path="/entertainment" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pagesize={6} country={"in"} category="entertainment"/>}></Route>
            <Route exact path="/general" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={6} country={"in"} category="general"/>}></Route>
            <Route exact path="/health" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="health" pagesize={6} country={"in"} category="health"/>}></Route>
            <Route exact path="/science" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="science" pagesize={6} country={"in"} category="science"/>}></Route>
            <Route exact path="/sports" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="sports" pagesize={6} country={"in"} category="sports"/>}></Route>
            <Route exact path="/technology" element={<NewsContainer setProgress={this.setProgress} apikey={this.apikey} key="technology" pagesize={6} country={"in"} category="technology"/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
