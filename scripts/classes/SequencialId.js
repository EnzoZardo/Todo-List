import LocalStorage from "./LocalStorage.js";

/**
 * Classe para geração e controle de IDs sequenciais persistentes usando localStorage.
 */
export default class SequencialId {
  currentId;
  key;

  /**
   * Cria uma nova instância de SequencialId com base em uma chave de armazenamento.
   * Carrega o último ID usado a partir do localStorage.
   *
   * @param {string} key - Chave usada para armazenar o valor atual no localStorage.
   */
  constructor(key) {
    this.key = key;
    this.currentId = LocalStorage.Int(key);
  }

  /**
   * Avança para o próximo ID e salva no localStorage.
   */
  next() {
    this.currentId++;
    LocalStorage.Set(this.key, this.currentId);
  }

  /**
   * Retorna o ID atual (ou fornecido) como string.
   *
   * @param {number} [id=this.currentId] - ID a ser formatado como string.
   * @returns {string} ID formatado como string.
   */
  id(id = this.currentId) {
    return `${id}`;
  }

  /**
   * Método de fábrica para criar uma nova instância de SequencialId.
   *
   * @param {string} key - Chave para armazenar o valor no localStorage.
   * @returns {SequencialId} Instância da classe.
   */
  static Create(key) {
    return new SequencialId(key);
  }
}
