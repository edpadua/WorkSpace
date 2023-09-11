import { useState, useContext } from "react";

import { useForm, useController } from "react-hook-form";

import tw from "tailwind-styled-components";

import { Link } from "react-router-dom";

import {UserContext} from "../../Contexts/User"

import {
  Form,
  Input,
  Button,
  Select,
  Error,
  Lista,
  ListaTitulo,
} from "../../GlobalStyles";



function Login() {
  const tipoDefault = "Selecione um tipo de usuário";
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


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { userLogin } = useContext(UserContext);

  const atualizaTipo = (e) => {
    setTipo(e.target.value);
  };

  

  const onSubmit = async (data) => {
    
    userLogin(data,tipo);

    reset({
      email: "",
      password: "",
    });

    
  };

  return (
    <div>
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
        <Input
          type="password"
          placeholder="Digite a senha"
          name="password"
          {...register("password", {
            required: "A senha é obrigatória",
          })}
        />
        {errors.password && <Error>{errors.password.message}</Error>}

        <Button type="submit">Login</Button>
      </Form>  
      <div className="pt-4"> 
        <Link className="text-teal-400 font-bold" to="/userregister">Cadastro</Link>
      </div>
     
            
    </div>
  );
}

export default Login;
