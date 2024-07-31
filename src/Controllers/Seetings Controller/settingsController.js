import {BackHandler, NativeModules, ToastAndroid} from 'react-native';
import {resetMusicList} from '../../Store/Reducers/musicReducer';

import {
  updateShowSettings,
  setPlayMode,
  updateExitModal,
  updateShowSearchBar,
} from '../../Store/Reducers/settingsReducer';
import {BluetoothController} from '../Permission Controller/BluetoothController';
import {StorageController} from '../Permission Controller/StorageController';

export class Settings_Controller {
  static updateSettingsStatus = (...args) => {
    args[0](updateShowSettings());
  };

  static handleExitButton = (...args) => {
    const dispatcher = args[0];
    dispatcher(updateExitModal());
  };

  static handleExit = (...args) => {
    const dispatcher = args[0];
    dispatcher(updateExitModal());
    BackHandler.exitApp();
  };

  static handleBluetoothConnectivity = (...args) => {
    const componentData = args[0];
    NativeModules.BluetoothManager.handleBluetoothConnectivity(
      componentData.name,
      (error, data) => {},
    );
  };

  static handlePlayMode = (...args) => {
    const dispatcher = args[0];
    dispatcher(setPlayMode());
  };

  static handleRefresh = (...args) => {
    const dispatcher = args[0];
    dispatcher(resetMusicList());
    StorageController.access_storage(dispatcher);
  };

  static updateShowSearchBar = (...args) => {
    let dispatcher = args[0];
    dispatcher(updateShowSearchBar());
  };
}
