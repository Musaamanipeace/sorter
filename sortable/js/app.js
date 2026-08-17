import { fetchSuperheroes } from './api.js';
import { store } from './state.js';
import { initSearch } from './components/search.js';
import { renderTable } from './components/table.js';
import { renderPagination } from './components/pagination.js';
import { renderDetailModal } from './components/detailModal.js';

/**
 * Initialize the superhero application
 */
async function initApp() {
  // 1. Grab target DOM container nodes
  const searchContainer = document.querySelector('#search-controls');
  const tableContainer = document.querySelector('#table-container');
  const paginationContainer = document.querySelector('#pagination-controls');
  const modalContainer = document.querySelector('#modal-container');

  // Show loading indicator in table area
  if (tableContainer) {
    tableContainer.innerHTML = `<div class="loading">Loading superhero database...</div>`;
  }

  // 2. Initialize interactive search controls
  initSearch(searchContainer);

  // 3. Register render functions as subscribers to state changes
  store.subscribe(() => {
    renderTable(tableContainer);
    renderPagination(paginationContainer);
    renderDetailModal(modalContainer);
  });

  // 4. Fetch raw dataset and populate store (triggers initial render)
  const heroes = await fetchSuperheroes();
  store.setRawData(heroes);
}

// Start application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);