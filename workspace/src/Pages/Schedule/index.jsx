import { useState, useEffect, useContext } from "react";

import { useForm } from "react-hook-form";

import Position from "../../Components/Position";

import Datepicker from "react-tailwindcss-datepicker";

import axios from "axios";

import tw from "tailwind-styled-components";

import { getDates, getAgenda } from "../../Utils/dates";

import {UserContext} from "../../Contexts/User";

const ListaPosicoes = tw.div`
   py-10 lg:w-1/2
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

  const [posicoes, setPosicoes] = useState([]);

  const [enderecoLista, setEnderecoLista] = useState([]);

  const { token, setToken, name, setName, type, setType } = useContext(UserContext);

  useEffect(() => {
    const getPosicoes = async () => {
      const url_pesquisa = "http://localhost:3000/positions";

      const res = await axios.get(url_pesquisa);
      setPosicoes(res.data);
    };

    getPosicoes();
  }, [setPosicoes, posicoes]);


  return (
    <div>
      <h1>Agendas</h1>

      <ListaPosicoes>
        
        {posicoes.length > 0 &&
          posicoes.map((position, index) =>
            
              <div key={index} className="pb-4">
                <Position position={position} />
              </div>
            
          )}
      </ListaPosicoes>
    </div>
  );
}

export default Schedule;
