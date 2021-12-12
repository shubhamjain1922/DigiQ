import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import {Menu } from 'semantic-ui-react';
import '../App.css';
import Cookies from 'universal-cookie';
import ModulePopup from './modulepopup';
import CreateModulePopup from './createpopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


class Profnav extends Component {
    render() {
        const cookies = new Cookies();
        const name = cookies.get("usernameid");
        return (
            <div>
                <Menu className='topnavcon'>
                    <h1 className='topnavhead'><FontAwesomeIcon icon={faUserCircle} className='proficon' />{name}</h1>
                    <Menu.Menu position='right'>
                        <ModulePopup />
                        <CreateModulePopup />
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default Profnav;