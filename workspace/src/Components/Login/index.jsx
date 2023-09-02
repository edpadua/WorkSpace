import { useState } from "react";

import { useForm, useController } from "react-hook-form";

import tw from "tailwind-styled-components";

import axios from "axios";

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

  

  const [clickSubmit, setClickSubmit] = useState(false);

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
    setClickSubmit(true);
    console.log("data", data);
    const profissional = {
      email: data.email,
      password: data.password,
    };

    const empresa = {
      email: data.email,
      password: data.password,
    };

    reset({
      email: "",
      password: "",
    });

    console.log("professional", profissional);
    console.log("tipo", tipo);
    if (tipo == "profissional") {
        try {
          console.log("Professional", profissional);
          const response = await axios.post(
            "http://localhost:3000/auth/login/",
            JSON.stringify(profissional),
            {
              headers: { "Content-Type": "application/json" },
             
            }
          );
          console.log("token",JSON.stringify(response?.data.token));
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('email', response.data.email)
          sessionStorage.setItem('name', response.data.name)
        } catch (error) {
          console.log("Error",error);
          
        }
      } else {
        try {
          console.log("Empresa", empresa);
          
        } catch (error) {
          console.log(error);
        }
      }

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
    </div>
  );
}

export default Login;