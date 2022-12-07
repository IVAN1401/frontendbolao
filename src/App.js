import logo from './logo.svg';
import './App.css';
import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import Input from './components/Form/Input';
import { Scope } from '@unform/core';
import "./styles.css";
import axios from 'axios';
import ReactInputMask from "react-input-mask";


function App() {
  
const api = axios.create({
  baseURL: 'http://localhost:8080'
})
  const formRef = useRef(null);

  
//useCallback(async ({nome, email,cpf,redeSocial })
  const response = useCallback( async({ logradouro,numero,referencia,cep,cidade,estado}) => {
        const result = await api.post('salvarEndereco', {
      logradouro,numero,referencia,cep,cidade,estado
    })

    if(result.data.statusCodeValue === 201) {
      alert("Cadastro realizado com sucesso, boa sorte!")
    } else{
      alert(result.data.body);
    }
  }, []);

  function handleSubmit(data, { reset }) {
    if(data.formSenac.email === "") {
      alert("O e-mail é obrigatorio!")
      return;
    }

    if(data.formSenac.bilhete === "") {
      alert('Quantidade de bilhete deve ser informado')
      return;
    } else if(data.formSenac.bilhete <= 0) {
      alert('Numero de bilhetes deve ser maior que ' + data.formSenac.bilhete)
      return;
    }
    
    console.log(data);
    response(data.formSenac)
    reset(data);
    

  }

  return (
    <div className="App">
      <Form  ref={formRef} onSubmit={handleSubmit}>

        <Scope path='formSenac'>
          <Input name="logradouro" placeholder="logradouro"/>
          <Input name="numero" placeholder="numero"/>
          <Input name="referencia" placeholder="numero da casa"/>
          <Input name="cep" placeholder="cep"/>
          <Input name="estado" placeholder="Nome do estado"/>
          <Input name="cidade" placeholder="Nome da cidade"/>
          {/**Exemplos de como criar os campos no formulario */}
          {/* <Input type="text" name="cpf" mask="999.999.999-99" placeholder="Cpf" maxlength="11"/>
          <Input type="email" name="email" placeholder="E-mail"/>
          <Input type="telefone" mask="(99) 9-9999-9999" name="telefone" placeholder="Telefone" maxlength="11"/>
          <Input type="text" name="redeSocial" placeholder="Rede social"/>
          <Input type="number" name="quantidadeDeBilhete" placeholder="Quantidade de bilhete" maxlength="2"/> */}
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
