import TaskList from "../classes/TaskList.js";
import TaskDialog from "../classes/Dialog/TaskDialog.js";
import ViewModes from "../enums/ViewModes.js";
import useDOMBuilder from "../composable/DOMBuilder.js";
import { Filters, FiltersEnum } from "../enums/TodoFilters.js";
import { TaskPriority, TaskPriorityColors } from "../enums/TaskPriority.js";

/**
 * Utilitário para armazenar todas as principais funções e fazer o
 * gerenciamento do Todo List (tarefas), incluindo controle de UI, filtros,
 * criação, edição e exclusão de tarefas.
 *
 * @returns {Object} Métodos públicos de controle da aplicação Todo.
 */

export default function useTodoApp() {
  const WINDOW_BREAKPOINT = 400;
  let DOMList;
  let list;
  let dialog;
  let filter = Filters[FiltersEnum.All];

  /**
   * Inicializa os principais elementos e eventos da aplicação.
   * Aguarda o DOM estar carregado para renderizar a lista.
   */
  const init = () => {
    list = new TaskList();
    dialog = new TaskDialog();
    window.addEventListener("DOMContentLoaded", () => {
      DOMList = document.getElementById("task-list");
      renderListOnDOM();
    });
    window.addEventListener("resize", renderListOnDOM);
  };

  /**
   * Abre o modal de tarefas (criação ou edição).
   *
   * @param {number} mode - Modo da visualização (Create, View ou Edit).
   * @param {Object | null} obj - Objeto da tarefa (ou null para nova).
   * @param {number} id - ID da tarefa (opcionalmente gerado).
   */
  const openDialog = (
    mode = ViewModes.Create,
    obj = null,
    id = list.lastId()
  ) => {
    dialog.open(mode, obj, id);
  };

  /**
   * Fecha o modal de tarefas.
   */
  const closeDialog = () => {
    dialog.close();
  };

  /**
   * Salva uma tarefa criada ou editada.
   * Se a tarefa já existe, atualiza; senão, adiciona.
   * Também atualiza o DOM conforme o filtro atual.
   */
  const saveTask = () => {
    const task = dialog.get();
    const { found, index } = list.findById(task.id);
    if (found) {
      list.tasks[index] = task;
      renderListOnDOM();
    } else {
      const newTask = list.push(task);
      if (filter(newTask)) {
        addToDOM(newTask);
      }
    }

    dialog.close();
  };

  /**
   * Re-renderiza toda a lista de tarefas no DOM de acordo com o filtro ativo.
   */
  const renderListOnDOM = () => {
    DOMList.innerHTML = "";
    for (const element of list.getTasks(filter)) {
      addToDOM(element);
    }
  };

  /**
   * Alterna a classe "active" do filtro clicado.
   *
   * @param {HTMLElement} element - Elemento HTML do botão de filtro.
   */
  const toggleActiveFilter = (element) => {
    element.classList.toggle("active");
  };

  /**
   * Define o filtro ativo e re-renderiza a lista de tarefas.
   *
   * @param {number} filterEnum - Enum do filtro (All, Done ou Pening).
   * @param {Event} event - Evento de clique para manipular a UI.
   */
  const setFilter = (filterEnum, event) => {
    filter = Filters[filterEnum];
    const alreadyActive = document.querySelector(".filter.active");
    if (alreadyActive) {
      toggleActiveFilter(alreadyActive);
    }
    toggleActiveFilter(event.target);
    renderListOnDOM();
  };

  /**
   * Adiciona um elemento de tarefa individual ao DOM.
   *
   * @param {Object} obj - Objeto da tarefa a ser renderizada.
   */
  const addToDOM = (obj) => {
    const { div, button, checkbox, icon, span } = useDOMBuilder();
    const d_children = [
      button(
        {
          class: "btn icon rounded text-md",
        },
        () => {
          dialog.open(ViewModes.View, obj, list.sequence.id(obj.id));
        },
        [icon({ class: "text-success" }, "eye")]
      ),
      button(
        {
          class: "btn icon roundeed text-md",
        },
        () => {
          dialog.open(ViewModes.Edit, obj, list.sequence.id(obj.id));
        },
        [icon({ class: "text-info" }, "pencil")]
      ),
      button(
        {
          class: "btn icon rounded text-md",
        },
        () => {
          list.tasks = list.filterBy((x) => x.id != obj.id);
          renderListOnDOM();
        },
        [icon({ class: "text-alert" }, "trash")]
      ),
    ];

    if (window.innerWidth > WINDOW_BREAKPOINT) {
      d_children.unshift(
        ...[
          span(
            {
              class: `${TaskPriorityColors[obj.priority]} bold`,
            },
            `${TaskPriority[obj.priority]}`
          ),
          span({ class: "op-50" }, `Vence em: ${obj.date}`),
        ]
      );
    }

    const d = div(
      {
        class: "task-item row g-3 a-center j-s-between neutral rounded px-1",
      },
      [
        checkbox(
          {
            name: obj.id,
          },
          () => {
            d.classList.toggle("done");
            obj.done = d.classList.contains("done");
            renderListOnDOM();
          },
          obj.done
        ),
        span({ class: "title" }, `#${obj.id} ${obj.title}`),
        div(
          {
            class: "row a-center g-3",
          },
          d_children
        ),
      ]
    );

    if (obj.done) {
      d.classList.add("done");
    }

    DOMList.appendChild(d);
  };

  // Inicializa a aplicação
  init();

  // Retorna os métodos públicos para controle da UI
  return { openDialog, closeDialog, saveTask, setFilter };
}
