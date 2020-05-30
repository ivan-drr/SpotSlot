/** Utilities */

let startTime; let
  endTime;

/**
 * Set Date NOW to local variable startTime
 */
export function startCounter() {
  startTime = new Date();
}

/**
 * Set Date NOW to local variable endTime and compare it to startTime
 * @return {string} A formatted string which contain time passed between
 * startTime and endTime
 */
export function endCounter() {
  endTime = new Date();
  let timeDiff = endTime - startTime;

  if (timeDiff >= 1000) timeDiff = (timeDiff / 1000).toFixed(2);
  return ` (${timeDiff}ms)`;
}

/**
 * Foreach in asynchronous way
 * @async
 * @param {object} array - Array to go through
 * @param {function} callback - Function executed for every element of arrray
 */
export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Styled messages for navigator console
 * @param {string} msg - Message wich will be printed on console
 * @return {boolean} If console.log failed returns false, if not returns true
 */
export function styledLog(msg) {
  const CORRECT = '1E9E65';
  const WARNING = 'aca94f';
  const ERROR = 'C72A2A';
  const INFO = '598ED1';

  let statusColor = '1E9E65';

  if (msg.includes('☀')) statusColor = CORRECT;
  else if (msg.includes('☂')) statusColor = WARNING;
  else if (msg.includes('❄')) statusColor = ERROR;
  else statusColor = INFO;

  if (console.info(msg, 'font-size: 2em', `color: #${statusColor};`)) return true;
  return false;
}

export function clone(obj) {
  if (obj == null || typeof obj !== 'object') return obj;
  const copy = obj.constructor();
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}
