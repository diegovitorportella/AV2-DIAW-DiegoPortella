import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obterVotos, calcularTotalVotos, calcularResultado, zerarVotos } from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="pagina-resultado">
      <h1>Parcial da eliminação</h1>

      {total === 0 ? (
        <div className="sem-votos">
          <p>Nenhum voto ainda. Escolha quem sai da roça para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">Ir para a votação</Link>
        </div>
      ) : (
        <div className="conteudo-resultado">
          <p className="total-votos">{total} votos computados</p>
          <button type="button" onClick={handleZerar} className="botao botao-secundario">
            Zerar votação
          </button>

          <div className="lista-resultado">
            {resultado.map((p, index) => (
              <article key={p.id} className={index === 0 ? 'resultado-item placar-lider' : 'resultado-item'}>
                <img src={p.foto} alt={p.nome} className="resultado-foto" />
                
                <div className="resultado-info">
                  <div className="resultado-cabecalho">
                    <h3>{p.nome}</h3>
                    {index === 0 && <span className="selo-sairia">Sairia hoje</span>}
                  </div>
                  
                  <div className="resultado-numeros">
                    <span>{p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%</span>
                    <span>{p.votos} {p.votos === 1 ? 'voto' : 'votos'}</span>
                  </div>

                  <div className="barra">
                    <div
                      className="barra-preenchida"
                      style={{ width: `${p.percentual}%` }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Resultado;