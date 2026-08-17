import { store } from '../state.js';

/**
 * Render and mount search inputs and filter controls
 */
export function initSearch(containerElement) {
  if (!containerElement) return;

  const { searchQuery, searchField, searchOperator, pageSize } = store.state;

  containerElement.innerHTML = `
    <div class="search-group">
      <input 
        type="text" 
        id="search-input" 
        placeholder="Search hero vault..." 
        value="${searchQuery}" 
      />

      <select id="search-field">
        <option value="all" ${searchField === 'all' ? 'selected' : ''}>All Fields</option>
        <option value="name" ${searchField === 'name' ? 'selected' : ''}>Name</option>
        <option value="biography.publisher" ${searchField === 'biography.publisher' ? 'selected' : ''}>Publisher</option>
        <option value="biography.alignment" ${searchField === 'biography.alignment' ? 'selected' : ''}>Alignment</option>
        <option value="appearance.race" ${searchField === 'appearance.race' ? 'selected' : ''}>Race</option>
        <option value="appearance.height" ${searchField === 'appearance.height' ? 'selected' : ''}>Height</option>
        <option value="appearance.weight" ${searchField === 'appearance.weight' ? 'selected' : ''}>Weight</option>
      </select>

      <select id="search-operator">
        <option value="include" ${searchOperator === 'include' ? 'selected' : ''}>Includes</option>
        <option value="exact" ${searchOperator === 'exact' ? 'selected' : ''}>Exact Match</option>
        <option value="exclude" ${searchOperator === 'exclude' ? 'selected' : ''}>Excludes</option>
        <option value="greater" ${searchOperator === 'greater' ? 'selected' : ''}>Greater Than (&gt;)</option>
        <option value="less" ${searchOperator === 'less' ? 'selected' : ''}>Less Than (&lt;)</option>
        <option value="equal" ${searchOperator === 'equal' ? 'selected' : ''}>Equal To (=)</option>
      </select>
    </div>

    <div class="page-size-group">
      <label for="page-size-select">Per page:</label>
      <select id="page-size-select">
        <option value="10" ${pageSize === 10 ? 'selected' : ''}>10</option>
        <option value="20" ${pageSize === 20 ? 'selected' : ''}>20</option>
        <option value="50" ${pageSize === 50 ? 'selected' : ''}>50</option>
        <option value="100" ${pageSize === 100 ? 'selected' : ''}>100</option>
      </select>
    </div>
  `;

  // --- Event Listeners ---

  const searchInput = containerElement.querySelector('#search-input');
  const searchFieldSelect = containerElement.querySelector('#search-field');
  const searchOperatorSelect = containerElement.querySelector('#search-operator');
  const pageSizeSelect = containerElement.querySelector('#page-size-select');

  // Input listener updates searchQuery on every keystroke
  searchInput.addEventListener('input', (e) => {
    store.setState({ searchQuery: e.target.value });
  });

  // Dropdown change listeners update their respective state keys
  searchFieldSelect.addEventListener('change', (e) => {
    store.setState({ searchField: e.target.value });
  });

  searchOperatorSelect.addEventListener('change', (e) => {
    store.setState({ searchOperator: e.target.value });
  });

  pageSizeSelect.addEventListener('change', (e) => {
    store.setState({ pageSize: Number(e.target.value) });
  });
}