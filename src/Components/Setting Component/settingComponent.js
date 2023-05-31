import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateShowSettings,
  enableDarkMode,
  setAudioOutputMode,
  updateExitModal,
  setPlayMode,
} from '../../Store/Reducers/settingsReducer';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './styles';
import {FadeIn} from 'react-native-reanimated';

export default function SettingsComponent(props) {
  const showExitModal = useSelector(state => state.settingsReducer.showExit);
  const {cardBackgroundColor, textColor} = useSelector(
    state => state.settingsReducer.useColor,
  );
  const dispatcher = useDispatch();

  const onPressSettingComponent = () => {
    switch (props.componentData.name) {
      case 'Exit Music':
        dispatcher(updateShowSettings());
        Settings_Controller.handleExitButton(dispatcher);
        break;

      case 'Dark Mode':
      case 'Light Mode':
        dispatcher(enableDarkMode());
        break;

      case 'Speaker':
      case 'Bluetooth':
      case 'Earphone':
        dispatcher(setAudioOutputMode());
        Settings_Controller.handleBluetoothConnectivity(props.componentData);
        break;

      case 'Single':
      case 'Shuffle':
        ToastAndroid.show(
          'This functionality is not available yet ! ',
          ToastAndroid.SHORT,
        );
        dispatcher(setPlayMode());
        break;

      case 'Loop':
        Settings_Controller.handlePlayMode(dispatcher);
        // ToastAndroid.show(
        //   'This functionality is not available yet',
        //   ToastAndroid.SHORT,
        // );
        break;

      case 'Search':
        Settings_Controller.updateSettingsStatus(dispatcher);
        Settings_Controller.updateShowSearchBar(dispatcher);
        break;

      case 'Refresh':
        Settings_Controller.handleRefresh(dispatcher);
        break;

      case 'Video':
        props.newProps.navigation.navigate('play-video');
        break;
      default:
    }
  };

  return (
    <TouchableOpacity
      style={[styles.settingsComponent, {backgroundColor: cardBackgroundColor}]}
      onPress={onPressSettingComponent}>
      <View>{props.componentData.icon}</View>
      <Text style={[styles.settingTitleStyle, {color: textColor}]}>
        {props.componentData.name}
      </Text>
    </TouchableOpacity>
  );
}
