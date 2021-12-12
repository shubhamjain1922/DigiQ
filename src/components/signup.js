import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { Link } from 'react-router-dom';
import { Button, Form, Card, Message } from 'semantic-ui-react'
import '../App.css';
import assert from 'assert';
import axios from "axios";
import img1 from '../images/img1.jpg';
import img4 from '../images/img4.png';
var QRCode = require('qrcode.react');

class SignUp extends Component {
    state = {
        name: '',
        num: '',
        pass: '',
        passmssg: '',
        namemssg: '',
        nummssg: '',
        apimssg: '',
        loading: false
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ passmssg: '', namemssg: '', nummssg: '', apimssg: '', loading: true });
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
        try {
            assert.ok(this.state.num.length == 10)
        } catch (err) {
            flag = false;
            this.setState({ nummssg: 'Phone number should be 10 characters long' });
        }

        if (flag) {
            const body = {
                "username": this.state.name,
                "password": this.state.pass,
                "phone": parseInt(this.state.num)
            };

            let apifl = true;

            await axios.post(
                "https://digiline.azurewebsites.net/api/signup",
                body,
                {
                    headers: {
                        "username": this.state.name,
                        "password": this.state.pass,
                        "phone": parseInt(this.state.num)
                    }
                }
            ).catch(err => {
                apifl = false;
                this.setState({ apimssg: err.response.data.message });
            })

            if (apifl) {
                window.location.href = '/components/login';
            }
        }
        this.setState({ loading: false });
    }
    render() {
        return (
            <div className='logincon'>
                <img src={img1} className='logimg' alt=""/>
                <Card color="purple" className='logcard'>
                    <Card.Content>
                        <Card.Header className='logheadcon'><img src={img4} className='loghead' alt="DigiQ"/></Card.Header>
                        <Card.Header className='logcre'>Create an Account</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Form onSubmit={this.onSubmit} error={!!this.state.apimssg}>
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='John_Dolt' value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                                <span className='errbox'>{this.state.namemssg} </span>
                            </Form.Field>
                            <Form.Field>
                                <label>Phone No.</label>
                                <input type='tel' value={this.state.num} onChange={event => this.setState({ num: event.target.value })} placeholder='98xxxxxx01' />
                                <span className='errbox'>{this.state.nummssg} </span>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type='password' placeholder='Password' value={this.state.pass} onChange={event => this.setState({ pass: event.target.value })} />
                                <span className='errbox'>{this.state.passmssg} </span>
                            </Form.Field>
                            <Message error header="Oops!" content={this.state.apimssg} />
                            <Button loading={this.state.loading} className='logsignbut'>Sign Up</Button>
                            <Link to="/components/login">
                                <button className='logaccbut'>Already have an account?</button>
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