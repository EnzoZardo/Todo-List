/**
 * Utilitário para criar elementos DOM com atributos, eventos e filhos.
 * Facilita a criação de interfaces dinâmicas sem usar frameworks.
 *
 * @returns {Object} Funções utilitárias para criar elementos DOM (div, span, button, icon, checkbox).
 */
export default function useDOMBuilder() {
  /**
   * Define atributos HTML em um elemento.
   *
   * @param {HTMLElement} el - Elemento a ser configurado.
   * @param {Object} attrs - Objeto com pares chave/valor representando atributos HTML.
   */
  const setAttrs = (el, attrs) => {
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
  };

  /**
   * Adiciona múltiplos filhos a um elemento.
   *
   * @param {HTMLElement} el - Elemento pai.
   * @param {HTMLElement[]} [children=[]] - Lista de elementos filhos.
   */
  const addChildren = (el, children = []) => {
    for (const child of children) {
      el.appendChild(child);
    }
  };

  /**
   * Cria um elemento <div> com atributos e filhos.
   *
   * @param {Object} attrs - Atributos HTML para a <div>.
   * @param {HTMLElement[]} [children=[]] - Elementos filhos.
   * @returns {HTMLDivElement} A <div> criada.
   */
  const div = (attrs, children = []) => {
    const d = document.createElement("div");
    setAttrs(d, attrs);
    addChildren(d, children);
    return d;
  };

  /**
   * Cria um elemento <span> com atributos, texto e filhos.
   *
   * @param {Object} attrs - Atributos HTML para o <span>.
   * @param {string} [text=""] - Texto interno do <span>.
   * @param {HTMLElement[]} [children=[]] - Elementos filhos.
   * @returns {HTMLSpanElement} O <span> criado.
   */
  const span = (attrs, text = "", children = []) => {
    const s = document.createElement("span");
    s.innerText = text;
    setAttrs(s, attrs);
    addChildren(s, children);
    return s;
  };

  /**
   * Cria um elemento <button> com atributos, evento de clique e filhos.
   *
   * @param {Object} attrs - Atributos HTML para o <button>.
   * @param {Function} [click=() => {}] - Função a ser executada no clique.
   * @param {HTMLElement[]} [children=[]] - Elementos filhos.
   * @returns {HTMLButtonElement} O <button> criado.
   */
  const button = (attrs, click = () => {}, children = []) => {
    const b = document.createElement("button");
    b.onclick = click;
    setAttrs(b, attrs);
    addChildren(b, children);
    return b;
  };

  /**
   * Cria um elemento <i> (ícone) com classes FontAwesome, atributos e filhos.
   *
   * @param {Object} attrs - Atributos HTML para o <i>.
   * @param {string} icon - Nome do ícone (sem o prefixo "fa-").
   * @param {HTMLElement[]} [children=[]] - Elementos filhos.
   * @returns {HTMLElement} O ícone criado.
   */
  const icon = (attrs, icon, children = []) => {
    const i = document.createElement("i");
    setAttrs(i, attrs);
    addChildren(i, children);
    i.classList.add("fa");
    i.classList.add(`fa-${icon}`);
    return i;
  };

  /**
   * Cria um input do tipo checkbox com atributos, evento de mudança, estado inicial e filhos.
   *
   * @param {Object} attrs - Atributos HTML para o <input>.
   * @param {Function} [change=() => {}] - Função executada ao alterar o checkbox.
   * @param {boolean} [checked=false] - Define se o checkbox começa marcado.
   * @param {HTMLElement[]} [children=[]] - Elementos filhos.
   * @returns {HTMLInputElement} O checkbox criado.
   */
  const checkbox = (
    attrs,
    change = () => {},
    checked = false,
    children = []
  ) => {
    const c = document.createElement("input");
    c.type = "checkbox";
    setAttrs(c, attrs);
    addChildren(c, children);
    c.classList.add("checkbox");
    c.checked = checked;
    c.onchange = change;
    return c;
  };

  return { icon, div, button, checkbox, span };
}
