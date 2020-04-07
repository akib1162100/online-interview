const users=[];
const addUser=({id,name,role})=>{
    const user={id,name,role}
    users.push(user);
    return{user};
}
const getUser=(id)=>users.find((user)=>user.id===id);

const getUsers=()=>users;

const removeUser=(id)=>{
    const index= users.findIndex((user)=>user.id===id);
    console.log(index)
    if(index>-1)
    {
        users.splice(index,1)[0];
        return users;
    }
}

module.exports={addUser,getUser,removeUser,getUsers}