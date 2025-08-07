import useTodoApp from "/scripts/composable/TodoApp.js";

/**
 * Inicializa funcionalidades da aplicação.
 * E globaliza a variável @var {function() => Object} app na @var {Window} window
 */
window.app = useTodoApp();
