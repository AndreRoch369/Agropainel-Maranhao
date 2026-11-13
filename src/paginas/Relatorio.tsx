import { Link } from 'react-router-dom';
import { MetricCard } from '../componentes/MetricCard';
import { TituloPagina } from '../componentes/TituloPagina';
import { useTalhoes } from '../contexto/TalhoesContext';
import { custoPorHectare, custoTotal, formatarMoeda, producaoSacas } from '../dominio/regras';
import type { Cultura } from '../tipos';

export function Relatorio() {
  const { talhoes, operacoes } = useTalhoes();
  const culturas: Cultura[] = ['soja', 'milho', 'algodao', 'arroz', 'feijao'];
  const totalSacas = talhoes.reduce((soma, talhao) => soma + producaoSacas(talhao, operacoes), 0);
  return <><TituloPagina titulo="Relatório da safra" descricao="Área cultivada, custos e produção colhida." />
    <div className="metricas"><MetricCard rotulo="Área total" valor={`${talhoes.reduce((s, t) => s + t.areaHa, 0).toLocaleString('pt-BR')} ha`} /><MetricCard rotulo="Custo total" valor={formatarMoeda(custoTotal(operacoes))} /><MetricCard rotulo="Produção colhida" valor={`${totalSacas.toLocaleString('pt-BR')} sacas`} /></div>
    {talhoes.length === 0 ? <div className="cartao estado"><p>Sem dados para o relatório.</p><Link className="botao" to="/talhoes/novo">Cadastrar talhão</Link></div> : <><section className="cartao"><h2>Área por cultura</h2><div className="area-culturas">{culturas.map(c => <div key={c}><span>{c[0].toUpperCase() + c.slice(1)}</span><strong>{talhoes.filter(t => t.cultura === c).reduce((s, t) => s + t.areaHa, 0).toLocaleString('pt-BR')} ha</strong></div>)}</div></section>
    <section className="cartao"><h2>Custos e produção por talhão</h2><div className="tabela-scroll"><table><thead><tr><th>Talhão</th><th>Área (ha)</th><th>Custo total</th><th>Custo/ha</th><th>Produção (sc)</th></tr></thead><tbody>{talhoes.map(t => <tr key={t.id}><td><Link to={`/talhoes/${t.id}`}>{t.nome}</Link></td><td>{t.areaHa.toLocaleString('pt-BR')}</td><td>{formatarMoeda(custoTotal(operacoes.filter(o => o.talhaoId === t.id)))}</td><td>{formatarMoeda(custoPorHectare(t, operacoes))}</td><td>{producaoSacas(t, operacoes).toLocaleString('pt-BR')}</td></tr>)}</tbody></table></div></section></>}
  </>;
}
