import React from 'react';
import { Button, Form, Header, Modal } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import assert from 'assert';
import axios from "axios";
import { Component } from 'react/cjs/react.production.min';

class CreateModulePopup extends Component {
    state = {
        qname: "",
        qtime: "",
        qcity: "",
        qtag: "Shopping",
        openm: false,
        loading: false,
        namem: '',
        timem: '',
        citym: ''
    }

    onSubmitid = async (e) => {
        const cookies = new Cookies();
        const cookname = cookies.get("usernameid");
        e.preventDefault();

        this.setState({ loading: true, namem: '', timem: '', citym: '' });

        let flag = true;

        try {
            assert.ok(this.state.qname.length >= 1);
        } catch (err) {
            flag = false;
            this.setState({ namem: 'Enter queue name' });
        }
        try {
            assert.ok(this.state.qtime.length >= 1)
            assert.ok(this.state.qtime >= 1)
        } catch (err) {
            flag = false;
            this.setState({ timem: 'Enter expected time per user' });
        }
        try {
            assert.ok(this.state.qcity.length >= 1)
        } catch (err) {
            flag = false;
            this.setState({ citym: 'Enter city name' });
        }

        if (flag) {
            const body = {
                "username": cookname,
                "name": this.state.qname,
                "time": parseInt(this.state.qtime),
                "city": this.state.qcity,
                "tag": this.state.qtag
            };

            let apifl = true;

            await axios.post(
                "https://digiline.azurewebsites.net/api/createqueue",
                body,
                {
                    headers: {
                        "username": cookname,
                        "name": this.state.qname,
                        "time": parseInt(this.state.qtime),
                        "city": this.state.qcity,
                        "tag": this.state.qtag
                    }
                }
            ).catch(err => {
                apifl = false;
            })

            if (apifl) {
                window.location.href = '/components/createdlines';
            }
        }

        this.setState({ loading: false });
    }
    render() {
        return (
            <Modal
                closeIcon
                open={this.state.open}
                trigger={<Button className='topnavbut'>Create Q</Button>}
                onClose={() => this.setState({ openm: false })}
                onOpen={() => this.setState({ openm: true })}
            >
                <Header content='Create Queue' />
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Queue name</label>
                            <input placeholder='Dominos' value={this.state.qname} onChange={event => { this.setState({ qname: event.target.value }) }} />
                            <span className='errbox'>{this.state.namem} </span>
                        </Form.Field>
                        <Form.Field>
                            <label>City</label>
                            <input placeholder='Mumbai' value={this.state.qcity} onChange={event => { this.setState({ qcity: event.target.value }) }} />
                            <span className='errbox'>{this.state.citym} </span>
                        </Form.Field>
                        <Form.Field>
                            <label>Estimated time per user (in min)</label>
                            <input type='tel' placeholder='2' value={this.state.qtime} onChange={event => { this.setState({ qtime: event.target.value }) }} />
                            <span className='errbox'>{this.state.timem} </span>
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <select value={this.state.qtag} onChange={event => { this.setState({ qtag: event.target.value }) }}>
                                <option value="Shopping">Shopping</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Office">Office</option>
                                <option value="Other">Others</option></select>
                        </Form.Field>
                        <Button loading={this.state.loading} onClick={this.onSubmitid} className='modalnavbut'>Create</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default CreateModulePopup;