import { useState, useContext } from "react";

import { useForm, useController } from "react-hook-form";

import { UserContext } from "../../Contexts/User";

import tw from "tailwind-styled-components";

import {
  Form,
  Input,
  Button,
  Select,
  Error,
  Lista,
  ListaTitulo,
  PageTitle,
} from "../../GlobalStyles";

function UserRegister() {
  const tipoDefault = "Selecione um tipo de usuário";

  const emailMensagem = "Email já utilizado por outro usuário";

  const tipos = [
    {
      label: "Profissional",
      value: "profissional",
    },
    {
      label: "Empresa",
      value: "empresa",
    },
  ];

  const [tipo, setTipo] = useState("Profissional");

  const [enderecos, setEnderecos] = useState([]);

  const [endereco, setEndereco] = useState("");

  const [enderecoCount, setEnderecoCount] = useState(0);

  const [clickSubmit, setClickSubmit] = useState(false);

  const [emailExiste, setEmailExiste] = useState(false);

  const { userRegister } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const atualizaTipo = (e) => {
    setTipo(e.target.value);
  };

  const onSubmit = async (data) => {
    userRegister(data, tipo);

    reset({
      name: "",
      razaosocial: "",
      cpf: "",
      cnpj: "",
      email: "",
      password: "",
      enderecos: "",
    });
  };

  const addEndereco = (e) => {
    e.preventDefault();
    console.log("endereco", endereco);
    const newEnderecos = [...enderecos, endereco];
    console.log("newEnderecos", newEnderecos);
    setEnderecoCount(enderecoCount + 1);
    setEnderecos(newEnderecos);
    setEndereco("");
  };

  return (
    <div>
      <PageTitle>Cadastro de Usuário</PageTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Select
          name="tipo"
          className="form-control"
          onChange={atualizaTipo}
          defaultValue={"default"}
        >
          <option value={"default"} disabled>
            {tipoDefault}
          </option>
          {tipos.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {tipo == "profissional" ? (
          <>
            <Input
              {...register("name")}
              placeholder="Digite o nome "
              type="text"
              name="name"
              {...register("name", {
                required: "Nome é obrigatório",
              })}
            />
            {errors.name && <Error>{errors.name.message}</Error>}
            <Input
              placeholder="Digite o CPF"
              type="text"
              name="cpf"
              {...register("cpf", {
                required: "CPF é obrigatório",
                pattern: {
                  value: /^(\d{3}\.){2}\d{3}-\d{2}$/,
                  message: "CPF inválido.",
                },
              })}
            />
            {errors.cpf && <Error>{errors.cpf.message}</Error>}
          </>
        ) : (
          <>
            <Input
              placeholder="Digite a razão social"
              {...register("razaosocial")}
              type="text"
              name="razaosocial"
              {...register("razaosocial", {
                required: "Razão social é obrigatória",
              })}
            />
            {errors.razaosocial && <Error>{errors.razaosocial.message}</Error>}
            <Input
              placeholder="Digite o CNPJ"
              type="text"
              name="cnpj"
              {...register("cnpj", {
                required: "CNPJ é obrigatório",
                pattern: {
                  value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                  message: "CNPJ inválido.",
                },
              })}
            />
            {errors.cnpj && <Error>{errors.cnpj.message}</Error>}
          </>
        )}
        <Input
          {...register("email")}
          placeholder="Digite o email"
          type="text"
          name="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email invalido.",
            },
          })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        {emailExiste && <Error>{emailMensagem}</Error>}
        <Input
          type="password"
          placeholder="Digite a senha"
          name="password"
          {...register("password", {
            required: "A senha é obrigatória",
            validate: {
              checkLength: (value) => value.length >= 6,
              matchPattern: (value) =>
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                  value
                ),
            },
          })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        {errors.password?.type === "checkLength" && (
          <Error>A senha deve ter no mínimo 6 caracteres.</Error>
        )}
        {errors.password?.type === "matchPattern" && (
          <Error>
            A senha deve conter pelo menos uma letra maiúscula, uma letra
            minúscula ,um digito e um caracter especial.
          </Error>
        )}
        {tipo == "profissional" ? (
          <>
            <Input
              {...register("endereco")}
              placeholder="Digite o endereco "
              type="text"
              name="name"
              {...register("endereco", {
                required: "Endereço é obrigatório",
              })}
            />
            {errors.endereco && <Error>{errors.endereco.message}</Error>}
          </>
        ) : (
          <>
            <div className="flex">
              <Input
                {...register("endereco")}
                placeholder="Digite o endereço "
                type="text"
                name="name"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              {enderecoCount == 0 && clickSubmit == true && (
                <Error>{"Cadastre no mínimo um endereço"}</Error>
              )}
              <Button onClick={addEndereco}>+</Button>
            </div>
            {enderecos.length>0 && (
              <Lista>
                {enderecos.map((item, index) => (
                  <ListaTitulo key={index}>
                    Endereço {index + 1}: {item}
                  </ListaTitulo>
                ))}
              </Lista>
            )}
          </>
        )}
        <Button type="submit">Registrar</Button>
      </Form>
    </div>
  );
}

export default UserRegister;
