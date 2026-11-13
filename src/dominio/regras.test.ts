import { describe, expect, it } from 'vitest';
import { adicionarDias, avaliarPulverizacao, custoPorHectare, dataLocal, descricaoTempo, diasEntre, paraCentavos, previsaoColheita, producaoSacas, situacaoTalhao, validarOperacao, validarTalhao } from './regras';
import type { ClimaAtual, Operacao, Talhao } from '../tipos';

const hoje = '2026-11-09';
const base: Talhao = { id: '1', nome: 'Talhão 1', cultura: 'soja', areaHa: 250, municipioId: 'balsas', dataPlantio: '2026-10-01' };
const clima: ClimaAtual = { wind_speed_10m: 6, temperature_2m: 27, relative_humidity_2m: 70, precipitation: 0, weather_code: 0 };
function operacao(tipo: Operacao['tipo'], extra: Partial<Operacao> = {}): Operacao {
  return { id: 'op1', talhaoId: '1', tipo, data: hoje, descricao: '', custoCentavos: 0, ...extra };
}

describe('AgroPainel — cenários de aceitação Tema A', () => {
  it('A01: soja em 01/10: 39 dias, previsão 29/01, em desenvolvimento', () => {
    expect(diasEntre('2026-10-01', hoje)).toBe(39);
    expect(previsaoColheita(base)).toBe('2027-01-29');
    expect(situacaoTalhao(base, [], hoje)).toBe('Em desenvolvimento');
  });
  it('A02: milho 01/07: 131 dias, previsão 18/11, colheita próxima', () => {
    const milho: Talhao = { ...base, cultura: 'milho', dataPlantio: '2026-07-01' };
    expect(diasEntre(milho.dataPlantio!, hoje)).toBe(131);
    expect(previsaoColheita(milho)).toBe('2026-11-18');
    expect(situacaoTalhao(milho, [], hoje)).toBe('Colheita próxima');
  });
  it('A03: feijão 01/08, ponto de colheita', () => {
    const feijao: Talhao = { ...base, cultura: 'feijao', dataPlantio: '2026-08-01' };
    expect(diasEntre(feijao.dataPlantio!, hoje)).toBe(100);
    expect(previsaoColheita(feijao)).toBe('2026-10-30');
    expect(situacaoTalhao(feijao, [], hoje)).toBe('Ponto de colheita');
  });
  it('A04: feijão com colheita registrada é colhido', () => {
    expect(situacaoTalhao(base, [operacao('colheita')], hoje)).toBe('Colhido');
  });
  it('A05: sem data de plantio aguarda plantio', () => {
    const t = { ...base, dataPlantio: null };
    expect(situacaoTalhao(t, [], hoje)).toBe('Aguardando plantio');
    expect(previsaoColheita(t)).toBeNull();
  });
  it('A06: condições favoráveis sem motivos', () => {
    expect(avaliarPulverizacao(clima, 20)).toEqual({ situacao: 'Favorável', motivos: [] });
  });
  it('A07: vento 12 gera atenção', () => {
    expect(avaliarPulverizacao({ ...clima, wind_speed_10m: 12 }, 20)).toEqual({ situacao: 'Atenção', motivos: ['Vento acima de 10 km/h, risco de deriva'] });
  });
  it('A08: temperatura 30 gera atenção, vento 10 e umidade 55 são aceitos', () => {
    expect(avaliarPulverizacao({ ...clima, wind_speed_10m: 10, temperature_2m: 30, relative_humidity_2m: 55 }, 20).motivos).toEqual(['Temperatura de 30 °C ou mais']);
  });
  it('A09: quatro falhas resultam em desfavorável', () => {
    const r = avaliarPulverizacao({ ...clima, wind_speed_10m: 2, temperature_2m: 33, relative_humidity_2m: 40 }, 60);
    expect(r.situacao).toBe('Desfavorável'); expect(r.motivos).toHaveLength(4);
  });
  it('A10: nome duplicado sem diferenciar maiúsculas', () => {
    expect(validarTalhao({ ...base, id: '2', nome: 'talhão 1' }, [base], hoje).nome).toBe('Já existe um talhão com esse nome');
  });
  it('A11: pulverização anterior ao plantio recusada', () => {
    expect(validarOperacao(base, [], operacao('pulverizacao', { data: '2026-09-30' }), hoje).data).toBe('A data não pode ser anterior ao plantio');
  });
  it('A12: custo por hectare R$ 650,00', () => {
    expect(custoPorHectare(base, [operacao('preparo', { custoCentavos: 12500000 }), operacao('adubacao', { id: 'op2', custoCentavos: 3750000 })])).toBe(65000);
  });
  it('A13: 62 sc/ha em 250 ha são 15.500 sacas', () => {
    expect(producaoSacas(base, [operacao('colheita', { produtividadeScHa: 62 })])).toBe(15500);
  });
  it('valida área e data futura', () => {
    expect(validarTalhao({ ...base, areaHa: 0, dataPlantio: '2027-01-01' }, [], hoje)).toMatchObject({ areaHa: expect.any(String), dataPlantio: expect.any(String) });
  });
  it('impede segunda colheita', () => {
    expect(validarOperacao(base, [operacao('colheita')], operacao('colheita', { id: 'op2', produtividadeScHa: 30 }), hoje).data).toContain('já possui');
  });
  it('arredonda valores em centavos', () => { expect(paraCentavos(28.75)).toBe(2875); });
  it('interpreta código de tempo', () => { expect(descricaoTempo(95)).toBe('Trovoada'); });
  it('soma dias com UTC sem deslocamento', () => { expect(adicionarDias('2026-10-01', 120)).toBe('2027-01-29'); });
  it('data local não depende de UTC', () => { expect(dataLocal(new Date(2026, 10, 9))).toBe('2026-11-09'); });
});
