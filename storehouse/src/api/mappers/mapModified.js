import Moment from 'moment';

export function mapModified(arrayFiles) {
  arrayFiles.map((file) => {
    console.log(+Moment().subtract(file.modified.days, 'days'));
    if (file.modified.days!=0) return {
      key: file.key,
      size: file.size,
      modified: +Moment().subtract(file.modified.days, 'days')
    }

    if (file.modified.hours!=0) return {
      key: file.key,
      size: file.size,
      modified: +Moment().subtract(file.modified.hours, 'hours')
    }

    if (file.modified.minutes!=0) return {
      key: file.key,
      size: file.size,
      modified: +Moment().subtract(file.modified.minutes, 'minutes')
    }

    if (file.modified.seconds!=0) return {
      key: file.key,
      size: file.size,
      modified: +Moment().subtract(file.modified.seconds, 'seconds')
    }
  });

  return arrayFiles;
}
