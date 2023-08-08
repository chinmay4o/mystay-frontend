import React from 'react'
import { UserContext } from '../../context/hotelsContext'
import {useHistory} from 'react-router-dom'
import { useState } from 'react'

const UserBookings = () => {
    const { userData } = React.useContext(UserContext)
    const history = useHistory();
    const [data, setData ]= useState(userData);

    React.useEffect(() => {
        if(userData) setData(userData);

        console.log(data);
    },[userData])

  return (
    <div>
        <div>
            <div>{data.roomBookings}</div>
            {data && data.roomBookings.length>0 && data.roomBookings.map((room) => {
                console.log(room);
                return(<div>Hello</div>)
            })}
        </div>
    </div>
  )
}

export default UserBookings