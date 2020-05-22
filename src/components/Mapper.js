import {
  faCoffee, faFileImage, faFileAlt,
  faFolder, faFile, faFileCode,
  faFilePdf, faCertificate, faFileDownload,
  faRss, faFileWord, faFileAudio,
  faFileArchive, faFileExcel, faFilePowerpoint,
  faFileVideo, faDatabase, faCompactDisc,
  faRunning, faFont, faLaptopCode,
} from '@fortawesome/free-solid-svg-icons';

export function sizeFilter(size) {
  if (isNaN(size)) size = 0;
  if (size < 1024) return `${size} Bytes`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(2)} Kb`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(2)} Mb`;
  size /= 1024;
  if (size < 1024) return `${size.toFixed(2)} Gb`;
  size /= 1024;
  return `${size.toFixed(2)} Tb`;
}

export function elapsedTime(date) {
  let result = (new Date() - date) / 60;
  let keyword = '';

  if (result < 1000) result = 'Less than 1m';
  else {
    result = Math.trunc(result / 1000);
    if (result === 1) keyword = 'minute';
    else keyword = 'minutes';

    if (result >= 60) {
      result = Math.trunc(result / 10);
      if (result === 1) keyword = 'hour';
      else keyword = 'hours';

      if (result >= 24) {
        result = Math.trunc(result / 24);
        if (result === 1) keyword = 'day';
        else keyword = 'days';

        if (result >= 30) {
          result = Math.trunc(result / 30);
          if (result === 1) keyword = 'month';
          else keyword = 'months';

          if (result >= 12) {
            result = Math.trunc(result / 12);
            if (result === 1) keyword = 'year';
            else keyword = 'years';
          }
        }
      }
    }
  }
  return `${result} ${keyword}`;
}

export function fileName(key) {
  if (isFolder(key)) key = key.slice(0, -1);
  return key.replace(/^.*[\\\\/]/, '');
}

export function lastDirectory(path) {
  const realPath = path;
  if (isFolder(path)) path = path.slice(0, -1);
  const directoryName = path.substring(path.lastIndexOf('/'), path.length);
  return `${realPath.replace(`${directoryName}/`, '')}/`;
}

export function isVisible(key) {
  if (key.endsWith('.pdf')
    || key.endsWith('.bmp')
    || key.endsWith('.gif')
    || key.endsWith('.ico')
    || key.endsWith('.jpeg')
    || key.endsWith('.png')
    || key.endsWith('.svg')
    || key.endsWith('.tif') || key.endsWith('.tiff')
    || key.endsWith('.avi')
    || key.endsWith('.mp4')
    || key.endsWith('.wmv')) return true;
  return false;
}

export function isFolder(key) {
  if (key.endsWith('/')) return true;
  return false;
}

export function fileType(key) {
  if (key.endsWith('/')) return faFolder;
  return extensionFilter(key);
}

function extensionFilter(key) {
  // PROGRAMMING
  if (key.endsWith('.java')) return faCoffee;
  if (key.endsWith('.c')) return faFileCode;
  if (key.endsWith('.cs')) return faFileCode;
  if (key.endsWith('.sh')) return faFileCode;
  if (key.endsWith('.swift')) return faFileCode;
  if (key.endsWith('.vb')) return faFileCode;

  // INTERNET
  if (key.endsWith('.js')) return faFileCode;
  if (key.endsWith('.jsp')) return faFileCode;
  if (key.endsWith('.php')) return faFileCode;
  if (key.endsWith('.py')) return faFileCode;
  if (key.endsWith('.asp') || key.endsWith('.aspx')) return faFileCode;
  if (key.endsWith('.cer')) return faCertificate;
  if (key.endsWith('.cfm')) return faFileCode;
  if (key.endsWith('.css')) return faFileCode;
  if (key.endsWith('.htm') || key.endsWith('.html')) return faFileCode;
  if (key.endsWith('.part')) return faFileDownload;
  if (key.endsWith('.rss')) return faRss;
  if (key.endsWith('.xhtml')) return faFileCode;

  // IMAGE
  if (key.endsWith('.ai')) return faFileImage;
  if (key.endsWith('.bmp')) return faFileImage;
  if (key.endsWith('.gif')) return faFileImage;
  if (key.endsWith('.ico')) return faFileImage;
  if (key.endsWith('.jpeg') || key.endsWith('.jpg')) return faFileImage;
  if (key.endsWith('.png')) return faFileImage;
  if (key.endsWith('.ps')) return faFileImage;
  if (key.endsWith('.psd')) return faFileImage;
  if (key.endsWith('.svg')) return faFileImage;
  if (key.endsWith('.tif') || key.endsWith('.tiff')) return faFileImage;

  // WORD PROCESSOR AND TEXT
  if (key.endsWith('.doc') || key.endsWith('.docx')) return faFileWord;
  if (key.endsWith('.odt')) return faFileWord;
  if (key.endsWith('.pdf')) return faFilePdf;
  if (key.endsWith('.rtf')) return faFileWord;
  if (key.endsWith('.tex')) return faFileWord;
  if (key.endsWith('.txt')) return faFileAlt;
  if (key.endsWith('.wks') || key.endsWith('.wps')) return faFileWord;
  if (key.endsWith('.wpd')) return faFileWord;

  // VIDEO
  if (key.endsWith('.3g2')) return faFileVideo;
  if (key.endsWith('.3gp')) return faFileVideo;
  if (key.endsWith('.avi')) return faFileVideo;
  if (key.endsWith('.flv')) return faFileVideo;
  if (key.endsWith('.h264')) return faFileVideo;
  if (key.endsWith('.m4v')) return faFileVideo;
  if (key.endsWith('.mkv')) return faFileVideo;
  if (key.endsWith('.mov')) return faFileVideo;
  if (key.endsWith('.mp4')) return faFileVideo;
  if (key.endsWith('.mpg') || key.endsWith('.mpeg')) return faFileVideo;
  if (key.endsWith('.rm')) return faFileVideo;
  if (key.endsWith('.swf')) return faFileVideo;
  if (key.endsWith('.vob')) return faFileVideo;
  if (key.endsWith('.wmv')) return faFileVideo;

  // AUDIO
  if (key.endsWith('.aif')) return faFileAudio;
  if (key.endsWith('.cda')) return faFileAudio;
  if (key.endsWith('.mid') || key.endsWith('.midi')) return faFileAudio;
  if (key.endsWith('.mp3')) return faFileAudio;
  if (key.endsWith('.mpa')) return faFileAudio;
  if (key.endsWith('.ogg')) return faFileAudio;
  if (key.endsWith('.wav')) return faFileAudio;
  if (key.endsWith('.wma')) return faFileAudio;
  if (key.endsWith('.wpl')) return faFileAudio;

  // PRESENTATION
  if (key.endsWith('.key')) return faFilePowerpoint;
  if (key.endsWith('.odp')) return faFilePowerpoint;
  if (key.endsWith('.pps')) return faFilePowerpoint;
  if (key.endsWith('.ppt')) return faFilePowerpoint;
  if (key.endsWith('.pptx')) return faFilePowerpoint;

  // SPREADSHEET
  if (key.endsWith('.ods')) return faFileExcel;
  if (key.endsWith('.xlr')) return faFileExcel;
  if (key.endsWith('.xls')) return faFileExcel;
  if (key.endsWith('.xlsx')) return faFileExcel;

  // COMPRESSED
  if (key.endsWith('.7z')) return faFileArchive;
  if (key.endsWith('.arj')) return faFileArchive;
  if (key.endsWith('.deb')) return faFileArchive;
  if (key.endsWith('.pkg')) return faFileArchive;
  if (key.endsWith('.rar')) return faFileArchive;
  if (key.endsWith('.rpm')) return faFileArchive;
  if (key.endsWith('.tar.gz')) return faFileArchive;
  if (key.endsWith('.z')) return faFileArchive;
  if (key.endsWith('.zip')) return faFileArchive;

  // DISC AND MEDIA
  if (key.endsWith('.dmg')) return faCompactDisc;
  if (key.endsWith('.iso')) return faCompactDisc;
  if (key.endsWith('.toast')) return faCompactDisc;
  if (key.endsWith('.vcd')) return faCompactDisc;

  // DATA AND DATABASE
  if (key.endsWith('.csv')) return faDatabase;
  if (key.endsWith('.dat')) return faDatabase;
  if (key.endsWith('.db') || key.endsWith('.dbf')) return faDatabase;
  if (key.endsWith('.log')) return faDatabase;
  if (key.endsWith('.mdb')) return faDatabase;
  if (key.endsWith('.sav')) return faDatabase;
  if (key.endsWith('.sql')) return faDatabase;
  if (key.endsWith('.tar')) return faFileArchive;
  if (key.endsWith('.xml')) return faDatabase;

  // EXECUTABLE
  if (key.endsWith('.apk')) return faRunning;
  if (key.endsWith('.bat')) return faRunning;
  if (key.endsWith('.bin')) return faRunning;
  if (key.endsWith('.cgi') || key.endsWith('.pl')) return faRunning;
  if (key.endsWith('.com')) return faRunning;
  if (key.endsWith('.exe')) return faRunning;
  if (key.endsWith('.gadget')) return faRunning;
  if (key.endsWith('.jar')) return faRunning;
  if (key.endsWith('.wsf')) return faRunning;

  // FONTS
  if (key.endsWith('.fnt')) return faFont;
  if (key.endsWith('.fon')) return faFont;
  if (key.endsWith('.otf')) return faFont;
  if (key.endsWith('.ttf')) return faFont;

  // SYSTEM
  if (key.endsWith('.bak')) return faLaptopCode;
  if (key.endsWith('.cab')) return faLaptopCode;
  if (key.endsWith('.cfg')) return faLaptopCode;
  if (key.endsWith('.cpl')) return faLaptopCode;
  if (key.endsWith('.cur')) return faLaptopCode;
  if (key.endsWith('.dll')) return faLaptopCode;
  if (key.endsWith('.dmp')) return faLaptopCode;
  if (key.endsWith('.drv')) return faLaptopCode;
  if (key.endsWith('.ini')) return faLaptopCode;
  if (key.endsWith('.lnk')) return faLaptopCode;
  if (key.endsWith('.msi')) return faLaptopCode;
  if (key.endsWith('.sys')) return faLaptopCode;
  if (key.endsWith('.tmp')) return faLaptopCode;

  return faFile;
}
