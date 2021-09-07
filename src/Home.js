import React from 'react'
import consts from './Constants';
import { withRouter } from "react-router-dom";

class Home extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        const messageObj = {
            room: {
                title: e.target.title.value
            }
        }
        const fetchObj = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(messageObj)
        }
        fetch(consts.API_BASE + '/room', fetchObj)
            .then(res => res.json())
            .then(r => {
                if (r.id != null) {
                    console.log(r.id)
                    this.props.history.push('/room/' + r.id);
                }
            })
        e.target.reset()
    }

    render() {
        return (
          <div className="Home">
            <h2>Create new room!</h2>
            <form onSubmit={this.handleSubmit}>
              <input name='title' type='text' />
              <input type='submit' value='Create room!' />
            </form>
          </div>
        );
    }
}

export default withRouter(Home);