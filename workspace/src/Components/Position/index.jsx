/* eslint-disable react/prop-types */
import { useState, useContext } from "react";

import tw from "tailwind-styled-components";

import Datepicker from "react-tailwindcss-datepicker";

import { getDates, getAgenda } from "../../Utils/dates";

import { UserContext } from "../../Contexts/User";

import { PositionContext } from "../../Contexts/Position";

const dataPickerClass =
  "w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline";

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
px-4 pt-6
`;

import {
  Form,
  Input,
  Button,
  Button2,
  Select,
  Error,
  Lista,
  ListaTitulo,
  ListaItem,
} from "../../GlobalStyles";

function Position({ position }) {


  const [posicaoAtual] = useState(position);

  const [datasCadastradas, setDatasCadastradas] = useState(
    position.datasAgendadas
  );

  const [agenda, setAgenda] = useState(position.agenda);

  const [detalhes, setDetalhes] = useState(false);

  const { token, setToken, name, setName, type, setType } =
    useContext(UserContext);

  const { positionUpdate } =
    useContext(PositionContext);

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

  const scheduleDates = (index) => {
    const newAgenda = [...agenda];
    const newDates = [...datasCadastradas];

    newAgenda[index].status = "ocupado";
    newAgenda[index].ocupante = sessionStorage.getItem("id");
    newDates.splice(index, 1);

    setAgenda(newAgenda);
    setDatasCadastradas(newDates);
  };

  const unscheduleDates = (index) => {
    const newAgenda = [...agenda];
    const newDates = [...datasCadastradas];

    newAgenda[index].status = "disponivel";
    newAgenda[index].ocupante = sessionStorage.getItem("id");
    newDates.splice(index, 1);

    setAgenda(newAgenda);
    setDatasCadastradas(newDates);
  };

  const atualizaPosicao = async () => {
    const positionUpdated = {
      _id: position._id,
      endereco: position.endereco,
      departamento: position.departamento,
      sala: position.sala,
      mesa: position.mesa,
      agenda: agenda,
      datasAgendadas: datasCadastradas,
    };

    setData({
      startDate: null,
      endDate: null,
    });

    console.log("Posição Atual Id", position._id);
    console.log("Atualiza posição");
    
    console.log("professional", position);

    positionUpdate(position,positionUpdated);
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
              {type == "company" ? (
                <ListaTitulo>
                  Data {index + 1}: {item.data} - {item.status}
                </ListaTitulo>
              ) : (
                item.status == "disponivel" && (
                  <ListaTitulo>
                    Data {index + 1}: {item.data} - {item.status}
                  </ListaTitulo>
                )
              )}

              <ButtonContainterList>
                {type == "company" ? (
                  <Button onClick={() => removeDates(index)}>-</Button>
                ) : (
                  <></>
                )}
                {item.status == "disponivel" && (
                  <Button onClick={() => scheduleDates(index)}>Agendar</Button>
                )}
              </ButtonContainterList>
            </ListaItem>
          ))}

          {type == "company" ? (
            <>
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
            </>
          ) : (
            <>
              {agenda.filter((x) => x.ocupante == sessionStorage.getItem("id"))
                .length > 0 && (
                <div className="flex w-full">
                  <h2 className="p-4 float-left font-bold">Datas agendadas:</h2>
                </div>
              )}

              {agenda.map(
                (item, index) =>
                  item.status == "ocupado" &&
                  item.ocupante == sessionStorage.getItem("id") && (
                    <ListaItem key={index}>
                      <ListaTitulo>
                        {item.data}
                      </ListaTitulo>
                      <Button2 onClick={() => unscheduleDates(index)}>Cancelar Reserva</Button2>
                    </ListaItem>
                  )
              )}
              <ButtonContainterAtualizar>
                <Button onClick={atualizaPosicao}>Salvar agendamento</Button>
              </ButtonContainterAtualizar>
            </>
          )}
        </Lista>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default Position;
