import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  padding: 10px;
  font-size: 20px;
  background-color: #66a2fe;
  border: none;
  border-radius: 10px;
  color: #ffff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({cotizacionMoneda}) => {
  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  const [listaCripto, setListaCripto] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const consultarApi = async () => {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
      );
      setListaCripto(response.data.Data);
    };
    consultarApi();
  }, []);

  const [moneda, setMoneda, SelectMonedas] = useMoneda(
    "Elije tu moneda",
    "",
    MONEDAS
  );

  const [cripto, setCripto, SelecCripto] = useCriptomoneda(
    "Elije tu criptomoneda",
    "",
    listaCripto
  );

  const cotizarMoneda = (e) => {
    e.preventDefault();
    if(!moneda.trim() || !cripto.trim()) {
      setError(true);
      return;
    }

    setError(false);
    cotizacionMoneda({moneda, cripto})
  };

  return (
    <form onSubmit={cotizarMoneda}>
    {error && <Error message="Todos los campos son obligatorios" />}
      <SelectMonedas />
      <SelecCripto />
      <Boton type="submit" value="Cotizar" />
    </form>
  );
};

export default Formulario;
