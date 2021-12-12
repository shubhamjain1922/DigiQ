import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css';
import { faCalendarPlus, faHandPointRight, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import img5 from '../images/img5.png';
import img4 from '../images/img4.png';
import { slide as Menu3 } from 'react-burger-menu';

class Nav extends Component {
    componentDidMount = async () => {
        const cookies = new Cookies();
        const name = cookies.get("auth");
        if (name == "false") {
          window.location.href = '/components/login';
        }
      }
    logout() {
        const cookies = new Cookies();
        cookies.set('usernameid', '', { expires: 0, path: '/' });
        cookies.set('auth', false, { path: '/' });
        localStorage.clear();
        window.location.href = '/components/login';
    }
    render() {
        return (
            <div>
                <ProSidebar className="sidebarcon">
                    <SidebarHeader>
                        {
                            <h1 className='navitem'><img src={img5} className='navimg' alt=""/></h1>
                        }
                    </SidebarHeader>
                    <SidebarContent>
                        {
                            <Menu iconShape="square">
                                <MenuItem>
                                    <Link to='/components/landing' className='navmenuitem'><FontAwesomeIcon icon={faHome} className='navicon' />Home</Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to='/components/joinedlines' className='navmenuitem'><p><FontAwesomeIcon icon={faHandPointRight} className='navicon' />Joined Queues</p></Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to='/components/createdlines' className='navmenuitem'><FontAwesomeIcon icon={faCalendarPlus} className='navicon' />Created Queues</Link>
                                </MenuItem>
                            </Menu>
                        }
                    </SidebarContent>
                    <SidebarFooter>
                        {
                            <Menu iconShape="square">
                                <MenuItem>
                                    <a onClick={this.logout}>Logout <FontAwesomeIcon icon={faSignOutAlt} className='navicon' /></a></MenuItem>
                            </Menu>
                        }
                    </SidebarFooter>
                </ProSidebar>
                <Menu3>
                <h1 className='navitem'><img src={img5} className='navimg' alt=""/></h1>
                <Link to='/components/landing' className='navmenuitem menu-item'><FontAwesomeIcon icon={faHome} className='navicon' />Home</Link>
        <Link to='/components/joinedlines' className='navmenuitem menu-item'><p><FontAwesomeIcon icon={faHandPointRight} className='navicon' />Joined Queues</p></Link>
        <Link to='/components/createdlines' className='navmenuitem menu-item'><FontAwesomeIcon icon={faCalendarPlus} className='navicon' />Created Queues</Link>
        <a onClick={this.logout} className='phonenavitem'>Logout <FontAwesomeIcon icon={faSignOutAlt} className='navicon' /></a>

      </Menu3>
            </div>
        );
    }
}

export default Nav;