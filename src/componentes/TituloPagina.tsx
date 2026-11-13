import type { ReactNode } from 'react';
interface Props { titulo: string; descricao?: string; acao?: ReactNode }
export function TituloPagina({ titulo, descricao, acao }: Props) {
  return <div className="titulo-pagina"><div><h1>{titulo}</h1>{descricao && <p className="muted">{descricao}</p>}</div>{acao && <div>{acao}</div>}</div>;
}
