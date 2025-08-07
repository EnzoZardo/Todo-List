// Enum dos tipos de prioridades de tarefas.
const TaskPriorityEnum = Object.freeze({
  Low: 0,
  Medium: 1,
  High: 2,
});

/**
 * Labels das prioridades de tarefas com base no
 * @enum {TaskPriorityEnum}.
 */
const TaskPriority = Object.freeze({
  [TaskPriorityEnum.Low]: "Baixa",
  [TaskPriorityEnum.Medium]: "Média",
  [TaskPriorityEnum.High]: "Alta",
});

/**
 * Cores das prioridades de tarefas com base no
 * @enum {TaskPriorityEnum}.
 */
const TaskPriorityColors = Object.freeze({
  [TaskPriorityEnum.Low]: "text-success",
  [TaskPriorityEnum.Medium]: "text-warning",
  [TaskPriorityEnum.High]: "text-alert",
});

export { TaskPriority, TaskPriorityEnum, TaskPriorityColors };
