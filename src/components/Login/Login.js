import React ,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'

const Login = () => {
    const[name,setName]=useState('');
    const[role,setRole]=useState('interviewer');
    return (
        <div className="Login">
        <Form>
            <Form.Label style={{display: 'flex', justifyContent: 'center'}}>UserName</Form.Label>
            <Form.Control type="text" placeholder="Enter UserName" id="UserName" onChange={(event)=>setName(event.target.value)}/>
            <Form.Group >
                <Form.Control id="Role" onChange={(event)=>setRole(event.target.value)} as="select" custom >
                <option value="interviewer">Interviewer</option>
                <option value="candidate">Candidate</option>
                </Form.Control>
            </Form.Group>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Link onClick={(event)=>(!name) ? event.preventDefault() :null } to={'/session?name='+name+'&role='+role}>
                    <Button  variant="outline-primary">Enter</Button>
                    </Link>
                </div>
        </Form>
    </div>

    )
}

export default Login
