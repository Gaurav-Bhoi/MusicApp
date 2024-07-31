import {NativeModules, PermissionsAndroid} from 'react-native';

export class BluetoothController {
  static connectBluetooth = (...args) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    )
      .then(result => {
        if (result == 'granted') {
          NativeModules.BluetoothManager.handleBluetoothConnectivity(
            'from react-native',
            (error, data) => {
              if (error) {
              } else {
              }
            },
          );
        } else {
          alert('please grant bluetooth services');
        }
      })
      .catch(error => alert('blueooth services are not available'));
  };
}
