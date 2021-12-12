import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import AllLines from './components/allLines';
import CreatedLines from './components/createdlines';
import JoinedLines from './components/joinedlines';
import SignUp from './components/signup';
import Login from './components/login';
import Landing from './components/landing';
import MycreatedLine from './components/mycreatedline';

class App extends Component {
  render(){
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" exact element={<SignUp />} />
        <Route path="/components/signup" exact element={<SignUp />} />
        <Route path="/components/mycreatedline" exact element={<MycreatedLine />} />
        <Route path="/components/login" exact element={<Login />} />
        <Route path="/components/allLines" exact element={<AllLines />} />
        <Route path="/components/createdlines" exact element={<CreatedLines />} />
        <Route path="/components/joinedlines" exact element={<JoinedLines />} />
        <Route path="/components/landing" exact element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
  }
}

export default App;
