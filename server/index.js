const express=require('express');
const socketio=require('socket.io');
const  http=require('http');
const PORT=process.env.PORT|| 5000;

const app=express();
const server=http.createServer(app);
server.listen(PORT,()=>{console.log('server has started at port ' + PORT)})
const io=socketio(server);
const {addUser,getUser,removeUser,getUsers}=require('./users');
const{addMessages,getMessages,addQuestion,getQuestion,removeMessages,addCode,getCode,removeCode,removeQuestion}=require('./messages')

io.on('connection',(socket)=>{

    socket.on('join',({name,role}, callBack)=>{
        console.log(socket.id)
        const{user}=addUser({id:socket.id,name,role});
        const users=getUsers();
        const messages=getMessages();
        const code=getCode();
        const question=getQuestion();
        socket.emit('message',{user:'Admin',text:(user.name)+' Welcome to our Session'});
        socket.emit('allusers',(users))
        socket.emit('thisUser',user)
        socket.emit('messages',messages)
        socket.emit('prevCode',code)
        if(question)
        {
            socket.emit('pinQuestion',question)
        }
        console.log((user.name)+' Has joioned')
        socket.broadcast.emit('allusers',(users))
        socket.join();
    })
    socket.on('sendMessage',(message,line,callBack)=>{
        const user=getUser(socket.id);
        if(user.role==="candidate")
        {
        io.emit('message', {user:user,text:message,line:null});
        addMessages({user:user,text:message,line:null})    
        }
        else
        {
        io.emit('message', {user:user,text:message,line:line});
        addMessages({user:user,text:message,line:line})
        callBack();
        }
    })
    
    socket.on('setQuestion',(message,detail,callBack)=>{
        const user=getUser(socket.id);
        io.emit('question', {user:user,text:message,detail:detail});
        addQuestion({user:user,text:message,detail:detail});
        callBack();
    })

    socket.on('codeSubmit',(value)=>{
        io.emit('sourceCode',value)
        addCode(value)
        console.log(value)
    })

    socket.on('disconnect',()=>{
        removeUser(socket.id)
        console.log('user disconnected from socket no '+ socket.id)
    })
   
    socket.on('logOut',()=>{
        removeUser(socket.id)
        console.log('user disconnected from socket no '+ socket.id)
        const users=getUsers()
        io.emit('allusers',(users))
        if(users.length===0)
        {
            removeMessages();
            removeQuestion();
            removeCode();
        }
    })

})


