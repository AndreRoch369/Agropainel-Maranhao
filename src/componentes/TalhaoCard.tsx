import { Link } from 'react-router-dom';
import { previsaoColheita, situacaoTalhao } from '../dominio/regras';
import type { Operacao, Talhao } from '../tipos';
import { StatusBadge } from './StatusBadge';
interface Props { talhao: Talhao; operacoes: Operacao[]; hoje: string }
export function TalhaoCard({ talhao, operacoes, hoje }: Props) {
  const previsao = previsaoColheita(talhao);
  return <article className="cartao talhao-card"><div className="linha-between"><span className="etiqueta">{talhao.cultura.toUpperCase()}</span><StatusBadge situacao={situacaoTalhao(talhao, operacoes, hoje)} /></div>
    <h3>{talhao.nome}</h3><p className="muted">{talhao.areaHa.toLocaleString('pt-BR')} hectares</p>
    <p className="muted">Previsão: {previsao ? new Date(`${previsao}T12:00:00`).toLocaleDateString('pt-BR') : 'Não definida'}</p>
    <Link className="link-texto" to={`/talhoes/${talhao.id}`}>Ver detalhes →</Link>
  </article>;
}
