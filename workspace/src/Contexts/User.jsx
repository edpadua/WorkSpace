import { createContext, useState } from 'react';

export const UserContext = createContext();
UserContext.displayName = "User"

export default function UserProvider({ children }) {
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    return (
      <UserContext.Provider
        value={{
          token,
          setToken,
          name,
          setName,
          type,
          setType
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }