import SequencialId from "./SequencialId.js";
import LocalStorage from "./LocalStorage.js";
import { Filters, FiltersEnum } from "../enums/TodoFilters.js";

/**
 * Classe responsável por gerenciar a lista de tarefas.
 * Lida com criação, persistência, busca e filtragem.
 */
export default class TaskList {
  sequence = SequencialId.Create("current-id");
  tasks;

  /**
   * Construtor: carrega dados do localStorage e define filtro inicial.
   * Também configura evento para salvar dados antes de sair da página.
   */
  constructor() {
    this.curFilter = Filters[FiltersEnum.All];
    this.tasks = LocalStorage.List("tasks");
    window.addEventListener("beforeunload", () => {
      LocalStorage.Set("tasks", this.tasks);
      LocalStorage.Set("current-id", this.sequence.currentId);
    });
  }

  /**
   * Retorna o último ID gerado (sem incrementar).
   *
   * @returns {string} Último ID usado.
   */
  lastId() {
    return this.sequence.id();
  }

  /**
   * Adiciona uma nova tarefa à lista com ID
   * sequencial e marca como não concluída.
   *
   * @param {Object} obj - Objeto parcial com os dados da tarefa (sem ID nem done).
   * @returns {Object} Tarefa completa que foi inserida.
   */
  push(obj) {
    const toInsert = {
      done: false,
      id: this.sequence.currentId,
      ...obj,
    };
    this.tasks.push(toInsert);
    this.sequence.next();
    return toInsert;
  }

  /**
   * Procura uma tarefa pelo ID.
   *
   * @param {number} id - ID da tarefa a ser localizada.
   * @returns {{ found: Object | undefined, index: number }} Objeto com a tarefa encontrada (ou undefined) e o índice.
   */
  findById(id) {
    let index = -1;
    const found = this.tasks.find((x, i) => {
      if (x.id == id) {
        index = i;
        return x;
      }
    });
    return { found, index };
  }

  /**
   * Filtra a lista de tarefas com uma função customizada.
   *
   * @param {function(Object): boolean} func - Função usada para filtrar.
   * @returns {Array<Object>} Lista de tarefas filtradas.
   */
  filterBy(func = () => {}) {
    return this.tasks.filter(func);
  }

  /**
   * Retorna a lista de tarefas aplicando o filtro atual ou o passado por parâmetro.
   *
   * @param {function(Object): boolean} filter - Filtro a ser aplicado (default: mostrar todas).
   * @returns {Array<Object>} Lista de tarefas filtradas.
   */
  getTasks(filter = Filters[FiltersEnum.All]) {
    return this.tasks.filter(filter);
  }
}
