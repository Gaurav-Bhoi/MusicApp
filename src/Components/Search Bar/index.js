import React, {useEffect, useRef, useState} from 'react';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {Music_Controller} from '../../Controllers/Music Controller/musicController';

export default function SearchBar(props) {
  const songs = useSelector(state => state.musicReducer.allSongs);
  const searchIconBg = showSearchBar ? 'gray' : '#FDFDFF';
  const [showSearchBar, setShowSearchBar] = useState(false);
  const dispatcher = useDispatch();

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
          backgroundColor: showSearchBar ? 'white' : '#41C8C6',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          paddingHorizontal: 5,
          marginRight: 5,
        }}
        onPress={() => setShowSearchBar(!showSearchBar)}>
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
