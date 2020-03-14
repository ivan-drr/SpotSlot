import { faCoffee, faFileImage, faFileAlt, faFolder, faFile, faFileCode } from '@fortawesome/free-solid-svg-icons'

export function fileName(key) {
  if (isFolder(key)) key = key.slice(0, -1);
  return key.replace(/^.*[\\\\/]/, '');
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
  else return false;
}

export function isFolder(key) {
  if (key.endsWith('/')) return true;
  else return false;
}

export function fileType(key) {
  if (key.endsWith('/')) return faFolder;
  else return extensionFilter(key);
}

export function displayStructure() {

}

function extensionFilter(key) {
  // PROGRAMMING
  if (key.endsWith('.java')) return faCoffee;
  else if (key.endsWith('.c')) return 'c';
  else if (key.endsWith('.cs')) return 'c#';
  else if (key.endsWith('.sh')) return 'bash';
  else if (key.endsWith('.swift')) return 'swift';
  else if (key.endsWith('.vb')) return 'visual-basic';

  // INTERNET
  else if (key.endsWith('.js')) return faFileCode;
  else if (key.endsWith('.jsp')) return 'jsp';
  else if (key.endsWith('.php')) return 'php';
  else if (key.endsWith('.py')) return 'py';
  else if (key.endsWith('.asp') || key.endsWith('.aspx')) return 'asp';
  else if (key.endsWith('.cer')) return 'certificate';
  else if (key.endsWith('.cfm')) return 'coldfusion';
  else if (key.endsWith('.css')) return 'css';
  else if (key.endsWith('.htm') || key.endsWith('.html')) return 'html';
  else if (key.endsWith('.part')) return 'part-downloaded';
  else if (key.endsWith('.rss')) return 'rss';
  else if (key.endsWith('.xhtml')) return 'xhtml';

  // IMAGE
  else if (key.endsWith('.ai')) return 'adobe-ilustrator';
  else if (key.endsWith('.bmp')) return 'bitmap';
  else if (key.endsWith('.gif')) return 'gif';
  else if (key.endsWith('.ico')) return 'icon';
  else if (key.endsWith('.jpeg') || key.endsWith('.jpg')) return faFileImage;
  else if (key.endsWith('.png')) return faFileImage;
  else if (key.endsWith('.ps')) return 'post-script';
  else if (key.endsWith('.psd')) return 'psd';
  else if (key.endsWith('.svg')) return 'svg';
  else if (key.endsWith('.tif') || key.endsWith('.tiff')) return 'tiff';

  // WORD PROCESSOR AND TEXT
  else if (key.endsWith('.doc') || key.endsWith('.docx')) return 'word';
  else if (key.endsWith('.odt')) return 'odt';
  else if (key.endsWith('.pdf')) return 'pdf';
  else if (key.endsWith('.rtf')) return 'rich-text';
  else if (key.endsWith('.tex')) return 'tex';
  else if (key.endsWith('.txt')) return faFileAlt;
  else if (key.endsWith('.wks') || key.endsWith('.wps')) return 'microsoft-works';
  else if (key.endsWith('.wpd')) return 'wordperfect';

  // VIDEO
  else if (key.endsWith('.3g2')) return '3gpp2';
  else if (key.endsWith('.3gp')) return '3gpp';
  else if (key.endsWith('.avi')) return 'avi';
  else if (key.endsWith('.flv')) return 'adobe-flash';
  else if (key.endsWith('.h264')) return 'h264';
  else if (key.endsWith('.m4v')) return 'apple-mp4';
  else if (key.endsWith('.mkv')) return 'mkv';
  else if (key.endsWith('.mov')) return 'apple-quicktime';
  else if (key.endsWith('.mp4')) return 'mp4';
  else if (key.endsWith('.mpg') || key.endsWith('.mpeg')) return 'mpeg';
  else if (key.endsWith('.rm')) return 'realmedia';
  else if (key.endsWith('.swf')) return 'shockwave';
  else if (key.endsWith('.vob')) return 'dvd-video';
  else if (key.endsWith('.wmv')) return 'wmv';

  // AUDIO
  else if (key.endsWith('.aif')) return 'aif';
  else if (key.endsWith('.cda')) return 'cd';
  else if (key.endsWith('.mid') || key.endsWith('.midi')) return 'midi';
  else if (key.endsWith('.mp3')) return 'mp3';
  else if (key.endsWith('.mpa')) return 'mpa';
  else if (key.endsWith('.ogg')) return 'ogg';
  else if (key.endsWith('.wav')) return 'wav';
  else if (key.endsWith('.wma')) return 'wma';
  else if (key.endsWith('.wpl')) return 'windows-player';

  // PRESENTATION
  else if (key.endsWith('.key')) return 'keynote-presentation';
  else if (key.endsWith('.odp')) return 'openoffice-presentation';
  else if (key.endsWith('.pps')) return 'powerpoint-slide';
  else if (key.endsWith('.ppt')) return 'powerpoint';
  else if (key.endsWith('.pptx')) return 'powerpoint-xml';

  // SPREADSHEET
  else if (key.endsWith('.ods')) return 'openoffice-calc';
  else if (key.endsWith('.xlr')) return 'microsoft-works-spreadsheet';
  else if (key.endsWith('.xls')) return 'microsoft-excel';
  else if (key.endsWith('.xlsx')) return 'microsoft-excel-xml';

  // COMPRESSED
  else if (key.endsWith('.7z')) return '7-zip';
  else if (key.endsWith('.arj')) return 'arj';
  else if (key.endsWith('.deb')) return 'deb';
  else if (key.endsWith('.pkg')) return 'pkg';
  else if (key.endsWith('.rar')) return 'rar';
  else if (key.endsWith('.rpm')) return 'rpm';
  else if (key.endsWith('.tar.gz')) return 'targz';
  else if (key.endsWith('.z')) return 'z';
  else if (key.endsWith('.zip')) return 'zip';

  // DISC AND MEDIA
  else if (key.endsWith('.bin')) return 'binary';
  else if (key.endsWith('.dmg')) return 'dmg';
  else if (key.endsWith('.iso')) return 'iso';
  else if (key.endsWith('.toast')) return 'toast';
  else if (key.endsWith('.vcd')) return 'virtual-CD';

  // DATA AND DATABASE
  else if (key.endsWith('.csv')) return 'csv';
  else if (key.endsWith('.dat')) return 'dat';
  else if (key.endsWith('.db') || key.endsWith('.dbf')) return 'database';
  else if (key.endsWith('.log')) return 'log';
  else if (key.endsWith('.mdb')) return 'mdb';
  else if (key.endsWith('.sav')) return 'save';
  else if (key.endsWith('.sql')) return 'sql';
  else if (key.endsWith('.tar')) return 'tarball';
  else if (key.endsWith('.xml')) return 'xml';

  // EXECUTABLE
  else if (key.endsWith('.apk')) return 'apk';
  else if (key.endsWith('.bat')) return 'bat';
  else if (key.endsWith('.bin')) return 'bin';
  else if (key.endsWith('.cgi') || key.endsWith('.pl')) return 'perl';
  else if (key.endsWith('.com')) return 'msdos-command';
  else if (key.endsWith('.exe')) return 'exe';
  else if (key.endsWith('.gadget')) return 'gadget';
  else if (key.endsWith('.jar')) return 'jar';
  else if (key.endsWith('.wsf')) return 'windows-script';

  // FONTS
  else if (key.endsWith('.fnt')) return 'windows-font';
  else if (key.endsWith('.fon')) return 'font';
  else if (key.endsWith('.otf')) return 'open-type-font';
  else if (key.endsWith('.ttf')) return 'true-type-font';

  // SYSTEM
  else if (key.endsWith('.bak')) return 'backup';
  else if (key.endsWith('.cab')) return 'cab';
  else if (key.endsWith('.cfg')) return 'configuration';
  else if (key.endsWith('.cpl')) return 'cpl';
  else if (key.endsWith('.cur')) return 'cur';
  else if (key.endsWith('.dll')) return 'dll';
  else if (key.endsWith('.dmp')) return 'dump';
  else if (key.endsWith('.drv')) return 'device-driver';
  else if (key.endsWith('.ini')) return 'ini';
  else if (key.endsWith('.lnk')) return 'lnk';
  else if (key.endsWith('.msi')) return 'windows-installer';
  else if (key.endsWith('.sys')) return 'sys';
  else if (key.endsWith('.tmp')) return 'tmp';

  else return faFile;
}
