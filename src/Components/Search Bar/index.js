import React from 'react';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {updateShowSearchBar} from '../../Store/Reducers/settingsReducer';
import {Music_Controller} from '../../Controllers/Music Controller/musicController';

export default function SearchBar(props) {
  const showSearchBar = useSelector(
    state => state.settingsReducer.showSearchBar,
  );

  const songs = useSelector(state => state.musicReducer.allSongs);

  const bgCol = showSearchBar ? 'white' : null;
  const searchIconBg = showSearchBar ? 'gray' : '#FDFDFF';
  const dispatcher = useDispatch();

  const onPressSearchIcon = () => {
    dispatcher(updateShowSearchBar());
  };

  const renderSearchTextInput = () => {
    if (showSearchBar) {
      return (
        <TextInput
          autoFocus={true}
          underlineColorAndroid="transparent"
          style={[styles.textInputStyle, {backgroundColor: 'white'}]}
          onChangeText={text =>
            Music_Controller.handleMusicSearch(dispatcher, songs, text)
          }
        />
      );
    } else {
      return <View style={styles.textInputStyle}></View>;
    }
  };

  return (
    <>
      <View style={styles.searchBarContainer}>
        {renderSearchTextInput()}
        <TouchableOpacity
          style={[styles.searchIcon, {backgroundColor: bgCol}]}
          onPress={onPressSearchIcon}>
          <AntDesign name="search1" size={20} color={searchIconBg} />
        </TouchableOpacity>
      </View>
    </>
  );
}
