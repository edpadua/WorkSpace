import tw from "tailwind-styled-components";

const Form = tw.form`
lg:w-1/2
`;
export { Form };

const Input = tw.input`
w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline
`;
export { Input };

const Select = tw.select`
w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline
`;
export { Select };

const Button = tw.button`
hover:bg-teal-300 bg-teal-400 text-white font-bold py-2 px-4 rounded
`;

export { Button };

const Error = tw.p`
z-10 pt-1 text-red-500 text-xs italic
`;

export { Error };

const Lista = tw.div`
bg-slate-200 rounded-lg my-4 py-4
`;

export { Lista };


const ListaItem = tw.div`
flex
`;

export { ListaItem };


const ListaTitulo = tw.h2`
  p-4  float-left
`;

export { ListaTitulo };
