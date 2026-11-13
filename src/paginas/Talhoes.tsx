import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TalhaoCard } from '../componentes/TalhaoCard';
import { TituloPagina } from '../componentes/TituloPagina';
import { useTalhoes } from '../contexto/TalhoesContext';
import { dataLocal, situacaoTalhao } from '../dominio/regras';
import type { Cultura, SituacaoTalhao } from '../tipos';

export function Talhoes() {
  const { talhoes, operacoes } = useTalhoes();
  const [busca, setBusca] = useState('');
  const [cultura, setCultura] = useState<Cultura | ''>('');
  const [situacao, setSituacao] = useState<SituacaoTalhao | ''>('');
  const hoje = dataLocal(new Date());
  const filtrados = talhoes.filter(t => t.nome.toLocaleLowerCase('pt-BR').includes(busca.toLocaleLowerCase('pt-BR')) && (!cultura || t.cultura === cultura) && (!situacao || situacaoTalhao(t, operacoes, hoje) === situacao));
  return <><TituloPagina titulo="Meus talhões" descricao="Gerencie suas áreas de cultivo." acao={<Link className="botao" to="/talhoes/novo">+ Novo talhão</Link>} />
    <div className="cartao filtros"><div className="campo"><label htmlFor="busca">Buscar por nome</label><input id="busca" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ex.: Fazenda Boa Vista" /></div>
    <div className="campo"><label htmlFor="filtro-cultura">Cultura</label><select id="filtro-cultura" value={cultura} onChange={e => setCultura(e.target.value as Cultura | '')}><option value="">Todas</option>{(['soja', 'milho', 'algodao', 'arroz', 'feijao'] as const).map(c => <option key={c} value={c}>{c}</option>)}</select></div>
    <div className="campo"><label htmlFor="filtro-situacao">Situação</label><select id="filtro-situacao" value={situacao} onChange={e => setSituacao(e.target.value as SituacaoTalhao | '')}><option value="">Todas</option>{(['Aguardando plantio', 'Em desenvolvimento', 'Colheita próxima', 'Ponto de colheita', 'Colhido'] as const).map(s => <option key={s} value={s}>{s}</option>)}</select></div></div>
    {filtrados.length === 0 ? <div className="cartao estado"><p>{talhoes.length === 0 ? 'Nenhum talhão cadastrado ainda.' : 'Nenhum talhão corresponde aos filtros.'}</p>{talhoes.length === 0 && <Link className="botao" to="/talhoes/novo">Cadastrar primeiro talhão</Link>}</div> : <div className="grade-talhoes">{filtrados.map(t => <TalhaoCard key={t.id} talhao={t} operacoes={operacoes} hoje={hoje} />)}</div>}
  </>;
}
