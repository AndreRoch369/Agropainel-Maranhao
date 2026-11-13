import { descricaoTempo } from '../dominio/regras';
import type { ClimaAtual } from '../tipos';
interface Props { clima: ClimaAtual; municipio: string }
export function ClimaAtualCard({ clima, municipio }: Props) {
  return <div className="cartao clima-card"><div><span className="etiqueta">TEMPO AGORA · {municipio.toUpperCase()}</span><div className="temperatura">{Math.round(clima.temperature_2m)}°<span>C</span></div><p>{descricaoTempo(clima.weather_code)}</p></div><div className="clima-detalhes"><p>Umidade <strong>{clima.relative_humidity_2m}%</strong></p><p>Vento <strong>{clima.wind_speed_10m} km/h</strong></p><p>Chuva <strong>{clima.precipitation} mm</strong></p></div></div>;
}
