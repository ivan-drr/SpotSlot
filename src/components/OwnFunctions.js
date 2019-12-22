export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export function styledLog(msg) {
    const CORRECT = '1E9E65';
    const WARNING = 'CEB922';
    const ERROR = 'C72A2A';
    const INFO = '598ED1';

    var statusColor = '1E9E65';

    if (msg.includes('☀')) statusColor = CORRECT;
    else if (msg.includes('☂')) statusColor = WARNING;
    else if (msg.includes('❄')) statusColor = ERROR;
    else statusColor = INFO;

    console.info(msg, 'font-size: 2em', 'color: #'+statusColor+';');
}
