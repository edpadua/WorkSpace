/* eslint-disable react/prop-types */
import { useState } from "react";

import axios from "axios";

import tw from "tailwind-styled-components";

import Datepicker from "react-tailwindcss-datepicker";

import { getDates, getAgenda } from "../../Utils/dates";

const dataPickerClass="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline";

const Card = tw.div`
rounded-lg border border-slate-300 p-4
`;

const MainInfo = tw.div`
pb-4
`;

const ButtonContainterList = tw.div`
place-self-center float-right
`;

const ButtonContainterAdicionar = tw.div`

`;

const ButtonContainterAtualizar = tw.div`
px-4
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

function Position({ position }) {
  const [posicaoAtual, setPosicaoAtual] = useState(position);

  const [datasCadastradas, setDatasCadastradas] = useState(
    position.datasAgendadas
  );

  const [agenda, setAgenda] = useState(position.agenda);

  const [detalhes, setDetalhes] = useState(false);

  const [data, setData] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDataChange = (newData) => {
    console.log("newData:", newData);
    setData(newData);
  };

  const showDetalhes = () => {
    if (detalhes) {
      setDetalhes(false);
    } else {
      setDetalhes(true);
    }
  };

  const addData = (e) => {
    e.preventDefault();

    console.log("data", data);
    const newAgenda = agenda.concat(getAgenda(data.startDate, data.endDate));
    const newDates = datasCadastradas.concat(
      getDates(data.startDate, data.endDate)
    );
    console.log("newAgenda", newAgenda);
    setAgenda(newAgenda);
    setDatasCadastradas(newDates);
    setData({
      startDate: null,
      endDate: null,
    });
  };

  const removeDates = (index) => {
    const newAgenda = [...agenda];
    const newDates = [...datasCadastradas];

    newAgenda.splice(index, 1);
    newDates.splice(index, 1);

    setAgenda(newAgenda);
    setDatasCadastradas(newDates);
  };

  const atualizaPosicao = async () => {
    const position = {
      id: posicaoAtual.id,
      endereco: posicaoAtual.endereco,
      departamento: posicaoAtual.departamento,
      sala: posicaoAtual.sala,
      mesa: posicaoAtual.mesa,
      agenda: agenda,
      datasAgendadas: datasCadastradas,
    };

    setData({
      startDate: null,
      endDate: null,
    });

    console.log("Atualiza posição");
    console.log("professional", position);

    try {
      const response = await axios.put(
        `http://localhost:3000/positions/${posicaoAtual.id}`,
        JSON.stringify(position),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <MainInfo>
        <h2>
          <strong>Endereço:</strong> {posicaoAtual.endereco}
        </h2>
        <p>
          <strong>Departamento:</strong> {posicaoAtual.departamento}
        </p>
        <p>
          <strong>Sala:</strong> {posicaoAtual.sala}
        </p>
        <p>
          <strong>Mesa:</strong> {posicaoAtual.mesa}
        </p>
      </MainInfo>

      <Button onClick={showDetalhes}>Detalhes</Button>
      {detalhes ? (
        <Lista>
          {agenda.map((item, index) => (
            <ListaItem key={index}>
              <ListaTitulo>
                Slot {index + 1}: {item.data} - {item.status}
              </ListaTitulo>
              <ButtonContainterList>
                <Button onClick={() => removeDates(index)}>-</Button>
              </ButtonContainterList>
            </ListaItem>
          ))}

          <div className="flex p-4">
            <Datepicker
              inputClassName={dataPickerClass}
              disabledDates={datasCadastradas}
              placeholder={"Adicione um período de reserva"}
              minDate={new Date()}
              value={data}
              onChange={handleDataChange}
            />
            <ButtonContainterAdicionar>
              <Button onClick={addData}>+</Button>
            </ButtonContainterAdicionar>
          </div>
          <ButtonContainterAtualizar>
            <Button onClick={atualizaPosicao}>Atualiza</Button>
          </ButtonContainterAtualizar>
        </Lista>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default Position;
