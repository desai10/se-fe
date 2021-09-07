import './UsernameModel.css'
import React from 'react';
import consts from './Constants';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { Button, FormControl, InputGroup} from 'react-bootstrap';

class AppWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            disp: 'flex'
        }
    }

    createUser = () => {
        const userObj = {
            user: {
                username: this.state.username,
                client_id: uuidv4()
            }
        }
    
        const fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        }
    
        fetch(consts.API_BASE + 'user', fetchObj)
            .then(res => res.json())
            .then(r => {
                Cookies.set('username', r.username)
                Cookies.set('user_id', r.id)
                Cookies.set('client_id', r.client_id)
                this.setState({disp: 'none'})
            })
    }

    render() {
        return (
            <div id="modal" display={this.state.disp}>
                <div>
                    <h4>Add a name</h4>
                    <InputGroup class="mb-3" id="set_name">
                        <FormControl name="add_name" id="add_name" value={this.state.username ? this.state.username : ""} onChange={(e) => this.setState({username: e.target.value})} placeholder="User name" aria-label="New message" aria-describedby="basic-addon2" />
                        <Button variant="outline-secondary" id="button-addon2" onClick={() => this.createUser()}>Submit</Button>
                    </InputGroup>
                </div>
            </div>
        );
    }
}

export default AppWrapper;