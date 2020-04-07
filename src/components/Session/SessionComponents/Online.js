import React from 'react'
const Online = ({users}) => {
    return (
        <ul>
            {users.map(user=><li id={user.name}>{user.name+"("+user.role+")"}</li>)}
        </ul>
    )
}

export default Online
