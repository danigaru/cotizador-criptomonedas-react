import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 2rem;
  font-size: 2rem;
  display: block;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
`;

const useCriptomoneda = (label, initialState, options) => {
  const [state, setState] = useState(initialState);

  const Seleccionar = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={(e) => setState(e.target.value)} value={state}>
        <option value="MXN">Selecciona la criptomoneda</option>
        {options.map((option) => (
            <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
              {option.CoinInfo.FullName}
            </option>
          ))}
      </Select>
    </Fragment>
  );

  return [state, setState, Seleccionar];
};

export default useCriptomoneda;

    
