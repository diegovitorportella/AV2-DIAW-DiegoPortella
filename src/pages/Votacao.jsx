import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao(votosNaSessao + 1);
  }

  return (
    <main className="pagina-votacao">
      <h1>Quem você quer eliminar?</h1>

      {ultimoVoto && (
        <div className="mensagem-confirmacao">
          <p>Você votou para eliminar <strong>{ultimoVoto.nome}</strong>.</p>
          <p>Você já votou {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.</p>
          <Link to="/resultado" className="botao botao-secundario">Ver resultado</Link>
        </div>
      )}

      <section>
        <p>Cada clique conta um voto para tirar o peão da fazenda.</p>
        <div className="grade-roca">
          {naRoca.map((p) => (
            <ParticipanteCard 
              key={p.id} 
              participante={p} 
              onVotar={handleVotar} 
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Demais peões</h2>
        <div className="grade-outros">
          {foraDaRoca.map((p) => (
            <ParticipanteCard 
              key={p.id} 
              participante={p} 
            />
          ))}
        </div>
      </section>

      <section>
        <p>Fora da roça nesta semana, não podem receber votos.</p>
      </section>
    </main>
  );
}

export default Votacao;