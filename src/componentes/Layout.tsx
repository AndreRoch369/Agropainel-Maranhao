import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { para: '/', nome: 'Painel', fim: true },
  { para: '/talhoes', nome: 'Talhões', fim: false },
  { para: '/talhoes/novo', nome: 'Novo talhão', fim: false },
  { para: '/relatorio', nome: 'Relatório', fim: false },
];
export function Layout() {
  return <div className="app">
    <header className="cabecalho">
      <div className="container barra">
        <NavLink to="/" className="marca" aria-label="AgroPainel, ir para início"><span className="marca-icone" aria-hidden="true">✦</span><span>Agro<span className="marca-clara">Painel</span><small>SUL DO MARANHÃO</small></span></NavLink>
        <nav className="navegacao" aria-label="Navegação principal">
          {links.map(link => <NavLink key={link.para} to={link.para} end={link.fim} className={({ isActive }) => isActive ? 'nav-link ativo' : 'nav-link'}>{link.nome}</NavLink>)}
        </nav>
      </div>
    </header>
    <main className="container conteudo"><Outlet /></main>
    <footer className="rodape"><div className="container">AgroPainel · Projeto acadêmico — Programação para Web · Dados meteorológicos: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo.com</a></div></footer>
  </div>;
}
