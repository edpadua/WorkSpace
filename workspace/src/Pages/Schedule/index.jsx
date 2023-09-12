import { useState, useEffect, useContext } from "react";

import { useForm } from "react-hook-form";

import Position from "../../Components/Position";

import Datepicker from "react-tailwindcss-datepicker";

import tw from "tailwind-styled-components";

import { getDates, getAgenda } from "../../Utils/dates";

import {UserContext} from "../../Contexts/User";

import { PositionContext } from "../../Contexts/Position";

const ListaPosicoes = tw.div`
   pb-10 lg:w-1/2
`;

import {
  Form,
  Input,
  Button,
  Select,
  Error,
  Lista,
  ListaTitulo,
  ListaItem,
  PageTitle,
} from "../../GlobalStyles";

function Schedule() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();



  const [endereco, setEndereco] = useState("");

  const [datas, setDatas] = useState([]);

  const [agenda, setAgenda] = useState([]);

  const [data, setData] = useState({
    startDate: null,
    endDate: null,
  });

  const { getPositions,  positions} = useContext(PositionContext);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  
  return (
    <div>
      <PageTitle>Agendas</PageTitle>

      <ListaPosicoes>
        
        {positions.length > 0 &&
          positions.map((position, index) =>
              
              <div key={index} className="pb-4">
                <Position position={position} />
              </div>
            
          )}
      </ListaPosicoes>
    </div>
  );
}

export default Schedule;
