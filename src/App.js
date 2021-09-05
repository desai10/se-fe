import logo from './logo.svg';
import './App.css';
import React from 'react'
import { ActionCable } from 'react-actioncable-provider';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    this.fetchMessages()
  };

  fetchMessages = () => {
    fetch('http://localhost:3000/messages')
      .then(res => res.json())
      .then(messages => this.setState({ messages: messages }))
  }

  handleReceivedMessage = message => {
    this.setState({ messages: [...this.state.messages, message] })
  }

  mapMessages = () => {
    return this.state.messages.map((message, i) => 
      <li key={i}>{message.content}</li>)
  }

  handleMessageSubmit = e => {
    e.preventDefault();
    const messageObj = {
      message: {
        content: e.target.message.value
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
        <ActionCable
          channel={{ channel: 'MessagesChannel' }}
          onReceived={this.handleReceivedMessage}
        />
        <h2>Messages</h2>
        <ul>{this.mapMessages()}</ul>
        <form onSubmit={this.handleMessageSubmit}>
          <input name='message' type='text' />
          <input type='submit' value='Send message' />
        </form>
      </div>
    );
  }
}

export default App;
