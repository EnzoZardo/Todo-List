import Dialog from "./Dialog.js";
import ViewModes from "../../enums/ViewModes.js";

/**
 * Classe responsável por manipular o modal de tarefas.
 * Permite abrir, fechar, obter dados do formulário e preencher campos com base em objetos.
 * Herda comportamento da classe Dialog.
 */
export default class TaskDialog extends Dialog {
  /**
   * Construtor da TaskDialog, que inicializa o modal com IDs específicos.
   * Chama o construtor da superclasse (Dialog).
   */
  constructor() {
    super("task-dialog", "task-card");
  }

  /**
   * Abre o modal no modo de criação ou edição.
   * Define os valores iniciais dos campos com base no modo e objeto fornecido.
   *
   * @param {number} mode - Modo de visualização (Create ou Edit).
   * @param {Object | null} obj - Objeto com os dados da tarefa (usado no modo Edit).
   * @param {number | string} id - ID da tarefa (gerado automaticamente ou existente).
   */
  open(mode = ViewModes.Create, obj = null, id) {
    super.open(() => {
      super.changeField("task-id", id, "innerText");

      if (mode == ViewModes.Create) {
        super.changeField("task-title", super.getField("new-task-title"));
        super.changeField("new-task-title", null);
      }

      if (mode == ViewModes.Edit || mode == ViewModes.View) {
        this.set(obj);
      }

      if (mode == ViewModes.View) {
        this.view();
      }
    });
  }

  /**
   * Fecha o modal e executa a função de limpeza dos campos.
   */
  close() {
    this.view(false);
    super.close(this.clear);
  }

  /**
   * Obtém os valores atuais dos campos do formulário de tarefa.
   *
   * @returns {Object} Objeto com os dados da tarefa preenchida.
   */
  get() {
    return {
      id: Number(super.getField("task-id", "innerText")),
      title: super.getField("task-title"),
      date: super.getField("task-date"),
      priority: super.getField("task-priority"),
      description: super.getField("task-description"),
    };
  }

  /**
   * Preenche os campos do formulário com os dados de uma tarefa.
   *
   * @param {Object} obj - Objeto com os dados da tarefa.
   */
  set(obj) {
    super.changeField("task-title", obj.title);
    super.changeField("task-date", obj.date);
    super.changeField("task-priority", obj.priority);
    super.changeField("task-description", obj.description);
  }

  /**
   * Ajusta os campos do formulário para não serem alterados
   * no modo de visualização.
   *
   * @param {boolean} view - Determina se será modo de visualização ou não.
   */
  view(view = true) {
    super.changeField("task-title", view, "disabled");
    super.changeField("task-date", view, "disabled");
    super.changeField("task-priority", view, "disabled");
    super.changeField("task-description", view, "disabled");
  }

  /**
   * Limpa os campos do formulário de tarefa.
   */
  clear() {
    super.changeField("task-title", null);
    super.changeField("task-date", null);
    super.changeField("task-priority", 0);
    super.changeField("task-description", null);
  }
}
