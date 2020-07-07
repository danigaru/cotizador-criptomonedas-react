import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 50%;
  margin-top: 5rem;
  margin: 0 auto;
  display: block;

  @media (min-width: 996px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 35px;
  margin-top: 2rem;

  @media (min-width: 768px) {
    font-size: 50px;
  }

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

const Contenido = styled.div`
  max-width: 85%;
  margin: 0 auto;
  @media (min-width: 996px) {
    max-width: 100%;
  }
`;

function App() {
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  const cotizacionMoneda = async ({ moneda, cripto }) => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

    setCargando(true);
    const response = await axios.get(url);

    setTimeout(() => {
      setResultado(response.data.DISPLAY[cripto][moneda]);
      setCargando(false);
    }, 2500);
  };

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen-cripto" />
      </div>

      <Contenido>
        <Heading>Cotiza criptomonedas al instante</Heading>
        <Formulario cotizacionMoneda={cotizacionMoneda} />
        {cargando ? <Spinner /> : <Cotizacion resultado={resultado} />}
      </Contenido>
    </Contenedor>
  );
}

export default App;
