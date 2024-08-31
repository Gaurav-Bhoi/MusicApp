import React, {useEffect, useRef, useState} from 'react';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';
import {hideSettings} from '../../Store/Reducers/settingsReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {Music_Controller} from '../../Controllers/Music Controller/musicController';

export default function SearchBar(props) {
  const songs = useSelector(state => state.musicReducer.allSongs);
  const isDarkModeOn = useSelector(state => state.settingsReducer.isDarkModeOn);
  const isSettingModeOn = useSelector(
    state => state.settingsReducer.showSettings,
  );
  const searchIconBg = showSearchBar ? 'gray' : '#FDFDFF';
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatcher = useDispatch();
  const [isKeyboardOn, setIsKeyboardOn] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOn(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOn(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    dispatcher(hideSettings());
  }, [isKeyboardOn]);

  return (
    <View
      style={{
        height: 25,
        width: 180,
        flexDirection: 'row-reverse',
        marginRight: 50,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: showSearchBar
            ? 'white'
            : isDarkModeOn
            ? '#18122B'
            : '#41C8C6',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          paddingHorizontal: 5,
          marginRight: 5,
        }}
        onPress={() => {
          if (isSettingModeOn) {
            Settings_Controller.updateSettingsStatus(dispatcher);
          }
          setShowSearchBar(!showSearchBar);
        }}>
        <AntDesign
          name="search1"
          size={18}
          color={showSearchBar ? 'gray' : 'white'}
        />
      </TouchableOpacity>
      {showSearchBar && (
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}>
          <TextInput
            autoFocus={true}
            placeholder="search music here..."
            underlineColorAndroid="transparent"
            style={[styles.textInputStyle, {backgroundColor: 'white'}]}
            onChangeText={text =>
              Music_Controller.handleMusicSearch(dispatcher, songs, text)
            }
          />
        </View>
      )}
    </View>
  );
}
