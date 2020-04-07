import React,{useEffect,useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {Link} from 'react-router-dom'
import "./Session.css"
import {Card,Button,Badge} from 'react-bootstrap';
import Online from './SessionComponents/Online.js'
import Qusetion from './SessionComponents/Question.js'
import Input from './Input.js'
import Code from './SessionComponents/Code.js'
import Messages from './Messages.js'
var socket;

const Session = ({location}) => {
    const [name,setName]=useState('');
    const [role,setRole]=useState('');
    const [question,setQuestion]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const [users,setUsers]=useState([]);
    const [user,setUser]=useState('');
    const [code,setCode]=useState('');
    const [line, setLine] = useState('')
    const ENDPOINT='localhost:5000';
    
    useEffect(()=>{
        const {name,role}=queryString.parse(location.search)
        setName(name);
        setRole(role);
        socket=io(ENDPOINT);
        socket.emit('join',{name,role});
        return ()=>{
            socket.emit('logOut');
        }
    },[ENDPOINT,location.search])
    
    useEffect(()=>{
        
        socket.on('allusers',(users)=>{
            setUsers(users)
        })

        socket.on('question',(question)=>{
            setQuestion(question);
        });
        
        socket.on('message',(message)=>{
            setMessages([...messages,message]);   
        })
        
        socket.on('messages',(prevMessages)=>{
            setMessages([...messages,...prevMessages]);   
        })
        socket.on('pinQuestion',(pinQuestion)=>{
            setQuestion(pinQuestion)
        })
        socket.on('prevCode',(code)=>{
            setCode(code)
        })
        socket.on('thisUser',(user)=>{
            setUser(user)
        })
        socket.on('sourceCode',(code)=>{
            setCode(code);
        })
    },[messages,users,question,code]);

    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,line,()=>{
                setMessage('')
                setLine('')
            })
        } 
    }
    const handleLogout=(event)=>
    {
        event.preventDefault()
        socket.emit('logOut');           
    }
    return (
        <div className="Session">
            <Card border="secondary" className="Online" >
                    <Card.Header>Online</Card.Header>
                    <Card.Body>                    
                    <Online users={users}/>     
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={handleLogout} variant="outline-dark">
                        <Link to="/">
                            LogOut
                        </Link>           
                        </Button>     
                    </Card.Footer>
                </Card>
            
            <div className="InterviewSession">
            <Card border="secondary" >
                    <Card.Header>InterviewSession</Card.Header>
                    <Card.Body>                    
                    <Qusetion socket={socket} user={user} setquestion={question}/>  
                    <div className="Code"><Code socket={socket}  code={code} setLine={setLine}/></div>    
                    </Card.Body>
                </Card>
            </div>
                
                <Card border="secondary" className="Chat" >
                    <Card.Header>Chat</Card.Header>
                    <Card.Body>                    
                        <Messages messages={messages} line={line} thisuser={user}></Messages>  
                    </Card.Body>
                    <Card.Footer>
                        {(line && (role==="interviewer")) ? (<Badge variant="warning" > {line}</Badge>):null}
                        <Input  message={message} setMessage={setMessage} sendMessage={sendMessage} />
                    </Card.Footer>
                </Card>
        </div>
    )
}

export default Session
