function ParticipanteCard({ participante, onVotar }) {
  const { nome, foto, naRoca } = participante;

  return (
    <article className={naRoca ? 'card card-roca' : 'card'}>
      {naRoca && <span className="selo-roca">Na roça</span>}
      
      <img src={foto} alt={nome} className="card-foto" />
      <h3 className="card-nome">{nome}</h3>
      
      {onVotar && (
        <button type="button" onClick={() => onVotar(participante)} className="botao botao-principal">
          Votar para eliminar
        </button>
      )}
    </article>
  );
}

export default ParticipanteCard;