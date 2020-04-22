import { storageRef } from './constants/firebase';
import { fileName } from './Mapper';
import { styledLog, startCounter, endCounter } from './Utilities';

export const fetchFiles = path => {
  startCounter();
  console.log('');
  styledLog(Log.REQUEST + 'Fetching Files from ' + path + ' ...');

  const listRef = storageRef.child(path);

  return listRef.listAll().then(res => {
    res.prefixes.forEach(folderRef => {
      this.setState(state => {
        state.files.push({
          key: folderRef.location.path + "/",
          metadata: {
            _isFile: false,
            name: fileName(folderRef.location.path + "/"),
          }
        });
        return state;
      });
    });
    styledLog(Log.SUCCESS + 'Fetch with no metadata complete' + endCounter());
    if (this.state.files.length === 0) styledLog(Log.INFO + 'No folders found');

    res.items.forEach(itemRef => {
      this.fetchFilesMetadata(itemRef).then(item => {
        this.setState(state => {
          state.files.push(item);
          return state;
        })
      });
    });
    this.setState(state => {
      state._isFetch = true;
      return state;
    });
  }).catch(function(error) {
    console.log(error);
    return false;
  });
}
