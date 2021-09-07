import React from 'react';
import { ActionCableProvider } from "@thrash-industries/react-actioncable-provider";
import App from './App';
import consts from './Constants';

class AppWrapper extends React.Component {

    render() {
        const { roomid } = this.props.match.params;
        return (
            <ActionCableProvider url={consts.WS_BASE}>
                <App roomid={roomid}/>
            </ActionCableProvider>
        );
    }
}

export default AppWrapper;