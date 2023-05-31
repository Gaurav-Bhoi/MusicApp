import * as RNFS from 'react-native-fs';
import {saveMusic} from '../../Store/Reducers/musicReducer';

export class GetMusicFiles {
  static getMusicFiles = (...args) => {
    recurssiveFunc(RNFS.ExternalStorageDirectoryPath);

    function recurssiveFunc(path) {
      RNFS.readDir(path)
        .then(data => {
          data.forEach(ele => {
            if (RNFS.stat(ele.path)) {
              if (ele.isFile()) {
                if (ele.name.endsWith('.mp3')) {
                  ele = {...ele, status: false};
                  args[0](saveMusic(JSON.stringify(ele)));
                }
              } else if (ele.isDirectory()) {
                recurssiveFunc(ele.path);
              }
            }
          });
        })
        .catch(err => {});
    }
  };
}
