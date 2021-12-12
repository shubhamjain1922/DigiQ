import React from 'react';
import { Button, Form, Header, Message, Modal } from 'semantic-ui-react';
import ReactCodeInput from 'react-code-input';
import Cookies from 'universal-cookie';
import assert from 'assert';
import axios from "axios";
import img1 from '../images/img1.jpg';
import { Component } from 'react/cjs/react.production.min';

class ModulePopup extends Component {
    state = {
        loading: false,
        errmssg: '',
        open: false,
        pinCode: ''
    }


    onSubmitid = async (e) => {
        const cookies = new Cookies();
        const cookname = cookies.get("usernameid");
        e.preventDefault();

        this.setState({ errmssg: "", loading: true });

        let flag = true;

        try {
            assert.ok(this.state.pinCode.length == 4);
        } catch (err) {
            flag = false;
            this.setState({ errmssg: 'Line ID should be 4 characters long' });
        }

        if (flag) {
            const body = {
                "queueId": this.state.pinCode,
                "username": cookname
            };

            let apifl = true;

            const response = await axios.post(
                "https://digiline.azurewebsites.net/api/joinqueue",
                body,
                {
                    headers: {
                        "queueId": this.state.pinCode,
                        "username": cookname
                    }
                }
            ).catch(err => {
                apifl = false;
                this.setState({ errmssg: err.response.data.message });
            })

            if (apifl) {
                window.location.href = '/components/joinedlines';
                console.log(response);
            }
        }

        this.setState({ loading: false });
    }
    handlePinChange = pinCode => {
        this.setState({ pinCode: pinCode })
    };
    render() {
        return (
            <Modal
                closeIcon
                open={this.state.open}
                trigger={<Button className='topnavbut'>Join Q</Button>}
                onClose={() => this.setState({ open: false })}
                onOpen={() => this.setState({ open: true })}
            >
                <Header content='Enter Queue ID :' />
                <Modal.Content>
                    <img src={img1} className='popimg' alt=""/>
                    <ReactCodeInput type='number' value={this.state.pinCode} fields={4} onChange={this.handlePinChange} id="pinCode" />
                    <Form error={!!this.state.errmssg}>
                        <Message error header="Oops" content={this.state.errmssg}></Message>
                        <Button loading={this.state.loading} onClick={this.onSubmitid} className='modalnavbut'>Join</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default ModulePopup;