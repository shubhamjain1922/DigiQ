import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import Cookies from 'universal-cookie';
import Nav from './Nav';
import Topnav from './topnav';
import '../App.css';
import AllLines from './allLines';

class Landing extends Component {
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
        <Topnav />
        <div className='landmain'>

        </div>
        <div>
          <AllLines />
        </div>
      </div>
    );
  }
}

export default Landing;