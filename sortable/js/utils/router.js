/**
 * URL <-> State synchronization utilities.
 *
 * Reads the initial application state from the browser's query string and
 * writes the active state back so views can be shared/bookmarked.
 */

const DEFAULTS = {
  search: '',
  field: 'all',
  operator: 'include',
  sort: '',
  order: 'asc',
  page: '1',
  pageSize: '10',
};

/**
 * Parse the current URL query string into an initial state object.
 * Falls back to DEFAULTS for any missing or invalid value.
 */
export function getParamsFromURL() {
  const params = new URLSearchParams(window.location.search);

  const page = parseInt(params.get('page'), 10);
  const pageSize = parseInt(params.get('pageSize'), 10);

  return {
    search: params.get('search') ?? DEFAULTS.search,
    field: params.get('field') ?? DEFAULTS.field,
    operator: params.get('operator') ?? DEFAULTS.operator,
    sort: params.get('sort') ?? DEFAULTS.sort,
    order: params.get('order') ?? DEFAULTS.order,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10,
  };
}

/**
 * Reflect the active state into the URL query string without creating
 * new history entries (replaceState keeps the back button sane).
 */
export function updateURLFromState(state) {
  const params = new URLSearchParams();

  if (state.searchQuery) params.set('search', state.searchQuery);
  if (state.searchField) params.set('field', state.searchField);
  if (state.searchOperator) params.set('operator', state.searchOperator);
  if (state.sortColumn) params.set('sort', state.sortColumn);
  if (state.sortOrder) params.set('order', state.sortOrder);
  if (state.currentPage && state.currentPage > 1) params.set('page', String(state.currentPage));
  if (state.pageSize) params.set('pageSize', String(state.pageSize));

  const queryString = params.toString();
  const newURL = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

  window.history.replaceState(null, '', newURL);
}
