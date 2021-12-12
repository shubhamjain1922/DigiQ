import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { Menu } from 'semantic-ui-react';
import '../App.css';
import Cookies from 'universal-cookie';
import ModulePopup from './modulepopup';
import CreateModulePopup from './createpopup';


class Topnav extends Component {
    render() {
        const cookies = new Cookies();
        const name = cookies.get("usernameid");
        return (
            <div>
                <Menu className='topnavcon'>
                    <h1 className='topnavhead'>Welcome, {name}!</h1>
                    <Menu.Menu position='right'>
                        <ModulePopup />
                        <CreateModulePopup />
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default Topnav;