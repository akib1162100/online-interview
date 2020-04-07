import React from 'react';
import {Form,InputGroup,Button} from 'react-bootstrap';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) =>{ 


  return(
    <InputGroup>
    <Form.Control as="textarea" rows="2" placeholder="Type a message..."  value={message}
    onChange={({ target: { value } }) => setMessage(value)}
    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <InputGroup.Append>
      <Button
      onClick={e => sendMessage(e)}
      variant="outline-dark">Send</Button>
      </InputGroup.Append>
    </InputGroup>

  )
}
export default Input
