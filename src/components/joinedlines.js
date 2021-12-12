import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import Nav from './Nav';
import Cookies from 'universal-cookie';
import '../App.css';
import JoinedLinesdiv from './joinedLinesdiv';
import Profnav from './profnav';

class JoinedLines extends Component {
  componentDidMount = async () => {
    const cookies = new Cookies();
    const name = cookies.get("auth");
    if (name == "false") {
      window.location.href = '/components/login';
    }
  }
  render() {
    return (
      <div style={{ overflow: "hidden", height: "100vh" }}>
        <div style={{ float: "left" }}>
          <Nav />
        </div>
        <Profnav />
        <div className='landmain'>

        </div>
        <JoinedLinesdiv />
      </div>
    );
  }
}

export default JoinedLines;