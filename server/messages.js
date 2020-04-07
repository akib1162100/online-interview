const messages=[];
var question=null;
var code=null;
const addMessages=(message)=>{
    messages.push(message)
}
const getMessages=()=>messages;

const addQuestion=(pinnedQuestion)=>{
    question=pinnedQuestion;
}
const getQuestion=()=>question
const getCode=()=>code
const removeMessages=()=>{
    messages.splice(0,messages.length)
}

const addCode=(sentCode)=>{
    code=sentCode;
}
const removeCode=()=>{
    code=null;
}
const removeQuestion=()=>{
    question=null;
}

module.exports={addMessages,getMessages,addQuestion,getQuestion,removeMessages,addCode,getCode,removeCode,removeQuestion}