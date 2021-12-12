import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { Button } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import Nav from './Nav';
import '../App.css';
import img1 from '../images/img1.jpg';
import axios from "axios";
import LoadingScreen from 'react-loading-screen';
import img4 from '../images/img4.png';
var QRCode = require('qrcode.react');

class MycreatedLine extends Component {
    state = {
        qid: '8827',
        userno: '0',
        name: 'Line do not exist',
        username: '',
        delload: false,
        nextload: false,
        deacload: false,
        actload: false,
        errmsg: '',
        activ: true,
        pageload: true
    }
    componentDidMount = async () => {
        const cookies = new Cookies();
        const name = cookies.get("auth");
        const lid = await cookies.get("qid");
        this.setState({ qid: lid });
        if (name == "false") {
            window.location.href = '/components/login';
        }
        const body = {
            "queueId": parseInt(this.state.qid)
        };

        let apifl = true;

        const response = await axios.post(
            "https://digiline.azurewebsites.net/api/queueinfo",
            body,
            {
                headers: {
                    "queueId": parseInt(this.state.qid)
                }
            }
        ).catch(err => {
            apifl = false;
            // console.log(err.response.data.message)
        })

        if (apifl) {
            this.setState({ userno: response.data.count, name: response.data.name, username: response.data.admin, activ: response.data.is_active });
            console.log(response);
        }

        this.setState({pageload: false});
    }

    del = async () => {
        const body = {
            "queueId": parseInt(this.state.qid),
            "username": this.state.username
        };

        this.setState({ delload: true, errmsg: '' });

        let apifl = true;

        await axios.post(
            "https://digiline.azurewebsites.net/api/deletequeue",
            body,
            {
                headers: {
                    "queueId": parseInt(this.state.qid),
                    "username": this.state.username
                }
            }
        ).catch(err => {
            apifl = false;
            this.setState({ errmsg: "Couldn't delete queue, try again" })
        })

        if (apifl) {
            window.location.href = '/components/landing';
        }
        this.setState({ delload: false });
    }

    nex = async () => {
        const body = {
            "queueId": parseInt(this.state.qid)
        };

        this.setState({ nextload: true, errmsg: '' });

        let apifl = true;

        await axios.post(
            "https://digiline.azurewebsites.net/api/gonext",
            body,
            {
                headers: {
                    "queueId": parseInt(this.state.qid)
                }
            }
        ).catch(err => {
            apifl = false;
            this.setState({ errmsg: err.response.data.message })
        })

        if (apifl) {
            this.componentDidMount();
        }
        this.setState({ nextload: false });
    }
    deac = async () => {
        const body = {
            "queueId": parseInt(this.state.qid)
        };

        this.setState({ deacload: true, errmsg: '' });

        let apifl = true;

        await axios.post(
            "https://digiline.azurewebsites.net/api/deactivatequeue",
            body,
            {
                headers: {
                    "queueId": parseInt(this.state.qid)
                }
            }
        ).catch(err => {
            apifl = false;
            this.setState({ errmsg: err.response.data.message })
        })

        if (apifl) {
            this.componentDidMount();
            this.setState({ activ: !this.state.activ });
        }
        this.setState({ deacload: false });
    }
    act = async () => {
        const body = {
            "queueId": parseInt(this.state.qid)
        };

        this.setState({ actload: true, errmsg: '' });

        let apifl = true;

        await axios.post(
            "https://digiline.azurewebsites.net/api/activatequeue",
            body,
            {
                headers: {
                    "queueId": parseInt(this.state.qid)
                }
            }
        ).catch(err => {
            apifl = false;
            this.setState({ errmsg: err.response.data.message })
        })

        if (apifl) {
            // this.componentDidMount();
            this.setState({ activ: !this.state.activ });
        }
        this.setState({ actload: false });
    }
    downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${this.state.qid}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    showSettings (event) {
        event.preventDefault();
      }
    render() {
        return (
            <div style={{ overflow: "hidden", height: "100vh" }}>
                <LoadingScreen
                    loading={this.state.pageload}
                    bgColor='#f1f1f1'
                    spinnerColor='#b5373c'
                    logoSrc={img4}
                >
                </LoadingScreen>
                <div style={{ float: "left" }}>
                    <Nav />
                </div>
                <div className='mylinewrap'>
                    <div className='mylinecon'>
                        <p className='mylinehead'>{this.state.name}</p>
                        <p className='mylinehead2'>#{this.state.qid}</p>
                        <div className='midbox'>
                            <div className='mylineuserbox'>
                                <h3 style={{fontFamily: "'Poppins', sans-serif", marginBottom: "0" }}>In Queue</h3>
                                <p className='mylineuserno'>{this.state.userno}</p>
                            </div>
                            <div className='qrdiv'>
                                <span>Scan the code to join the queue via digiQ app</span>
                                <QRCode id="qr-gen" value={this.state.qid} className="qrbox" level="H" size="75" />
                                <Button primary type="button" onClick={this.downloadQRCode} className='downqrbut'>
                                    Download QR Code
                                </Button>
                            </div>
                        </div>
                        <img src={img1} className='mylineimg' alt=""/>
                        <br />
                        <Button loading={this.state.nextload} className='topnavbut mylinebut mylinenextbut' onClick={this.nex}>Next Please</Button>
                        <Button loading={this.state.deacload} className='topnavbut mylinebut mylinefucbut' id={!this.state.activ ? 'hidden' : undefined} onClick={this.deac}>Deactivate</Button>
                        <Button loading={this.state.actload} className='topnavbut mylinebut mylinefucbut' id={this.state.activ ? 'hidden' : undefined} onClick={this.act}>Activate</Button>
                        <Button loading={this.state.delload} className='topnavbut mylinebut mylinedelbut' onClick={this.del}>Delete Queue</Button>
                        <br /><span className='errbox'>{this.state.errmsg}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MycreatedLine;
