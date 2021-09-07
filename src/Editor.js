import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

function onChange(newValue) {
    console.log("change", newValue);
}

class Editor extends React.Component {

    render() {
        return (
            <AceEditor
                mode="java"
                theme="github"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                fontSize={14}
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