# WorkSpace

Este projeto consiste em um sistema de reserva de salas e espaços livres em uma empresa para profissionais utilizarem para reuniões, eventos ou mesmo como estação de trabalho.
Entre as funcionalidades do sistema estão:
- Cadastro de usuários, podendo estes serem do tipo profissionais ( pessoa física ) e empresas ( pessoa jurídica )
- Login de usuários
- Cadastro de posições e datas, permitido para usuários do tipo empresa, onde as posições disponíveis nas empresas são registradas e são definidas as datas disponíveis de cada posição, além da edição destas posições.
- Agendamento de posições por profissionais. Permite os usuários reservarem as posições nas datas disponíveis.

Esta parte corresponde ao front end do sistema, no qual foi utilizada a biblioteca ReactJS, criado com o Vite. Neste módulo é feito o consumo de uma API Rest criada especificamemte para o sistema, utilizando a bilioteca Axios.
Para os estilos o framework Tailwind CSS em conjunto com tailwind-styled-components. Para o gerenciamento de estados foi utilizado o Context API.
