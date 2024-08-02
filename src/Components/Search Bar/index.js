import React, {useEffect, useRef} from 'react';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TextInput, TouchableOpacity, Animated} from 'react-native';
import styles from './style';
import {useSelector, useDispatch} from 'react-redux';
import {updateShowSearchBar} from '../../Store/Reducers/settingsReducer';
import {Music_Controller} from '../../Controllers/Music Controller/musicController';
import {findLastKey} from 'lodash';

export default function SearchBar(props) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const showSearchBar = useSelector(
    state => state.settingsReducer.showSearchBar,
  );

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: 200,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [showSearchBar]);

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
        <Animated.View
          style={{
            backgroundColor: 'red',
            width: animatedWidth,
            height: '100%',
          }}>
          {/* <TextInput
            autoFocus={true}
            placeholder="search music here..."
            underlineColorAndroid="transparent"
            style={[styles.textInputStyle, {backgroundColor: 'white'}]}
            onChangeText={text =>
              Music_Controller.handleMusicSearch(dispatcher, songs, text)
            }
          /> */}
        </Animated.View>
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
