import {useState} from 'react'

function Profile() {

    const name = sessionStorage.getItem('name');

    const token = sessionStorage.getItem('token');
  
    const [userLogged, setUserLogged] = useState(token !== null);

  return (
    <div>
      <h1 className="">{name}</h1>
      <p>{sessionStorage.getItem('token')}</p>
    </div>
  )
}

export default Profile
