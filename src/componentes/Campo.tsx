import type { ReactNode } from 'react';
interface Props { id: string; rotulo: string; erro?: string; children: ReactNode }
export function Campo({ id, rotulo, erro, children }: Props) {
  return <div className="campo"><label htmlFor={id}>{rotulo}</label>{children}{erro && <small id={`${id}-erro`} className="erro">{erro}</small>}</div>;
}
