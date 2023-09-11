import {useState} from 'react'

function Profile() {

    const name = sessionStorage.getItem('name');

    const token = sessionStorage.getItem('token');
  

  return (
    <div>
      <h1 className="">{name}</h1>
      
    </div>
  )
}

export default Profile
