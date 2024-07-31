import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {
  updateShowSettings,
  updateExitModal,
} from '../../Store/Reducers/settingsReducer';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';

export default function ExitScreen(props) {
  const showExitModal = useSelector(state => state.settingsReducer.showExit);
  const dispatcher = useDispatch();
  return (
    <Modal visible={showExitModal} transparent={true}>
      <View style={styles.mainWindow}>
        <View style={styles.card}>
          <View style={styles.contentContainer}>
            <Entypo name="emoji-sad" size={40} />
            <Text style={styles.exitTitle}>Exit App ?</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#FA524F'}]}
              onPress={() => Settings_Controller.handleExit(dispatcher)}>
              <Text>Exit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#0D9F60'}]}
              onPress={() => dispatcher(updateExitModal())}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
