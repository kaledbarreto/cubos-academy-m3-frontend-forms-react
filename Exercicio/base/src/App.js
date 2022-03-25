import React, { useState } from 'react';
import Card from './components/Card';
import "./index.css";

import getSpotifyToken from './utils/getSpotifyToken';
const baseURL = (pesquisa) => `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=10`;

function App() {
  const [pesquisa, setPesquisa] = useState('');
  const [notfound, setNotfound] = useState('');
  const [tracks, setTracks] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!pesquisa) return;

    setPesquisa('');
    setErros('');
    setCarregando(true);

    try {
      const token = await getSpotifyToken();

      const response = await fetch(baseURL(pesquisa), {
        headers: {
          'Authorization': token
        }
      });

      const { tracks } = await response.json();
      if (tracks.items.length === 0) {
        setNotfound("Nada Encontrado");

      } else {
        setNotfound('');
      }

      console.log(tracks);
      setTracks(tracks.items);
    } catch (error) {
      setErros(error.message);
      setTracks([]);
    }
    setCarregando(false);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Clonefy</h1>
        <input
          type="text"
          value={pesquisa}
          onChange={e => setPesquisa(e.target.value)}
        />
      </form>
      {carregando && <span className="loading">Carregando...</span>}
      {erros && <span className="error">{erros}</span>}
      <span className={!notfound ? '' : 'not-found'}>{notfound}</span>
      <div className="card-content">
        {tracks.map(track => (
          <Card track={track} />
        ))}
      </div>
    </div>
  );
}

export default App;
