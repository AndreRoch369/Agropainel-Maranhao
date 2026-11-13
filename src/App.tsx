import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './componentes/Layout';
import { TalhoesProvider } from './contexto/TalhoesContext';
import { Painel } from './paginas/Painel';
import { Talhoes } from './paginas/Talhoes';
import { FormularioTalhao } from './paginas/FormularioTalhao';
import { DetalheTalhao } from './paginas/DetalheTalhao';
import { Relatorio } from './paginas/Relatorio';
import { NaoEncontrado } from './paginas/NaoEncontrado';

export default function App() {
  return <TalhoesProvider><HashRouter><Routes><Route element={<Layout />}>
    <Route path="/" element={<Painel />} />
    <Route path="/talhoes" element={<Talhoes />} />
    <Route path="/talhoes/novo" element={<FormularioTalhao />} />
    <Route path="/talhoes/:id" element={<DetalheTalhao />} />
    <Route path="/talhoes/:id/editar" element={<FormularioTalhao />} />
    <Route path="/relatorio" element={<Relatorio />} />
    <Route path="*" element={<NaoEncontrado />} />
  </Route></Routes></HashRouter></TalhoesProvider>;
}
