import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

class Editor extends React.Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            editor_text: props.editor_text
        }

        this.onChange = this.onChange.bind(this);
    }

    onChange = (newValue) => {
        console.log("change", newValue);
        this.setState({editor_text: newValue})
    }

    render() {
        return (
            <AceEditor
                mode="java"
                theme="github"
                onChange={this.onChange}
                name="UNIQUE_ID_OF_DIV"
                fontSize={14}
                value={this.props.editor_text}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}                
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4,
                }}                
          />
        );
    }
}

export default Editor;