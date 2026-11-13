import { descricaoTempo } from '../dominio/regras';
import type { PrevisaoDiaria } from '../tipos';
interface Props { dias: PrevisaoDiaria }
export function PrevisaoSemana({ dias }: Props) {
  return <section className="cartao"><h2>Previsão para 7 dias</h2>{dias.time.length === 0 ? <p className="muted">Nenhuma previsão disponível.</p> : <div className="previsao-grid">{dias.time.map((data, i) => <div className="previsao-dia" key={data}><strong>{new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' })}</strong><span>{descricaoTempo(dias.weather_code[i] ?? -1)}</span><b>{Math.round(dias.temperature_2m_max[i] ?? 0)}° / {Math.round(dias.temperature_2m_min[i] ?? 0)}°</b><small>Chuva: {dias.precipitation_probability_max[i] ?? 0}%</small></div>)}</div>}</section>;
}
