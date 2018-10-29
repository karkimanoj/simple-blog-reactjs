import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; //redux Router Imports
import PostsIndex from './components/PostsIndex'; 
import PostsCreate from './components/PostsCreate';
import PostShow from './components/PostShow';
import AppHeader from './components/AppHeader';

/* 
  In this app, server side routes and data is used from  reduxblog.herokuapp.com/api/posts?key={any unique key}
  routes are 
  1. get::api/posts       name=posts.index
  2. post::api/posts      name=posts.store
  3. get::api/posts/5     name=posts.show
  4. delete::api/posts/5  name=posts.destroy       
*/
class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <AppHeader/> 
        <BrowserRouter>        
            <Switch>
              <Route path= "/posts/create" exact render= {()=> <PostsCreate />} />
            {/* render property takes a arrow function different to component prop which
            takes component instance*/}
              <Route path="/posts/:id" component={PostShow} />
              <Route path= "/" component= {PostsIndex} />
            </Switch>         
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
