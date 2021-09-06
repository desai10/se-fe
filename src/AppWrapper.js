import React from 'react';
import { ActionCableProvider } from "@thrash-industries/react-actioncable-provider";
import App from './App';

class AppWrapper extends React.Component {

    render() {
        const { roomid } = this.props.match.params;
        return (
            <ActionCableProvider url={'ws://localhost:3000/cable'}>
                <App roomid={roomid}/>
            </ActionCableProvider>
        );
    }
}

export default AppWrapper;