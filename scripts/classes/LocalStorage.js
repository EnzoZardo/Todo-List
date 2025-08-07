/**
 * Classe para facilitar o uso do localStorage com valores tipados.
 */
export default class LocalStorage {
  /**
   * Recupera um valor numérico armazenado no localStorage.
   * Se o valor não existir ou não for um número válido, retorna 0.
   *
   * @param {string} key - A chave do item armazenado.
   * @returns {number} O valor convertido para número, ou 0 se inválido.
   */
  static Int(key) {
    const x = localStorage.getItem(key);
    if (!x) return 0;

    const n = Number(x);
    if (isNaN(n)) return 0;

    return n;
  }

  /**
   * Recupera uma lista (array) armazenada no localStorage.
   * Se o valor não existir ou não for um array válido, retorna um array vazio.
   *
   * @param {string} key - A chave do item armazenado.
   * @returns {Array<any>} O array recuperado ou um array vazio.
   */
  static List(key) {
    const x = localStorage.getItem(key);
    if (!x) return [];

    const n = JSON.parse(x);
    if (!Array.isArray(n)) return [];

    return n;
  }

  /**
   * Armazena qualquer valor no localStorage após convertê-lo para JSON.
   *
   * @param {string} key - A chave para armazenar o valor.
   * @param {any} val - O valor a ser armazenado.
   */
  static Set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
}
