
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import type { ReactNode } from 'react';
import type { Operacao, Talhao } from '../tipos';

interface DadosSalvos {
  talhoes: Talhao[];
  operacoes: Operacao[];
}

interface TalhoesContexto extends DadosSalvos {
  salvarTalhao: (talhao: Talhao) => void;
  excluirTalhao: (id: string) => void;
  adicionarOperacao: (operacao: Operacao) => void;
}

const CHAVE = 'agropainel-dados-v1';

const Contexto = createContext<TalhoesContexto | null>(null);

function lerDados(): DadosSalvos {
  try {
    const bruto = localStorage.getItem(CHAVE);

    if (!bruto) {
      return { talhoes: [], operacoes: [] };
    }

    const dados: unknown = JSON.parse(bruto);

    if (
      typeof dados !== 'object' ||
      dados === null ||
      !('talhoes' in dados) ||
      !('operacoes' in dados)
    ) {
      throw new Error('Formato inválido');
    }

    const obj = dados as DadosSalvos;

    if (
      !Array.isArray(obj.talhoes) ||
      !Array.isArray(obj.operacoes)
    ) {
      throw new Error('Listas inválidas');
    }

    const talhoes = obj.talhoes.filter(
      (t): t is Talhao =>
        Boolean(t) &&
        typeof t.id === 'string' &&
        typeof t.nome === 'string' &&
        typeof t.areaHa === 'number' &&
        typeof t.cultura === 'string' &&
        typeof t.municipioId === 'string' &&
        (t.dataPlantio === null || typeof t.dataPlantio === 'string')
    );

    const operacoes = obj.operacoes.filter(
      (o): o is Operacao =>
        Boolean(o) &&
        typeof o.id === 'string' &&
        typeof o.talhaoId === 'string' &&
        typeof o.tipo === 'string' &&
        typeof o.data === 'string' &&
        typeof o.custoCentavos === 'number'
    );

    return { talhoes, operacoes };
  } catch {
    return { talhoes: [], operacoes: [] };
  }
}

export function TalhoesProvider({
  children
}: {
  children: ReactNode;
}) {
  const [dados, setDados] = useState<DadosSalvos>(lerDados);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(dados));
    } catch {
      // Falha de armazenamento não derruba a interface.
    }
  }, [dados]);

  function salvarTalhao(talhao: Talhao) {
    setDados(atual => ({
      ...atual,
      talhoes: atual.talhoes.some(t => t.id === talhao.id)
        ? atual.talhoes.map(t =>
            t.id === talhao.id ? talhao : t
          )
        : [...atual.talhoes, talhao]
    }));
  }

  function excluirTalhao(id: string) {
    setDados(atual => ({
      talhoes: atual.talhoes.filter(t => t.id !== id),
      operacoes: atual.operacoes.filter(
        o => o.talhaoId !== id
      )
    }));
  }

  function adicionarOperacao(operacao: Operacao) {
    setDados(atual => ({
      ...atual,
      operacoes: [...atual.operacoes, operacao]
    }));
  }

  return (
    <Contexto.Provider
      value={{
        ...dados,
        salvarTalhao,
        excluirTalhao,
        adicionarOperacao
      }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function useTalhoes(): TalhoesContexto {
  const contexto = useContext(Contexto);

  if (!contexto) {
    throw new Error(
      'useTalhoes precisa estar dentro de TalhoesProvider'
    );
  }

  return contexto;
}

