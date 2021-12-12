import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { Button} from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faMapMarkerAlt, faShoppingCart, faUser, faUtensils } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Cookies from 'universal-cookie';
import LoadingScreen from 'react-loading-screen';
import img4 from '../images/img4.png';

let data = [{ city: '', id: '', is_active: true, name: '', position: 1, tag: "", time: 0 }];

class JoinedLinesdiv extends Component {
    state = {
        j: 0,
        loading: false,
        show: false,
        isempty: true,
        pageload: true
    }
    componentDidMount = async () => {
        this.setState({ loading: true });
        const cookies = new Cookies();
        const name = cookies.get("usernameid");
        const body = {
            "username": name
        };

        let apifl = true;

        const response = await axios.post(
            "https://digiline.azurewebsites.net/api/getuserinfo",
            body,
            {
                headers: {
                    "username": name
                }
            }
        ).catch(err => {
            apifl = false;
            console.log("fail");
        })


        if (apifl) {
            if (!response.data.activequeues.length == 0) {
                data.splice(0, 1);
                data = response.data.activequeues;
                this.setState({ isempty: false });
            }
        }
        this.setState({ loading: false, pageload: false });
    }
    onleave = async (divid) => {
        await this.setState({ j: divid, show: true });
        const cookies = new Cookies();
        this.setState({ loading: true });
        const name = cookies.get("usernameid");
        const body = {
            "queueId": data[this.state.j].id,
            "username": name
        };

        let apifl = true;

        await axios.post(
            "https://digiline.azurewebsites.net/api/leavequeue",
            body,
            {
                headers: {
                    "queueId": data[this.state.j].id,
                    "username": name
                }
            }
        ).catch(err => {
            apifl = false;
            console.log(err.response.data.message)
            console.log("fail");
        })

        if (apifl) {
            window.location.href = '/components/joinedlines';
        }
        this.setState({ loading: false });
    }

    divclick = (e) => {
        this.setState({ j: e.target.id, show: true });
    }

    render() {
        return (
            <div>
                <LoadingScreen
                    loading={this.state.pageload}
                    bgColor='#f1f1f1'
                    spinnerColor='#b5373c'
                    logoSrc={img4}
                >
                </LoadingScreen>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xl-7'>

                            <div className='joinedlinescon'>
                                <h1 className='joinedhead'>Joined Queues ({this.state.isempty ? 0 : data.length})</h1>
                                {data.map((a, i) =>
                                    <div className='listdiv' key={i} id={this.state.isempty ? 'hidden' : undefined}>
                                        <div className='listiconcon'>
                                            <FontAwesomeIcon icon={faShoppingCart} className='listicon' id={!(a.tag == "Shopping") ? 'hidden' : undefined} />
                                            <FontAwesomeIcon icon={faBuilding} className='listicon' id={!(a.tag == "Office") ? 'hidden' : undefined} />
                                            <FontAwesomeIcon icon={faUtensils} className='listicon' id={!(a.tag == "Restaurant") ? 'hidden' : undefined} />
                                            <FontAwesomeIcon icon={faUser} className='listicon' id={!(a.tag == "Other") ? 'hidden' : undefined} />
                                        </div>
                                        <div className='listbutcon'>
                                            <Button loading={this.state.loading} className='listbut' onClick={() => this.onleave(i)} id="hidden">Leave Q</Button>
                                        </div>
                                        <div className='listbutcon'>
                                            <Button className='listbut listinfobut' onClick={this.divclick} id={i}>Info</Button>
                                        </div>
                                        <div className='listnocon'>
                                            <p className='listno'>{a.position}</p>
                                            <span>Pos</span>
                                        </div>
                                        <p className='listname'>{a.name}</p>
                                        <span className='listtext'><FontAwesomeIcon icon={faMapMarkerAlt} className='listlocicon' />{a.city}</span>
                                        <span className='listtext'>#{a.id}</span>

                                    </div>
                                )}


                            </div>
                        </div>
                        <div className='col-xl-5'>
                            <div className='showlinescon' id={!this.state.show ? 'hidden' : undefined}>
                                <div className='showiconcon'>
                                    <FontAwesomeIcon icon={faShoppingCart} className='showicon' id={!(data[this.state.j].tag == "Shopping") ? 'hidden' : undefined} />
                                    <FontAwesomeIcon icon={faBuilding} className='showicon' id={!(data[this.state.j].tag == "Office") ? 'hidden' : undefined} />
                                    <FontAwesomeIcon icon={faUtensils} className='showicon' id={!(data[this.state.j].tag == "Restaurant") ? 'hidden' : undefined} />
                                    <FontAwesomeIcon icon={faUser} className='showicon' id={!(data[this.state.j].tag == "Other") ? 'hidden' : undefined} />
                                </div>
                                <p className='showlistname'>{data[this.state.j].name}</p>
                                <div className='showlisttextcon'>
                                    <span className='showlisttext'><FontAwesomeIcon icon={faMapMarkerAlt} className='listlocicon' />{data[this.state.j].city}</span>
                                    <span className='showlisttext'>#{data[this.state.j].id}</span>
                                </div>
                                <div className='showlistboxcon'>
                                    <div className='showlineuserbox'>
                                        <p className='showlineuserno'>{data[this.state.j].position}</p>
                                        <p className='showlineusertext'>In Queue</p>
                                    </div>
                                    <div className='showlineuserbox'>
                                        <p className='showlinetimeno'>{data[this.state.j].time}<span style={{ fontSize: "15px", marginLeft: "5px" }}>min</span></p>
                                        <p className='showlineusertext'>Exp. Time</p>
                                    </div>
                                </div>
                                <div className='showlistbutcon'>
                                    <Button loading={this.state.loading} className='listbut' onClick={() => this.onleave(this.state.j)}>Leave Q</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinedLinesdiv;