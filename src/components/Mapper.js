import {
  faCoffee, faFileImage, faFileAlt, faFolder, faFile, faFileCode,
} from '@fortawesome/free-solid-svg-icons';

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
  if (key.endsWith('.c')) return 'c';
  if (key.endsWith('.cs')) return 'c#';
  if (key.endsWith('.sh')) return 'bash';
  if (key.endsWith('.swift')) return 'swift';
  if (key.endsWith('.vb')) return 'visual-basic';

  // INTERNET
  if (key.endsWith('.js')) return faFileCode;
  if (key.endsWith('.jsp')) return 'jsp';
  if (key.endsWith('.php')) return 'php';
  if (key.endsWith('.py')) return 'py';
  if (key.endsWith('.asp') || key.endsWith('.aspx')) return 'asp';
  if (key.endsWith('.cer')) return 'certificate';
  if (key.endsWith('.cfm')) return 'coldfusion';
  if (key.endsWith('.css')) return 'css';
  if (key.endsWith('.htm') || key.endsWith('.html')) return 'html';
  if (key.endsWith('.part')) return 'part-downloaded';
  if (key.endsWith('.rss')) return 'rss';
  if (key.endsWith('.xhtml')) return 'xhtml';

  // IMAGE
  if (key.endsWith('.ai')) return 'adobe-ilustrator';
  if (key.endsWith('.bmp')) return 'bitmap';
  if (key.endsWith('.gif')) return 'gif';
  if (key.endsWith('.ico')) return 'icon';
  if (key.endsWith('.jpeg') || key.endsWith('.jpg')) return faFileImage;
  if (key.endsWith('.png')) return faFileImage;
  if (key.endsWith('.ps')) return 'post-script';
  if (key.endsWith('.psd')) return 'psd';
  if (key.endsWith('.svg')) return 'svg';
  if (key.endsWith('.tif') || key.endsWith('.tiff')) return 'tiff';

  // WORD PROCESSOR AND TEXT
  if (key.endsWith('.doc') || key.endsWith('.docx')) return 'word';
  if (key.endsWith('.odt')) return 'odt';
  if (key.endsWith('.pdf')) return 'pdf';
  if (key.endsWith('.rtf')) return 'rich-text';
  if (key.endsWith('.tex')) return 'tex';
  if (key.endsWith('.txt')) return faFileAlt;
  if (key.endsWith('.wks') || key.endsWith('.wps')) return 'microsoft-works';
  if (key.endsWith('.wpd')) return 'wordperfect';

  // VIDEO
  if (key.endsWith('.3g2')) return '3gpp2';
  if (key.endsWith('.3gp')) return '3gpp';
  if (key.endsWith('.avi')) return 'avi';
  if (key.endsWith('.flv')) return 'adobe-flash';
  if (key.endsWith('.h264')) return 'h264';
  if (key.endsWith('.m4v')) return 'apple-mp4';
  if (key.endsWith('.mkv')) return 'mkv';
  if (key.endsWith('.mov')) return 'apple-quicktime';
  if (key.endsWith('.mp4')) return 'mp4';
  if (key.endsWith('.mpg') || key.endsWith('.mpeg')) return 'mpeg';
  if (key.endsWith('.rm')) return 'realmedia';
  if (key.endsWith('.swf')) return 'shockwave';
  if (key.endsWith('.vob')) return 'dvd-video';
  if (key.endsWith('.wmv')) return 'wmv';

  // AUDIO
  if (key.endsWith('.aif')) return 'aif';
  if (key.endsWith('.cda')) return 'cd';
  if (key.endsWith('.mid') || key.endsWith('.midi')) return 'midi';
  if (key.endsWith('.mp3')) return 'mp3';
  if (key.endsWith('.mpa')) return 'mpa';
  if (key.endsWith('.ogg')) return 'ogg';
  if (key.endsWith('.wav')) return 'wav';
  if (key.endsWith('.wma')) return 'wma';
  if (key.endsWith('.wpl')) return 'windows-player';

  // PRESENTATION
  if (key.endsWith('.key')) return 'keynote-presentation';
  if (key.endsWith('.odp')) return 'openoffice-presentation';
  if (key.endsWith('.pps')) return 'powerpoint-slide';
  if (key.endsWith('.ppt')) return 'powerpoint';
  if (key.endsWith('.pptx')) return 'powerpoint-xml';

  // SPREADSHEET
  if (key.endsWith('.ods')) return 'openoffice-calc';
  if (key.endsWith('.xlr')) return 'microsoft-works-spreadsheet';
  if (key.endsWith('.xls')) return 'microsoft-excel';
  if (key.endsWith('.xlsx')) return 'microsoft-excel-xml';

  // COMPRESSED
  if (key.endsWith('.7z')) return '7-zip';
  if (key.endsWith('.arj')) return 'arj';
  if (key.endsWith('.deb')) return 'deb';
  if (key.endsWith('.pkg')) return 'pkg';
  if (key.endsWith('.rar')) return 'rar';
  if (key.endsWith('.rpm')) return 'rpm';
  if (key.endsWith('.tar.gz')) return 'targz';
  if (key.endsWith('.z')) return 'z';
  if (key.endsWith('.zip')) return 'zip';

  // DISC AND MEDIA
  if (key.endsWith('.bin')) return 'binary';
  if (key.endsWith('.dmg')) return 'dmg';
  if (key.endsWith('.iso')) return 'iso';
  if (key.endsWith('.toast')) return 'toast';
  if (key.endsWith('.vcd')) return 'virtual-CD';

  // DATA AND DATABASE
  if (key.endsWith('.csv')) return 'csv';
  if (key.endsWith('.dat')) return 'dat';
  if (key.endsWith('.db') || key.endsWith('.dbf')) return 'database';
  if (key.endsWith('.log')) return 'log';
  if (key.endsWith('.mdb')) return 'mdb';
  if (key.endsWith('.sav')) return 'save';
  if (key.endsWith('.sql')) return 'sql';
  if (key.endsWith('.tar')) return 'tarball';
  if (key.endsWith('.xml')) return 'xml';

  // EXECUTABLE
  if (key.endsWith('.apk')) return 'apk';
  if (key.endsWith('.bat')) return 'bat';
  if (key.endsWith('.bin')) return 'bin';
  if (key.endsWith('.cgi') || key.endsWith('.pl')) return 'perl';
  if (key.endsWith('.com')) return 'msdos-command';
  if (key.endsWith('.exe')) return 'exe';
  if (key.endsWith('.gadget')) return 'gadget';
  if (key.endsWith('.jar')) return 'jar';
  if (key.endsWith('.wsf')) return 'windows-script';

  // FONTS
  if (key.endsWith('.fnt')) return 'windows-font';
  if (key.endsWith('.fon')) return 'font';
  if (key.endsWith('.otf')) return 'open-type-font';
  if (key.endsWith('.ttf')) return 'true-type-font';

  // SYSTEM
  if (key.endsWith('.bak')) return 'backup';
  if (key.endsWith('.cab')) return 'cab';
  if (key.endsWith('.cfg')) return 'configuration';
  if (key.endsWith('.cpl')) return 'cpl';
  if (key.endsWith('.cur')) return 'cur';
  if (key.endsWith('.dll')) return 'dll';
  if (key.endsWith('.dmp')) return 'dump';
  if (key.endsWith('.drv')) return 'device-driver';
  if (key.endsWith('.ini')) return 'ini';
  if (key.endsWith('.lnk')) return 'lnk';
  if (key.endsWith('.msi')) return 'windows-installer';
  if (key.endsWith('.sys')) return 'sys';
  if (key.endsWith('.tmp')) return 'tmp';

  return faFile;
}
