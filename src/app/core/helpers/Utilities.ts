/**
 *  connect an objects of key value into one string
 * @param obj { Object } Object {key : value}
 * @return {string} text
 */
export function ObjectToString(obj) {
  let text = "";
  Object.entries(obj).forEach(([key, value]) => {
    text += `${key}:${value}\n`;
  });
  return text;
}

/**
 *   check if value is not undefined or null
 * @param value T   generic type
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return (value as T) !== undefined && (value as T) !== null;
}
