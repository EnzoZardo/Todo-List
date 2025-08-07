/**
 * Classe Dialog
 * Controla a exibição de um modal animado com entrada/saída.
 * Utiliza dois elementos: o contêiner do modal e o card interno animado.
 */
export default class Dialog {
  dialog;
  card;
  openingDurationMs = 500;
  cardCloseDelayMs = 50;

  /**
   * Construtor: inicializa o modal assim que o DOM estiver pronto.
   *
   * @param {string} dialogId - ID do elemento <dialog> ou contêiner principal.
   * @param {string} cardId - ID do elemento interno (como um card animado).
   */
  constructor(dialogId, cardId) {
    window.addEventListener("DOMContentLoaded", () => {
      this.init(dialogId, cardId);
    });
  }

  /**
   * Inicializa os elementos DOM e configura comportamentos.
   *
   * @param {string} dialogId
   * @param {string} cardId
   */
  init(dialogId, cardId) {
    this.dialog = document.getElementById(dialogId);
    this.card = document.getElementById(cardId);
    this.dialog.onsubmit = (e) => e.preventDefault();
    this.card.style.animationDuration = this.getOpeningDuration();
    this.in();
  }

  /**
   * Abre o diálogo, alternando a classe CSS e executando ação extra opcional.
   *
   * @param {Function} [action=() => {}] - Função a ser executada após abrir.
   */
  open(action = () => {}) {
    this.dialog.classList.toggle("open");
    action();
  }

  /**
   * Aplica transição de saída no card.
   */
  out() {
    this.card.setAttribute("transition", "to-bottom");
  }

  /**
   * Aplica transição de entrada no card.
   */
  in() {
    this.card.setAttribute("transition", "from-bottom");
  }

  /**
   * Altera o valor de um campo interno do modal.
   *
   * @param {string} id - ID do campo HTML.
   * @param {any} newValue - Novo valor a ser definido.
   * @param {string} [key="value"] - Propriedade a ser alterada (ex: "value", "textContent").
   */
  changeField(id, newValue, key = "value") {
    document.getElementById(id)[key] = newValue;
  }

  /**
   * Recupera o valor de um campo interno do modal.
   *
   * @param {string} id - ID do campo HTML.
   * @param {string} [key="value"] - Propriedade a ser lida.
   * @returns {any} Valor atual da propriedade do campo.
   */
  getField(id, key = "value") {
    return document.getElementById(id)[key];
  }

  /**
   * Retorna a duração da animação como string (ex: "500ms")
   *
   * @returns {string} Duração formatada para uso em CSS.
   */
  getOpeningDuration() {
    return `${this.openingDurationMs}ms`;
  }

  /**
   * Fecha o modal, aplicando transição de saída e executando ação opcional.
   *
   * @param {Function} [action=() => {}] - Função a ser executada após fechar.
   */
  close(action = () => {}) {
    this.out();

    setTimeout(() => {
      this.dialog.classList.remove("open");
      action();
      this.in();
    }, this.openingDurationMs - 50);
  }
}
