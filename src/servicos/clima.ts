import type { DadosClima, Municipio } from '../tipos';

export async function buscarClima(municipio: Municipio, signal?: AbortSignal): Promise<DadosClima> {
  const parametros = new URLSearchParams({
    latitude: String(municipio.latitude),
    longitude: String(municipio.longitude),
    current: 'temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
    timezone: 'America/Fortaleza',
    forecast_days: '7',
  });
  const resposta = await fetch(`https://api.open-meteo.com/v1/forecast?${parametros}`, { signal });
  if (!resposta.ok) throw new Error(`Serviço meteorológico indisponível (${resposta.status})`);
  const dados: unknown = await resposta.json();
  if (typeof dados !== 'object' || dados === null || !('current' in dados) || !('daily' in dados)) {
    throw new Error('Resposta inesperada do serviço meteorológico');
  }
  const clima = dados as DadosClima;
  if (typeof clima.current?.temperature_2m !== 'number' || !Array.isArray(clima.daily?.time)) {
    throw new Error('Dados meteorológicos incompletos');
  }
  return clima;
}
