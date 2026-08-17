import { parseHeight, parseWeight, parseString } from './parsers.js';

/**
 * Safely resolves nested object keys (e.g., "appearance.height")
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

/**
 * Main multi-column sort handler
 */
export function sortData(data, key, order = 'asc') {
  const direction = order === 'asc' ? 1 : -1;

  return [...data].sort((a, b) => {
    let valA = getNestedValue(a, key);
    let valB = getNestedValue(b, key);

    // Parse metric conversions dynamically based on column key
    if (key === 'appearance.height') {
      valA = parseHeight(valA);
      valB = parseHeight(valB);
    } else if (key === 'appearance.weight') {
      valA = parseWeight(valA);
      valB = parseWeight(valB);
    } else if (typeof valA === 'string') {
      valA = parseString(valA).toLowerCase();
      valB = parseString(valB).toLowerCase();
      return valA.localeCompare(valB) * direction;
    }

    // Standard numerical comparison
    if (valA < valB) return -1 * direction;
    if (valA > valB) return 1 * direction;
    return 0;
  });
}