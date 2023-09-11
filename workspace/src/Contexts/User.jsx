import { createContext, useState } from 'react';

import axios from 'axios';

import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
UserContext.displayName = "User"

export default function UserProvider({ children }) {
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [clickSubmit, setClickSubmit]= useState(false);
    const [emailExiste, setEmailExiste] = useState(false);
    const [enderecos, setEnderecos] = useState([]);
    const [enderecoLista, setEnderecoLista] = useState([]);
    const navigate = useNavigate();

    const URL_API = import.meta.env.VITE_API_URL;

    const userLogin = async (data, tipo) => {
      setClickSubmit(true);
      console.log("data", data);
      const profissional = {
        email: data.email,
        password: data.password,
      };
  
      const company = {
        email: data.email,
        password: data.password,
      };
  
  
      console.log("professional", profissional);
      console.log("tipo", tipo);
      if (tipo == "profissional") {
          try {
            console.log("Professional", profissional);
            const response = await axios.post(
              `${URL_API}auth/login_professional/`,
              JSON.stringify(profissional),
              {
                headers: { "Content-Type": "application/json" },
               
              }
            );
           
            sessionStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('name', response.data.name);
            setName(response.data.name)
            sessionStorage.setItem('id', response.data.id);
            sessionStorage.setItem('type', "professional");
            setType("professional");
            navigate("/profile");
          } catch (error) {
            console.log("Error",error);
            
          }
        } else {
          try {
              console.log("Company", company);
              const response = await axios.post(
                `${URL_API}auth/login_company/`,
                JSON.stringify(company),
                {
                  headers: { "Content-Type": "application/json" },
                 
                }
              );
            console.log("Empresa", company);
            console.log("token",JSON.stringify(response?.data.token));
            sessionStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('name', response.data.name);
            setName(response.data.name)
            sessionStorage.setItem('type', "company");
            setType("company");
            sessionStorage.setItem('id', response.data.id);
            navigate("/profile");
          } catch (error) {
            console.log(error);
          }
        }
  
    };


    const userRegister = async (data, tipo) => {
      setClickSubmit(true);
      console.log("data", data);
      const profissional = {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        password: data.password,
        endereco: data.endereco,
      };
  
      const empresa = {
        name: data.razaosocial,
        cnpj: data.cnpj,
        email: data.email,
        password: data.password,
        enderecos: enderecos,
      };
  
      console.log("professional", profissional);
      console.log("tipo", tipo);
      if (tipo == "profissional") {
        try {
          console.log("Professional", profissional);
          const response = await axios.post(
            `${URL_API}professionals`,
            JSON.stringify(profissional),
            {
              headers: { "Content-Type": "application/json" },
             
            }
          );
          console.log(JSON.stringify(response?.data));
          setEmailExiste(false);
        } catch (error) {
          console.log("Error",error);
          setEmailExiste(true);
        }
      } else {
        try {
          console.log("Empresa", empresa);
          const response = await axios.post(
            `${URL_API}companies`,
            JSON.stringify(empresa),
            {
              headers: { "Content-Type": "application/json" },
              
            }
          );
          console.log(JSON.stringify(response?.data));
          setEmailExiste(false);
        } catch (error) {
          console.log(error);
          setEmailExiste(true);
        }
      }
    };


    const getAddresses = async () => {
      console.log("Get endereços");
      const addresses = [];
      const id = sessionStorage.getItem("id");
      console.log("id company", id);
      try {
        const company = await axios.get(
          `${URL_API}companies/${id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(company);
        console.log(company.data.enderecos);
        company.data.enderecos.map((item) =>
          addresses.push({
            label: item,
            value: item,
          })
        );

        setEnderecoLista(addresses);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <UserContext.Provider
        value={{
          token,
          setToken,
          name,
          setName,
          type,
          setType,
          userLogin,
          userRegister,
          getAddresses,
          enderecoLista
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }