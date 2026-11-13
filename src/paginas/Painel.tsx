import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClimaAtualCard } from '../componentes/ClimaAtualCard';
import { EstadoRequisicao } from '../componentes/EstadoRequisicao';
import { IndicadorPulverizacao } from '../componentes/IndicadorPulverizacao';
import { MetricCard } from '../componentes/MetricCard';
import { PrevisaoSemana } from '../componentes/PrevisaoSemana';
import { TituloPagina } from '../componentes/TituloPagina';
import { useTalhoes } from '../contexto/TalhoesContext';
import { municipios } from '../dados/municipios';
import { dataLocal, previsaoColheita, previsaoPrimeiroDia, situacaoTalhao } from '../dominio/regras';
import { buscarClima } from '../servicos/clima';
import type { DadosClima } from '../tipos';

export function Painel() {
  const { talhoes, operacoes } = useTalhoes();
  const [municipioId, setMunicipioId] = useState('balsas');
  const [tentativa, setTentativa] = useState(0);
  const [clima, setClima] = useState<DadosClima | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const municipio = municipios.find(m => m.id === municipioId) ?? municipios[0];
  const hoje = dataLocal(new Date());

  useEffect(() => {
    const controle = new AbortController();
    setCarregando(true); setErro(null); setClima(null);
    buscarClima(municipio, controle.signal)
      .then(dados => { if (!controle.signal.aborted) setClima(dados); })
      .catch((falha: unknown) => { if (!controle.signal.aborted) setErro(falha instanceof Error ? falha.message : 'Erro desconhecido'); })
      .finally(() => { if (!controle.signal.aborted) setCarregando(false); });
    return () => controle.abort();
  }, [municipioId, tentativa]); // Requisição nova ao trocar o município; abort evita resposta antiga.

  const proximas = talhoes.filter(t => situacaoTalhao(t, operacoes, hoje) !== 'Colhido')
    .map(t => ({ talhao: t, previsao: previsaoColheita(t) }))
    .filter((t): t is { talhao: typeof t.talhao; previsao: string } => t.previsao !== null)
    .sort((a, b) => a.previsao.localeCompare(b.previsao)).slice(0, 3);

  return <>
    <TituloPagina titulo="Visão geral da safra" descricao="Acompanhe o campo, o clima e as próximas colheitas." acao={<Link className="botao" to="/talhoes/novo">+ Novo talhão</Link>} />
    <div className="metricas">
      <MetricCard rotulo="Área total cadastrada" valor={`${talhoes.reduce((soma, t) => soma + t.areaHa, 0).toLocaleString('pt-BR')} ha`} />
      <MetricCard rotulo="Talhões" valor={String(talhoes.length)} />
      <MetricCard rotulo="Colhidos" valor={String(talhoes.filter(t => situacaoTalhao(t, operacoes, hoje) === 'Colhido').length)} />
    </div>
    <div className="separador-titulo"><h2>Condições meteorológicas</h2><div className="campo seletor"><label htmlFor="municipio">Município</label><select id="municipio" value={municipioId} onChange={e => setMunicipioId(e.target.value)}>{municipios.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}</select></div></div>
    <EstadoRequisicao carregando={carregando} erro={erro} tentarNovamente={() => setTentativa(t => t + 1)} />
    {clima && !carregando && <><div className="duas-colunas"><ClimaAtualCard clima={clima.current} municipio={municipio.nome} /><IndicadorPulverizacao atual={clima.current} probabilidade={previsaoPrimeiroDia(clima.daily)} /></div><PrevisaoSemana dias={clima.daily} /></>}
    <section className="cartao"><div className="linha-between"><h2>Próximas três colheitas</h2><Link className="link-texto" to="/talhoes">Ver talhões →</Link></div>
      {proximas.length === 0 ? <p className="muted">Nenhuma colheita prevista. Cadastre um talhão com data de plantio.</p> : <ul className="lista-limpa">{proximas.map(({ talhao, previsao }) => <li key={talhao.id}><Link to={`/talhoes/${talhao.id}`}>{talhao.nome}</Link><span>{new Date(`${previsao}T12:00:00`).toLocaleDateString('pt-BR')}</span></li>)}</ul>}
    </section>
  </>;
}
