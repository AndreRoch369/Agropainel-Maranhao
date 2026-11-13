export type Cultura = 'soja' | 'milho' | 'algodao' | 'arroz' | 'feijao';
export type TipoOperacao = 'preparo' | 'plantio' | 'adubacao' | 'pulverizacao' | 'colheita';
export type SituacaoTalhao = 'Colhido' | 'Aguardando plantio' | 'Em desenvolvimento' | 'Colheita próxima' | 'Ponto de colheita';

export interface Talhao {
  id: string;
  nome: string;
  cultura: Cultura;
  areaHa: number;
  municipioId: string;
  dataPlantio: string | null;
}

export interface Operacao {
  id: string;
  talhaoId: string;
  tipo: TipoOperacao;
  data: string;
  descricao: string;
  custoCentavos: number;
  produtividadeScHa?: number;
}

export interface Municipio {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
}

export interface ClimaAtual {
  temperature_2m: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface PrevisaoDiaria {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
}

export interface DadosClima {
  current: ClimaAtual;
  daily: PrevisaoDiaria;
}
