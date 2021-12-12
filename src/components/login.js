import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { Link} from 'react-router-dom';
import { Button, Form, Card, Message } from 'semantic-ui-react'
import '../App.css';
import assert from 'assert';
import axios from "axios";
import img6 from '../images/img6.png';
import Cookies from 'universal-cookie';
import img4 from '../images/img4.png';
var QRCode = require('qrcode.react');

class SignUp extends Component {
    state = {
        name: '',
        pass: '',
        passmssg: '',
        namemssg: '',
        mssg: '',
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ mssg: '', passmssg: '', namemssg: '', loading: true });

        let flag = true;

        try {
            assert.ok(this.state.pass.length >= 7);
        } catch (err) {
            flag = false;
            this.setState({ passmssg: 'Password should be at least 7 characters long' });
        }
        try {
            assert.ok(this.state.name.length >= 5)
        } catch (err) {
            flag = false;
            this.setState({ namemssg: 'Name should be atleast 5 characters long' });
        }

        if (flag) {
            const body = {
                "username": this.state.name,
                "password": this.state.pass
            };

            let apifl = true;

            await axios.post(
                "https://digiline.azurewebsites.net/api/login",
                body,
                {
                    headers: {
                        "username": this.state.name,
                        "password": this.state.pass
                    }
                }
            ).catch(err => {
                apifl = false;
                this.setState({ mssg: err.response.data.message });
            })

            if (apifl) {
                const cookies = new Cookies();
                cookies.set('usernameid', this.state.name, { path: '/' });
                cookies.set('auth', true, { path: '/' });
                window.location.href = '/components/landing';
            }
        }

        this.setState({ loading: false });
    }
    render() {
        return (
            <div className='logincon'>
                <img src={img6} className='logimg' alt=""/>
                <Card color="purple" className='logcard'>
                    <Card.Content>
                        <Card.Header className='logheadcon'><img src={img4} className='loghead' alt="DigiQ"/></Card.Header>
                        <Card.Header className='logcre'>Login</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Form onSubmit={this.onSubmit} error={!!this.state.mssg}>
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='John_Dolt' value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                                <span className='errbox'>{this.state.namemssg} </span>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' placeholder='Password' value={this.state.pass} onChange={event => this.setState({ pass: event.target.value })} />
                                <span className='errbox'>{this.state.passmssg} </span>
                            </Form.Field>
                            <Message error header="Oops!" content={this.state.mssg} />
                            <Button loading={this.state.loading} className='logsignbut'>Login</Button>
                            <Link to="/components/signup">
                                <button className='logaccbut'>Don't have an account?</button>
                            </Link>
                        </Form>
                        <div className='qrdivsign'>
                            <QRCode id="qr-gen" value="https://i.diawi.com/ynR4hH" className="qrbox" level="H" size="75" />
                            <span>Scan the code to download DigiQ app</span>
                        </div>
                        <Button href="https://i.diawi.com/ynR4hH" primary type="button" className='downappbut'>
                            Download DigiQ app
                        </Button>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default SignUp;