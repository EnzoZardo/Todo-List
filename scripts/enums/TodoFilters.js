// Enum dos filtros da lista de tarefas.
const FiltersEnum = Object.freeze({
  All: 0,
  Pending: 1,
  Concluded: 2,
});

/**
 * Filtros da lista de tarefas referenciados com base no
 * @enum {FiltersEnum}.
 */
const Filters = Object.freeze({
  [FiltersEnum.All]: (_) => true,
  [FiltersEnum.Pending]: (x) => !x.done,
  [FiltersEnum.Concluded]: (x) => x.done,
});

export { Filters, FiltersEnum };
