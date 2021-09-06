import logo from './logo.svg';
import './App.css';
import React from 'react'
import { ActionCableConsumer } from "@thrash-industries/react-actioncable-provider";

class App extends React.Component {
  constructor(props) {
    super(props)
    const { roomid } = this.props;
    this.state = {
      title: '',
      messages: [],
      room_id: roomid
    }
  }

  componentDidMount() {
    this.fetchMessages()
  };

  fetchMessages = () => {
    fetch('http://localhost:3000/room/' + this.state.room_id)
      .then(res => res.json())
      .then(room => {
        this.setState({ messages: room.messages, title: room.title })
      })
  }

  handleReceivedMessage = nm => {
    this.setState({ messages: [...this.state.messages, nm.message] })
  }

  mapMessages = () => {
    return this.state.messages.map((message, i) => 
      <li key={i}>{message.content}</li>)
  }

  handleMessageSubmit = e => {
    e.preventDefault();
    const messageObj = {
      message: {
        content: e.target.message.value,
        room_id: this.state.room_id
      }
    }
    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageObj)
    }
    fetch('http://localhost:3000/messages', fetchObj)
    e.target.reset()
  }

  render() {
    return (
      <div className="App">
        <ActionCableConsumer
          channel={{ channel: 'MessagesChannel', room: this.state.room_id }}
          onReceived={this.handleReceivedMessage}>
            <h2>Messages</h2>
            <ul>{this.mapMessages()}</ul>
        </ActionCableConsumer>
        <form onSubmit={this.handleMessageSubmit}>
          <input name='message' type='text' />
          <input type='submit' value='Send message' />
        </form>
      </div>
    );
  }
}

export default App;
