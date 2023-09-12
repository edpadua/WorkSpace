# WorkSpace

<h1>
   <img src="https://github.com/edpadua/WorkSpace/blob/main/workspace/public/work-space-capture.gif"></a>
</h1>



# Summary

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [API](#api)
- [Setup](#setup)
- [Licença](#licença)
- [Contato](#contato)
 
## Sobre 

Este projeto consiste em um sistema de reserva de salas e espaços livres em uma empresa para profissionais utilizarem para reuniões, eventos ou mesmo como estação de trabalho.
Entre as funcionalidades do sistema estão:
- Cadastro de usuários, podendo estes serem do tipo profissionais ( pessoa física ) e empresas ( pessoa jurídica )
- Login de usuários
- Cadastro de posições e datas, permitido para usuários do tipo empresa, onde as posições disponíveis nas empresas são registradas e são definidas as datas disponíveis de cada posição, além da edição destas posições.
- Agendamento de posições por profissionais. Permite os usuários reservarem as posições nas datas disponíveis.

Esta parte corresponde ao front end do sistema, no qual foi utilizada a biblioteca ReactJS, criado com o Vite. Neste módulo é feito o consumo de uma API Rest criada especificamente para o sistema. [WorkAPI](https://github.com/edpadua/WorkAPI), utilizando a bilioteca Axios.
Para os estilos o framework Tailwind CSS em conjunto com a biblioteca tailwind-styled-components. Para o gerenciamento de estados foi utilizado o Context API. A validação de formulários é realizada com a biblioteca React Form Hook.

### Agendamento de posições

![image](https://github.com/edpadua/WorkSpace/assets/4975360/61999c6d-5f85-4159-b50e-f043a640008d)



### Login

![image](https://github.com/edpadua/WorkSpace/assets/4975360/36ebfd71-a4e6-409a-b32c-74dabd46af70)


### Cadastro de Posições

![image](https://github.com/edpadua/WorkSpace/assets/4975360/aa93342e-3f18-4389-b63c-c9ea7e6e48a7)


### Cadastro de Usuários

![image](https://github.com/edpadua/WorkSpace/assets/4975360/63d141ec-31a9-48ce-8d0a-bf6d114388c1)


### Tecnologias

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev/guide/)
- [Axios](https://github.com/axios/axios)
- [React-router](https://reactrouter.com/)
- [Tailwind Styled-Components](https://www.npmjs.com/package/tailwind-styled-components)
- [React Form Hook](https://www.react-hook-form.com)
- [Tailwind CSS](https://tailwindcss.com/)

### API

[WorkAPI](https://github.com/edpadua/WorkAPI)

## Setup

```bash
git clone https://github.com/edpadua/WorkSpace

cd workspace
npm i
npm run dev
```



## Licença

Distribuido sob a licença MIT. Veja `LICENSE.txt` para mais informações.


## Contato

Eduardo de Pádua: ed.padua@gmail.com

Link: [https://github.com/edpadua/WorkSpace/](https://github.com/edpadua/WorkSpace)
