import { createContext, useState } from "react";

import axios from "axios";

export const PositionContext = createContext();
PositionContext.displayName = "Position";

export default function UserProvider({ children }) {
  const [positions, setPositions] = useState([]);


  const URL_API = import.meta.env.VITE_API_URL;

  const positionRegister = async (position) => {
    try {
      const response = await axios.post(
        `${URL_API}positions`,
        JSON.stringify(position),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const positionUpdate = async (position, positionUpdated) => {
    console.log("Posição Updated", positionUpdated);
    try {
      const response = await axios.put(
        `${URL_API}positions/${position._id}`,
        JSON.stringify(positionUpdated),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getPositions = async () => {
    const url_pesquisa = `${URL_API}positions`;

    const res = await axios.get(url_pesquisa);
    setPositions(res.data);
  };

  return (
    <PositionContext.Provider
      value={{
        positionRegister,
        getPositions,
        positions,
        positionUpdate
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}
