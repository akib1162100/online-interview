import React,{useState} from 'react'
import {Form, Button,Collapse ,InputGroup} from 'react-bootstrap'
import './Question.css'

const Question = ({socket,user,setquestion}) => {
    const [question,setQuestion]=useState(setquestion.text);
    const [detail,setDetail]=useState(setquestion.detail);
    const [open,setOpen]=useState(false)
    const askQuestion=(event)=>{
        event.preventDefault();
        if(question){
            socket.emit('setQuestion',question,detail,()=>setQuestion(question))
        } 
    }
    const pinned=setquestion ?
        (
        <div>
        {(user.id===setquestion.user.id)?
        (
            <div >
            <InputGroup className="mb-3">
            <Form.Control type="text" value={question} id={user.id} onChange={(event)=>setQuestion(event.target.value)}
            onKeyPress={event=>event.key==='Enter'? askQuestion(event):null}/>
            <InputGroup.Append>
            <Button
            onClick={() => setOpen(!open)}
            aria-controls="detailCollapse"
            aria-expanded={open}
            variant="outline-secondary">Details</Button>
            </InputGroup.Append>
            </InputGroup>
            <Collapse in={open}>
            <Form.Control id="detailCollapse" rows="6" as="textarea" value={detail} id={user.id} onChange={(event)=>setDetail(event.target.value)}
            onKeyPress={event=>event.key==='Enter'? askQuestion(event):null}/>
            </Collapse>
            </div>   

        ):(
            <div>
            <InputGroup >
            <Form.Control type="text" readOnly value={setquestion.text} id={setquestion.user.id}/>
            <InputGroup.Append>
            <Button
            onClick={() => setOpen(!open)}
            aria-controls="detailCollapse"
            aria-expanded={open}
            variant="outline-secondary">Details</Button>
            </InputGroup.Append>
            </InputGroup>
            <Collapse in={open}>
            <Form.Control as="textarea" readOnly rows="6" value={setquestion.detail} id={setquestion.user.id}/>
            </Collapse>
            </div>    
        )}
        </div>
        )
          :
        (
        <div>
        {(user.role!=='candidate') ?
            (<div>
            <InputGroup className="mb-3">
            <Form.Control type="text" placeholder="Question" value={question} id={user.id} onChange={(event)=>setQuestion(event.target.value)}
            onKeyPress={event=>event.key==='Enter'? askQuestion(event):null}/>
            <InputGroup.Append>
            <Button
            onClick={() => setOpen(!open)}
            aria-controls="detailCollapse"
            aria-expanded={open}
            variant="outline-secondary">Details</Button>
            </InputGroup.Append>
            </InputGroup>
            <Collapse in={open}>
            <Form.Control id="detailCollapse" as="textarea" rows="6" id={user.id} onChange={(event)=>setDetail(event.target.value)}
            onKeyPress={event=>event.key==='Enter'? askQuestion(event):null}/>
            </Collapse>
            </div>
        ):null}
        </div>
        )

    return(
    <div className="Questions">
        {pinned}
    </div>
    )
    
}

export default Question
