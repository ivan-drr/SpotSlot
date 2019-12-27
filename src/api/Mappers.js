export function mapModified(modified) {
  if (modified.days!=='') {
    const time = modified.days==='1'?' day':' days';
    return modified.days + time;
  } else if (modified.hours!=='') {
    const time = modified.hours==='1'?' hour':' hours';
    return modified.hours + time;
  } else if (modified.minutes!=='') {
    const time = modified.minutes==='1'?' minute':' minutes';
    return modified.minutes + time;
  } else if (modified.seconds!=='') {
    const time = modified.seconds==='1'?' second':' seconds';
    return modified.seconds + time;
  } else if (modified.seconds==='') return 'Now';
  else return 'Not available';
}
