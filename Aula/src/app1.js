import { useState } from 'react';

function App() {
  const [formulario, setFormulario] = useState({ nome: '', sobrenome: '', idade: 0 });
  const [erro, setErro] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    setErro('');

    if (formulario.nome.length < 3) {
      setErro('Nome deve ter mais de 2 caracteres.');
    }

    if (formulario.idade < 1) {
      setErro('A idade deve ser maior que zero');
    }
  }

  function handleChange({ target }) {
    setFormulario({ ...formulario, [target.name]: target.value });
  }

  return (
    <div className="App">
      {
        erro && (
          <div className="alert">
            {erro}
          </div>
        )
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Primeiro Nome: </label>
          <input type="text" id="nome" name="nome" value={formulario.nome} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="sobrenome">Sobrenome: </label>
          <input type="text" id="sobrenome" name="sobrenome" value={formulario.sobrenome} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="idade">Idade: </label>
          <input type="number" id="idade" name="idade" value={formulario.idade} onChange={handleChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
