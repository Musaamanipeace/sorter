/**
 * Clean and parse height array or string into standard centimeters (number)
 */
export function parseHeight(heightArray) {
  if (!heightArray || !Array.isArray(heightArray) || heightArray.length < 2) {
    return -1;
  }
  const cmStr = heightArray[1]; // e.g., "185 cm"
  const parsed = parseInt(cmStr, 10);
  return isNaN(parsed) || parsed <= 0 ? -1 : parsed;
}

/**
 * Clean and parse weight array or string into standard kilograms (number)
 */
export function parseWeight(weightArray) {
  if (!weightArray || !Array.isArray(weightArray) || weightArray.length < 2) {
    return -1;
  }
  const kgStr = weightArray[1]; // e.g., "85 kg"
  const parsed = parseInt(kgStr, 10);
  return isNaN(parsed) || parsed <= 0 ? -1 : parsed;
}

/**
 * Handle missing or null text fields safely
 */
export function parseString(value) {
  if (!value || value === "-" || value === "null") {
    return "N/A";
  }
  return value.trim();
}