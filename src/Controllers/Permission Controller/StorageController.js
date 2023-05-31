import { PermissionsAndroid } from "react-native"
import { GetMusicFiles } from "../Music Controller/getMusicFiles"

export class StorageController {
  static access_storage = (...args) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then(result => result == "granted" ? GetMusicFiles.getMusicFiles(args[0]) : alert("please grant storage permission"))
      .catch(error => alert(error))
  }
}