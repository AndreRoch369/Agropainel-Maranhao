
import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Campo } from '../componentes/Campo';
import { TituloPagina } from '../componentes/TituloPagina';
import { useTalhoes } from '../contexto/TalhoesContext';
import { municipios } from '../dados/municipios';
import { dataLocal, validarTalhao } from '../dominio/regras';
import type { Cultura, Talhao } from '../tipos';

export function FormularioTalhao() {
  const { id } = useParams();
  const { talhoes, salvarTalhao, excluirTalhao } = useTalhoes();
  const navigate = useNavigate();

  const existente = id
    ? talhoes.find(t => t.id === id)
    : undefined;

  const [nome, setNome] = useState(existente?.nome ?? '');
  const [cultura, setCultura] = useState<Cultura>(
    existente?.cultura ?? 'soja'
  );
  const [area, setArea] = useState(
    existente ? String(existente.areaHa) : ''
  );
  const [municipioId, setMunicipioId] = useState(
    existente?.municipioId ?? 'balsas'
  );
  const [dataPlantio, setDataPlantio] = useState(
    existente?.dataPlantio ?? ''
  );
  const [erros, setErros] = useState<ReturnType<typeof validarTalhao>>({});

  const nomeRef = useRef<HTMLInputElement>(null);
  const areaRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);

  if (id && !existente) {
  return <Navigate to="/talhoes" replace />;
}

  function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const novo: Talhao = {
      id: existente?.id ?? crypto.randomUUID(),
      nome: nome.trim(),
      cultura,
      areaHa: Number(area),
      municipioId,
      dataPlantio: dataPlantio || null
    };

    const validacao = validarTalhao(
      novo,
      talhoes,
      dataLocal(new Date())
    );

    setErros(validacao);

    if (validacao.nome) {
      nomeRef.current?.focus();
      return;
    }

    if (validacao.areaHa) {
      areaRef.current?.focus();
      return;
    }

    if (validacao.dataPlantio) {
      dataRef.current?.focus();
      return;
    }

    salvarTalhao(novo);
    navigate(`/talhoes/${novo.id}`);
  }

 function excluir() {
  if (!existente) return;

  const confirmar = window.confirm(
    `Excluir o talhão "${existente.nome}" e todas as operações?`
  );

  if (!confirmar) return;

  const idExcluido = existente.id;

  navigate('/talhoes', { replace: true });
  excluirTalhao(idExcluido);
}

  return (
    <>
      <TituloPagina
        titulo={existente ? 'Editar talhão' : 'Cadastrar talhão'}
        descricao="Informe os dados da área agrícola."
      />

      <form
        className="cartao formulario"
        onSubmit={enviar}
        noValidate
      >
        <Campo id="nome" rotulo="Nome do talhão" erro={erros.nome}>
          <input
            id="nome"
            ref={nomeRef}
            value={nome}
            onChange={e => setNome(e.target.value)}
            aria-invalid={Boolean(erros.nome)}
            aria-describedby={erros.nome ? 'nome-erro' : undefined}
            placeholder="Ex.: Talhão 1"
          />
        </Campo>

        <div className="form-grid">
          <Campo id="cultura" rotulo="Cultura">
            <select
              id="cultura"
              value={cultura}
              onChange={e => setCultura(e.target.value as Cultura)}
            >
              {(['soja', 'milho', 'algodao', 'arroz', 'feijao'] as const).map(c => (
                <option key={c} value={c}>
                  {c[0].toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id="area"
            rotulo="Área (hectares)"
            erro={erros.areaHa}
          >
            <input
              id="area"
              ref={areaRef}
              type="number"
              min="0.01"
              max="10000"
              step="any"
              value={area}
              onChange={e => setArea(e.target.value)}
              aria-invalid={Boolean(erros.areaHa)}
              aria-describedby={erros.areaHa ? 'area-erro' : undefined}
              placeholder="Ex.: 250"
            />
          </Campo>
        </div>

        <div className="form-grid">
          <Campo id="municipio-form" rotulo="Município">
            <select
              id="municipio-form"
              value={municipioId}
              onChange={e => setMunicipioId(e.target.value)}
            >
              {municipios.map(m => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </select>
          </Campo>

          <Campo
            id="data-plantio"
            rotulo="Data do plantio (opcional)"
            erro={erros.dataPlantio}
          >
            <input
              id="data-plantio"
              ref={dataRef}
              type="date"
              value={dataPlantio}
              onChange={e => setDataPlantio(e.target.value)}
              aria-invalid={Boolean(erros.dataPlantio)}
              aria-describedby={
                erros.dataPlantio ? 'data-plantio-erro' : undefined
              }
            />
          </Campo>
        </div>

        <div className="acoes-form">
          <button type="submit">Salvar talhão</button>

          <Link
            className="botao secundario"
            to={existente ? `/talhoes/${existente.id}` : '/talhoes'}
          >
            Cancelar
          </Link>

          {existente && (
            <button
              className="perigo"
              type="button"
              onClick={excluir}
            >
              Excluir talhão
            </button>
          )}
        </div>
      </form>
    </>
  );
}
