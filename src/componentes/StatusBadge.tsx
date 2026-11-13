import type { SituacaoTalhao } from '../tipos';
interface Props { situacao: SituacaoTalhao }
export function StatusBadge({ situacao }: Props) {
  const classe = situacao === 'Colhido' ? 'colhido' : situacao === 'Ponto de colheita' ? 'ponto' : situacao === 'Colheita próxima' ? 'proxima' : 'normal';
  return <span className={`status ${classe}`}>{situacao}</span>;
}
