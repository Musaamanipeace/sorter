import { getParamsFromURL, updateURLFromState } from './utils/router.js';
import { sortData } from './utils/sorter.js';
import { filterData } from './utils/filter.js';

class StateStore {
  constructor() {
    // Initial State derived from URL query parameters or defaults
    const initialParams = getParamsFromURL();

    this.state = {
      rawData: [],
      filteredData: [],
      displayData: [],
      searchQuery: initialParams.search,
      searchField: initialParams.field,
      searchOperator: initialParams.operator,
      sortColumn: initialParams.sort,
      sortOrder: initialParams.order,
      currentPage: initialParams.page,
      pageSize: initialParams.pageSize,
      selectedHero: null,
    };

    this.listeners = [];
  }

  /**
   * Subscribe component render callbacks to state changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notify all subscribed components to re-render
   */
  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  /**
   * Populate initial dataset and trigger first pipeline computation
   */
  setRawData(data) {
    this.state.rawData = data;
    this.recomputePipeline();
  }

  /**
   * Update arbitrary state keys and recalculate transformed data slices
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };

    // Reset to page 1 if search or sort configuration changes
    if (
      newState.searchQuery !== undefined ||
      newState.searchField !== undefined ||
      newState.searchOperator !== undefined ||
      newState.pageSize !== undefined
    ) {
      this.state.currentPage = 1;
    }

    this.recomputePipeline();
  }

  /**
   * Data Processing Pipeline: Filter -> Sort -> Paginate
   */
  recomputePipeline() {
    // 1. Filter raw data based on query criteria
    this.state.filteredData = filterData(
      this.state.rawData,
      this.state.searchQuery,
      this.state.searchField,
      this.state.searchOperator
    );

    // 2. Sort filtered data by selected column and direction
    const sorted = sortData(
      this.state.filteredData,
      this.state.sortColumn,
      this.state.sortOrder
    );

    // 3. Paginate sorted data slice for the current view
    const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
    const endIndex = startIndex + this.state.pageSize;
    this.state.displayData = sorted.slice(startIndex, endIndex);

    // 4. Synchronize active state with the browser URL query string
    updateURLFromState(this.state);

    // 5. Broadcast state update to all UI subscribers
    this.notify();
  }
}

export const store = new StateStore();