import { createContext, useState } from 'react';

export const UserContext = createContext();
UserContext.displayName = "User"

export default function UserProvider({ children }) {
    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState(0);
    return (
      <UserContext.Provider
        value={{
          nome,
          setNome,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }