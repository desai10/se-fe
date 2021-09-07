import './App.css';
import React from 'react'
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";
import { Alert, Button, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import Editor from './Editor';
import consts from './Constants';
import UsernameModel from './UsernameModel';
import Cookies from 'js-cookie';

class App extends React.Component {
  constructor(props) {
    super(props)
    const { roomid } = this.props;
    this.state = {
      title: '',
      messages: [],
      room_id: roomid,
      username: Cookies.get('username'),
      user_id: Cookies.get('user_id'),
      client_id: Cookies.get('client_id')
    }
  }

  componentDidMount() {
    this.fetchMessages()
  };

  fetchMessages = () => {
    fetch(consts.API_BASE + '/room/' + this.state.room_id)
      .then(res => res.json())
      .then(room => {
        this.setState({ messages: room.messages, title: room.title })
      })
  }

  handleReceivedMessage = nm => {
    this.setState({ messages: [...this.state.messages, nm.message] })
  }

  mapMessages = () => {
    return this.state.messages.map((message, i) => <Row><Col><Alert key={message.id} variant="info">{message.content}</Alert></Col></Row>)
  }

  handleMessageSubmit = () => {
    if (this.state.new_message) {
      const messageObj = {
        message: {
          content: this.state.new_message,
          room_id: this.state.room_id,
          user_id: this.state.user_id
        }
      }
      const fetchObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageObj)
      }
      fetch(consts.API_BASE + 'messages', fetchObj)
      this.setState({new_message: ""})
    }
  }

  updateUserFromCookies = () => {
    this.setState({
      username: Cookies.get('username'),
      user_id: Cookies.get('user_id'),
      client_id: Cookies.get('client_id')      
    })
  }

  render() {
    return (
      <div className="App">
        {(this.state.user_id == null) && <UsernameModel />}
        <Container fluid>
          <Row>
            <Col>
              <h1>{this.state.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Editor />
            </Col>
            <Col sm={4}>
              <Row>
                <Col>
                  <ActionCableConsumer channel={{ channel: 'MessagesChannel', room: this.state.room_id }} onReceived={this.handleReceivedMessage}>
                      <h2>Messages</h2>
                      {this.mapMessages()}
                  </ActionCableConsumer>            
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup class="mb-3">
                    <FormControl value={this.state.new_message ? this.state.new_message : ""} onChange={(e) => this.setState({new_message: e.target.value})} placeholder="New message..." aria-label="New message" aria-describedby="basic-addon2" />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => this.handleMessageSubmit()}>Submit</Button>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        {/* <form onSubmit={this.handleMessageSubmit}>
          <input name='message' type='text' />
          <input type='submit' value='Send message' />
        </form> */}
      </div>
    );
  }
}

export default App;
