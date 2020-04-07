import React, { useState } from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import {Button} from 'react-bootstrap'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/javascript/javascript'
import './Code.css'

const Code = ({socket,code,setLine}) => {
    const [value,setValue]=useState(code)
    const [data, setData] = useState('')
    const [editor, setEditor] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault();
        socket.emit('codeSubmit',value)
    }
    return (
        <div>
            <CodeMirror
            className="Codemirror"
            value={code}
            options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true
            }}
            
            onChange={(editor, data, value) => {
                setValue(value)
                setData(data)
                setEditor(editor)    
                console.log(editor)
            }}
            onDblClick={(editor)=>{
                var lineNo= editor.getCursor().line;
                var textLine= editor.doc.getLine(lineNo).trim();
                setLine(textLine)
            }}
            /> 
            <div id='bottom'>
            <Button variant="outline-dark" className="Button" onClick={handleSubmit}>submit</Button>
            </div>
        </div>
    )
}

export default Code

