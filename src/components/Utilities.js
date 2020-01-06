/** @module several/functions */

/** Utilities */

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
 * @function
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

    if (console.info(msg, 'font-size: 2em', 'color: #'+statusColor+';')) return true;
    else return false;
}
