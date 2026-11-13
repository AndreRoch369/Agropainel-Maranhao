import type { ClimaAtual, Cultura, Operacao, PrevisaoDiaria, SituacaoTalhao, Talhao, TipoOperacao } from '../tipos';

export const ciclos: Record<Cultura, number> = {
  soja: 120, milho: 140, algodao: 180, arroz: 120, feijao: 90,
};

// A aritmética usa UTC para evitar o deslocamento de um dia no fuso de Balsas.
function utcDia(data: string): number {
  const [ano, mes, dia] = data.split('-').map(Number);
  return Date.UTC(ano, mes - 1, dia);
}

export function dataLocal(data: Date): string {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

export function adicionarDias(data: string, dias: number): string {
  return new Date(utcDia(data) + dias * 86400000).toISOString().slice(0, 10);
}

export function diasEntre(inicio: string, fim: string): number {
  return Math.round((utcDia(fim) - utcDia(inicio)) / 86400000);
}

export function previsaoColheita(talhao: Talhao): string | null {
  return talhao.dataPlantio ? adicionarDias(talhao.dataPlantio, ciclos[talhao.cultura]) : null;
}

export function situacaoTalhao(talhao: Talhao, operacoes: Operacao[], hoje: string): SituacaoTalhao {
  if (operacoes.some(op => op.talhaoId === talhao.id && op.tipo === 'colheita')) return 'Colhido';
  if (!talhao.dataPlantio) return 'Aguardando plantio';
  const dias = diasEntre(talhao.dataPlantio, hoje);
  const ciclo = ciclos[talhao.cultura];
  if (dias < ciclo - 15) return 'Em desenvolvimento';
  if (dias < ciclo) return 'Colheita próxima';
  return 'Ponto de colheita';
}

export interface ResultadoPulverizacao {
  situacao: 'Favorável' | 'Atenção' | 'Desfavorável';
  motivos: string[];
}

export function avaliarPulverizacao(atual: ClimaAtual, probabilidade: number): ResultadoPulverizacao {
  const motivos: string[] = [];
  if (atual.wind_speed_10m > 10) motivos.push('Vento acima de 10 km/h, risco de deriva');
  else if (atual.wind_speed_10m < 3) motivos.push('Vento abaixo de 3 km/h, risco de inversão térmica');
  if (atual.temperature_2m >= 30) motivos.push('Temperatura de 30 °C ou mais');
  if (atual.relative_humidity_2m < 55) motivos.push('Umidade abaixo de 55%');
  if (atual.precipitation !== 0) motivos.push('Chovendo agora');
  if (probabilidade >= 50) motivos.push(`Chuva provável hoje (${probabilidade}%)`);
  return { situacao: motivos.length === 0 ? 'Favorável' : motivos.length === 1 ? 'Atenção' : 'Desfavorável', motivos };
}

export function descricaoTempo(codigo: number): string {
  if (codigo === 0) return 'Céu limpo';
  if ([1, 2, 3].includes(codigo)) return 'Parcialmente nublado';
  if ([45, 48].includes(codigo)) return 'Neblina';
  if (codigo >= 51 && codigo <= 57) return 'Garoa';
  if (codigo >= 61 && codigo <= 67) return 'Chuva';
  if (codigo >= 80 && codigo <= 82) return 'Pancadas de chuva';
  if (codigo >= 95 && codigo <= 99) return 'Trovoada';
  return 'Condição desconhecida';
}

export interface ErrosTalhao {
  nome?: string;
  areaHa?: string;
  dataPlantio?: string;
}

export function validarTalhao(talhao: Talhao, existentes: Talhao[], hoje: string): ErrosTalhao {
  const erros: ErrosTalhao = {};
  if (talhao.nome.trim().length < 3) erros.nome = 'Informe pelo menos 3 caracteres';
  else if (existentes.some(t => t.id !== talhao.id && t.nome.trim().toLocaleLowerCase('pt-BR') === talhao.nome.trim().toLocaleLowerCase('pt-BR'))) {
    erros.nome = 'Já existe um talhão com esse nome';
  }
  if (!Number.isFinite(talhao.areaHa) || talhao.areaHa <= 0 || talhao.areaHa > 10000) {
    erros.areaHa = 'A área deve ser maior que 0 e no máximo 10.000 ha';
  }
  if (talhao.dataPlantio && talhao.dataPlantio > hoje) erros.dataPlantio = 'A data de plantio não pode ser futura';
  return erros;
}

export interface ErrosOperacao {
  data?: string;
  custoCentavos?: string;
  produtividadeScHa?: string;
}

export function validarOperacao(
  talhao: Talhao, operacoes: Operacao[], nova: Operacao, hoje: string,
): ErrosOperacao {
  const erros: ErrosOperacao = {};
  if (!nova.data) erros.data = 'Informe a data da operação';
  else if (nova.data > hoje) erros.data = 'A data da operação não pode ser futura';
  else if (['adubacao', 'pulverizacao', 'colheita'].includes(nova.tipo)) {
    if (!talhao.dataPlantio) erros.data = 'É necessário informar o plantio antes desta operação';
    else if (nova.data < talhao.dataPlantio) erros.data = 'A data não pode ser anterior ao plantio';
  }
  if (nova.tipo === 'colheita' && operacoes.some(op => op.talhaoId === talhao.id && op.tipo === 'colheita')) {
    erros.data = 'Este talhão já possui uma colheita';
  }
  if (!Number.isInteger(nova.custoCentavos) || nova.custoCentavos < 0) erros.custoCentavos = 'Informe um custo válido';
  if (nova.tipo === 'colheita' && (!nova.produtividadeScHa || nova.produtividadeScHa <= 0)) {
    erros.produtividadeScHa = 'Informe produtividade maior que zero';
  }
  return erros;
}

export function custoTotal(operacoes: Operacao[]): number {
  return operacoes.reduce((total, op) => total + op.custoCentavos, 0);
}

export function custoPorHectare(talhao: Talhao, operacoes: Operacao[]): number {
  if (talhao.areaHa <= 0) return 0;
  return Math.round(custoTotal(operacoes.filter(op => op.talhaoId === talhao.id)) / talhao.areaHa);
}

export function producaoSacas(talhao: Talhao, operacoes: Operacao[]): number {
  const colheita = operacoes.find(op => op.talhaoId === talhao.id && op.tipo === 'colheita');
  return colheita ? Math.round((colheita.produtividadeScHa ?? 0) * talhao.areaHa) : 0;
}

export function paraCentavos(reais: number): number {
  return Math.round(reais * 100);
}

export function formatarMoeda(centavos: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(centavos / 100);
}

export function rotuloOperacao(tipo: TipoOperacao): string {
  const rotulos: Record<TipoOperacao, string> = {
    preparo: 'Preparo', plantio: 'Plantio', adubacao: 'Adubação', pulverizacao: 'Pulverização', colheita: 'Colheita',
  };
  return rotulos[tipo];
}

export function previsaoPrimeiroDia(previsao: PrevisaoDiaria): number {
  return previsao.precipitation_probability_max[0] ?? 0;
}
