import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Campo } from '../componentes/Campo';
import { MetricCard } from '../componentes/MetricCard';
import { StatusBadge } from '../componentes/StatusBadge';
import { TituloPagina } from '../componentes/TituloPagina';
import { useTalhoes } from '../contexto/TalhoesContext';
import { municipios } from '../dados/municipios';
import { custoPorHectare, custoTotal, dataLocal, diasEntre, formatarMoeda, paraCentavos, previsaoColheita, producaoSacas, rotuloOperacao, situacaoTalhao, validarOperacao } from '../dominio/regras';
import type { Operacao, TipoOperacao } from '../tipos';

export function DetalheTalhao() {
  const { id } = useParams();
  const { talhoes, operacoes, adicionarOperacao } = useTalhoes();
  const talhao = talhoes.find(t => t.id === id);
  const [tipo, setTipo] = useState<TipoOperacao>('preparo');
  const [data, setData] = useState(dataLocal(new Date()));
  const [descricao, setDescricao] = useState('');
  const [custo, setCusto] = useState('0');
  const [produtividade, setProdutividade] = useState('');
  const [erros, setErros] = useState<ReturnType<typeof validarOperacao>>({});
  const dataRef = useRef<HTMLInputElement>(null);
  const custoRef = useRef<HTMLInputElement>(null);
  const produtividadeRef = useRef<HTMLInputElement>(null);
  if (!talhao) return <div className="cartao estado"><h1>Talhão não encontrado</h1><Link to="/talhoes">Voltar aos talhões</Link></div>;
  const hoje = dataLocal(new Date());
  const desteTalhao = operacoes.filter(op => op.talhaoId === talhao.id).sort((a, b) => b.data.localeCompare(a.data));
  const previsao = previsaoColheita(talhao);

  function registrar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!talhao) return;
    const nova: Operacao = { id: crypto.randomUUID(), talhaoId: talhao.id, tipo, data, descricao: descricao.trim(), custoCentavos: paraCentavos(Number(custo)) };
    if (tipo === 'colheita') nova.produtividadeScHa = Number(produtividade);
    const validacao = validarOperacao(talhao, operacoes, nova, hoje);
    setErros(validacao);
    if (validacao.data) { dataRef.current?.focus(); return; }
    if (validacao.custoCentavos) { custoRef.current?.focus(); return; }
    if (validacao.produtividadeScHa) { produtividadeRef.current?.focus(); return; }
    adicionarOperacao(nova);
    setDescricao(''); setCusto('0'); setProdutividade(''); setErros({});
  }
  return <><TituloPagina titulo={talhao.nome} descricao={`${talhao.cultura.toUpperCase()} · ${municipios.find(m => m.id === talhao.municipioId)?.nome ?? 'Município não identificado'}`} acao={<Link className="botao secundario" to={`/talhoes/${talhao.id}/editar`}>Editar talhão</Link>} />
    <div className="cartao faixa-status"><StatusBadge situacao={situacaoTalhao(talhao, operacoes, hoje)} /><span>{talhao.dataPlantio ? `${diasEntre(talhao.dataPlantio, hoje)} dias desde o plantio` : 'Plantio ainda não registrado'}</span></div>
    <div className="metricas"><MetricCard rotulo="Área" valor={`${talhao.areaHa.toLocaleString('pt-BR')} ha`} /><MetricCard rotulo="Previsão de colheita" valor={previsao ? new Date(`${previsao}T12:00:00`).toLocaleDateString('pt-BR') : 'Não definida'} /><MetricCard rotulo="Custo por hectare" valor={formatarMoeda(custoPorHectare(talhao, operacoes))} /><MetricCard rotulo="Produção colhida" valor={`${producaoSacas(talhao, operacoes).toLocaleString('pt-BR')} sacas`} /></div>
    <div className="duas-colunas alinhado-inicio"><section className="cartao"><h2>Diário de operações</h2><p className="muted">Custo acumulado: {formatarMoeda(custoTotal(desteTalhao))}</p>{desteTalhao.length === 0 ? <p className="muted">Nenhuma operação registrada.</p> : <ul className="operacoes">{desteTalhao.map(op => <li key={op.id}><div><strong>{rotuloOperacao(op.tipo)}</strong><small>{new Date(`${op.data}T12:00:00`).toLocaleDateString('pt-BR')}</small><p>{op.descricao || 'Sem descrição'}</p>{op.produtividadeScHa && <small>Produtividade: {op.produtividadeScHa} sc/ha</small>}</div><b>{formatarMoeda(op.custoCentavos)}</b></li>)}</ul>}</section>
      <section className="cartao"><h2>Registrar operação</h2><form onSubmit={registrar} noValidate className="formulario interno"><Campo id="tipo-op" rotulo="Tipo de operação"><select id="tipo-op" value={tipo} onChange={e => setTipo(e.target.value as TipoOperacao)}>{(['preparo', 'plantio', 'adubacao', 'pulverizacao', 'colheita'] as const).map(t => <option key={t} value={t}>{rotuloOperacao(t)}</option>)}</select></Campo>
        <Campo id="data-op" rotulo="Data" erro={erros.data}><input id="data-op" ref={dataRef} type="date" value={data} onChange={e => setData(e.target.value)} aria-invalid={Boolean(erros.data)} aria-describedby={erros.data ? 'data-op-erro' : undefined} /></Campo>
        <Campo id="descricao-op" rotulo="Descrição"><textarea id="descricao-op" rows={3} value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="O que foi realizado?" /></Campo>
        <Campo id="custo-op" rotulo="Custo (R$)" erro={erros.custoCentavos}><input id="custo-op" ref={custoRef} type="number" min="0" step="0.01" value={custo} onChange={e => setCusto(e.target.value)} aria-invalid={Boolean(erros.custoCentavos)} aria-describedby={erros.custoCentavos ? 'custo-op-erro' : undefined} /></Campo>
        {tipo === 'colheita' && <Campo id="produtividade-op" rotulo="Produtividade (sacas/ha)" erro={erros.produtividadeScHa}><input id="produtividade-op" ref={produtividadeRef} type="number" min="0.01" step="any" value={produtividade} onChange={e => setProdutividade(e.target.value)} aria-invalid={Boolean(erros.produtividadeScHa)} aria-describedby={erros.produtividadeScHa ? 'produtividade-op-erro' : undefined} /></Campo>}
        <button type="submit">Registrar operação</button></form></section></div>
  </>;
}
