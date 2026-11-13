interface Props { carregando: boolean; erro: string | null; tentarNovamente: () => void }
export function EstadoRequisicao({ carregando, erro, tentarNovamente }: Props) {
  if (carregando) return <div className="cartao estado" role="status">Carregando dados meteorológicos…</div>;
  if (erro) return <div className="cartao estado" role="alert"><p>Não foi possível carregar o clima: {erro}</p><button type="button" onClick={tentarNovamente}>Tentar de novo</button></div>;
  return null;
}
