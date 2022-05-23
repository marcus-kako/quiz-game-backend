interface IGame {
  id?: number;
  successes: number;
  mistakes: number;
  result: boolean; // Retorna 1 para TRUE, e 0 para FALSE
  date?: string;
}

export default IGame;
