import { avaliarPulverizacao } from '../dominio/regras';
import type { ClimaAtual } from '../tipos';
interface Props { atual: ClimaAtual; probabilidade: number }
export function IndicadorPulverizacao({ atual, probabilidade }: Props) {
  const resultado = avaliarPulverizacao(atual, probabilidade);
  return <div className="cartao"><h2>Condições para pulverizar</h2><div className={`indicador ${resultado.situacao === 'Favorável' ? 'favoravel' : resultado.situacao === 'Atenção' ? 'atencao' : 'desfavoravel'}`}>{resultado.situacao}</div>
    {resultado.motivos.length ? <ul className="lista-motivos">{resultado.motivos.map(motivo => <li key={motivo}>{motivo}</li>)}</ul> : <p className="muted">Nenhuma restrição identificada pelas cinco condições avaliadas.</p>}
    <small className="muted">Indicador acadêmico simplificado; não substitui avaliação agronômica.</small></div>;
}
