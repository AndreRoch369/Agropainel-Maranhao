interface Props { rotulo: string; valor: string; detalhe?: string }
export function MetricCard({ rotulo, valor, detalhe }: Props) {
  return <div className="cartao metrica"><p className="muted">{rotulo}</p><strong>{valor}</strong>{detalhe && <small>{detalhe}</small>}</div>;
}
