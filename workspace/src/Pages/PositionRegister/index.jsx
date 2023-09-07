import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import Position from "../../Components/Position";

import Datepicker from "react-tailwindcss-datepicker";

import axios from "axios";

import tw from "tailwind-styled-components";

import { getDates, getAgenda } from "../../Utils/dates";

const ListaPosicoes = tw.div`
   py-10 lg:w-1/2
`;

const SecaoTitulo = tw.h2`
font-bold text-base pb-4
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

function PositionRegister() {
  const enderecoDefault = "Selecione um endereço";

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

  useEffect(() => {
    const getEnderecos = async () => {
      console.log("Get endereços");
      const enderecos = [];
      const id = sessionStorage.getItem("id");
      console.log("id company", id);
      try {
        const company = await axios.get(
          `http://localhost:3000/companies/${id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(company);
        console.log(company.data.enderecos);
        company.data.enderecos.map((item) =>
          enderecos.push({
            label: item,
            value: item,
          })
        );

        setEnderecoLista(enderecos);
      } catch (error) {
        console.log(error);
      }
    };

    if (sessionStorage.getItem("type") == "company") {
      getEnderecos();
    }
  }, []);

  const atualizaEndereco = (e) => {
    setEndereco(e.target.value);
  };

  const handleDataChange = (newData) => {
    console.log("newData:", newData);
    setData(newData);
  };

  const addData = (e) => {
    e.preventDefault();

    console.log("data", data);
    const newAgenda = agenda.concat(getAgenda(data.startDate, data.endDate));
    const newDates = datas.concat(getDates(data.startDate, data.endDate));
    console.log("newAgenda", newAgenda);
    setAgenda(newAgenda);
    setDatas(newDates);
    setData({
      startDate: null,
      endDate: null,
    });
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    const position = {
      id_company: sessionStorage.getItem("id"),
      endereco: endereco,
      departamento: data.departamento,
      sala: data.sala,
      mesa: data.mesa,
      agenda: agenda,
      datasAgendadas: datas,
    };

    reset({
      endereco: "",
      razaosocial: "",
      departamento: "",
      sala: "",
      mesa: "",
      agenda: "",
      datasAgendadas: "",
    });

    setData({
      startDate: null,
      endDate: null,
    });

    console.log("professional", position);

    try {
      const response = await axios.post(
        "http://localhost:3000/positions",
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select
          name="endereco"
          className="form-control"
          onChange={atualizaEndereco}
          defaultValue={"default"}
        >
          <option value={"default"} disabled>
            {enderecoDefault}
          </option>
          {enderecoLista.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Input
          {...register("departamento")}
          placeholder="Digite departamento"
          type="text"
          name="departamento"
          {...register("departamento", {
            required: "Departamento é obrigatório",
          })}
        />
        {errors.departamento && <Error>{errors.departamento.message}</Error>}
        <Input
          {...register("sala")}
          placeholder="Digite o número da sala"
          type="text"
          name="sala"
          {...register("sala", {
            required: "Sala é obrigatória",
          })}
        />
        {errors.sala && <Error>{errors.sala.message}</Error>}
        <Input
          {...register("mesa")}
          placeholder="Digite o número da mesa"
          type="text"
          name="mesa"
          {...register("mesa", {
            required: "Mesa é obrigatória",
          })}
        />
        <div className="flex">
          <Datepicker
            inputClassName="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            disabledDates={datas}
            placeholder={"Adicione um período de reserva"}
            minDate={new Date()}
            value={data}
            onChange={handleDataChange}
          />
          <div className="">
            <Button onClick={addData}>+</Button>
          </div>
        </div>
        {datas.length > 0 ? (
          <Lista>
            {datas.map((item, index) => (
              <ListaItem key={index}>
                <ListaTitulo>
                  Slot {index + 1}: {item.startDate}
                </ListaTitulo>
              </ListaItem>
            ))}
          </Lista>
        ) : (
          <></>
        )}
        <Button type="submit">Registrar</Button>
      </Form>

      <ListaPosicoes>
        {posicoes.filter(
          (position) => position.id_company == sessionStorage.getItem("id")
        ).length > 0 && posicoes.filter(
          (position) => position.endereco == endereco
        ).length > 0 && <SecaoTitulo>Posições Cadastradas</SecaoTitulo>}

        {posicoes.length > 0 &&
          posicoes.map((position, index) =>
            position.id_company == sessionStorage.getItem("id") &&
            position.endereco == endereco ? (
              <div key={index} className="pb-4">
                <Position position={position} />
              </div>
            ) : (
              <div key={index}></div>
            )
          )}
      </ListaPosicoes>
    </div>
  );
}

export default PositionRegister;
