import { parseHeight, parseWeight, parseString } from './parsers.js';

/**
 * Safely extracts nested object properties
 */
function getNestedValue(obj, path) {
  if (!obj || !path) return null;
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

/**
 * Filter dataset based on search term, selected column field, and comparison operator
 */
export function filterData(data, query = '', field = 'all', operator = 'include') {
  if (!Array.isArray(data)) return [];
  if (!query.trim()) return data;

  const cleanQuery = query.toLowerCase().trim();

  return data.filter((hero) => {
    // 1. Search across all main text fields if "all" is selected
    if (field === 'all') {
      const searchables = [
        hero.name,
        hero.biography?.fullName,
        hero.biography?.publisher,
        hero.biography?.alignment,
        hero.appearance?.race
      ];

      return searchables.some((val) => 
        parseString(val).toLowerCase().includes(cleanQuery)
      );
    }

    // 2. Extract target field value for targeted field filtering
    let fieldValue = getNestedValue(hero, field);

    // Normalize metric values if filtering by height/weight
    if (field === 'appearance.height') fieldValue = parseHeight(fieldValue);
    else if (field === 'appearance.weight') fieldValue = parseWeight(fieldValue);

    // 3. Numeric Comparison Operators (>, <, ==)
    if (typeof fieldValue === 'number') {
      const targetNum = Number(cleanQuery);
      if (isNaN(targetNum)) return true; // Ignore invalid numeric inputs

      switch (operator) {
        case 'greater': return fieldValue > targetNum;
        case 'less': return fieldValue < targetNum;
        case 'equal': return fieldValue === targetNum;
        default: return true;
      }
    }

    // 4. String Comparison Operators (include, exclude, exact)
    const strVal = parseString(String(fieldValue)).toLowerCase();

    switch (operator) {
      case 'exclude':
        return !strVal.includes(cleanQuery);
      case 'exact':
        return strVal === cleanQuery;
      case 'include':
      default:
        return strVal.includes(cleanQuery);
    }
  });
}