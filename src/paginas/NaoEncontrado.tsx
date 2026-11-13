import { Link } from 'react-router-dom';
export function NaoEncontrado() {
  return <div className="cartao estado"><h1>Página não encontrada</h1><p className="muted">Este endereço não existe no AgroPainel.</p><Link className="botao" to="/">Voltar ao início</Link></div>;
}
