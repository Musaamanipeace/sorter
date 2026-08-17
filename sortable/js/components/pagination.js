import { store } from '../state.js';

/**
 * Render pagination controls and page indicator summary
 */
export function renderPagination(containerElement) {
  if (!containerElement) return;

  const { filteredData, currentPage, pageSize } = store.state;

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Calculate item range currently displayed
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  containerElement.innerHTML = `
    <div class="pagination-info">
      Showing <strong>${startItem}</strong> - <strong>${endItem}</strong> of <strong>${totalItems}</strong> heroes
    </div>

    <div class="pagination-buttons">
      <button id="btn-first" ${currentPage <= 1 ? 'disabled' : ''}>&laquo; First</button>
      <button id="btn-prev" ${currentPage <= 1 ? 'disabled' : ''}>&lt; Prev</button>

      <span class="page-indicator">Page <strong>${currentPage}</strong> of <strong>${totalPages}</strong></span>

      <button id="btn-next" ${currentPage >= totalPages ? 'disabled' : ''}>Next &gt;</button>
      <button id="btn-last" ${currentPage >= totalPages ? 'disabled' : ''}>Last &raquo;</button>
    </div>
  `;

  // --- Event Listeners ---

  const btnFirst = containerElement.querySelector('#btn-first');
  const btnPrev = containerElement.querySelector('#btn-prev');
  const btnNext = containerElement.querySelector('#btn-next');
  const btnLast = containerElement.querySelector('#btn-last');

  if (btnFirst) {
    btnFirst.addEventListener('click', () => {
      if (currentPage > 1) store.setState({ currentPage: 1 });
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentPage > 1) store.setState({ currentPage: currentPage - 1 });
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentPage < totalPages) store.setState({ currentPage: currentPage + 1 });
    });
  }

  if (btnLast) {
    btnLast.addEventListener('click', () => {
      if (currentPage < totalPages) store.setState({ currentPage: totalPages });
    });
  }
}