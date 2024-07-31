import React from 'react';
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Entypo';
import {setCurrentSong} from '../../Store/Reducers/musicReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useState} from 'react';
import {decode, encode} from 'base-64';
const jsmediatags = require('jsmediatags');

export default function SoundtrackCard(props) {
  const setSong = useDispatch();
  const [thumbnail, setThumbnail] = useState(null);
  const [format, setFormat] = useState(null);
  const {cardBackgroundColor} = useSelector(
    state => state.settingsReducer.useColor,
  );
  const currentMusic = useSelector(state => state.musicReducer.currentSong);
  const showExitModal = useSelector(state => state.settingsReducer.showExit);
  let icon;

  if (showExitModal) {
    var opacity = 0.2;
  } else {
    var opacity = 1;
  }

  if (
    currentMusic != '{}' &&
    props.item.name == JSON.parse(currentMusic).name
  ) {
    icon = JSON.parse(currentMusic).status
      ? {name: 'controller-paus', size: 25, marginRight: 17}
      : {name: 'controller-play', size: 35, marginRight: 10};
  } else {
    icon = props.item.status
      ? {name: 'controller-paus', size: 25, marginRight: 17}
      : {name: 'controller-play', size: 35, marginRight: 10};
  }

  useEffect(() => {
    new jsmediatags.Reader(props.item.path).read({
      // onSuccess: tag => {
      //   let tempThumb = '';
      //   tag.tags.picture.data.forEach(ele => {
      //     tempThumb += String.fromCharCode(ele);
      //   });
      //   tempThumb = base64.encode(tempThumb);
      //   setThumbnail(tempThumb);
      //   setFormat(tag.tags.picture.format);
      // },
      // onError: error => {
      //   ToastAndroid.show(
      //     `failed to get thumbnail for ${props.item.name}`,
      //     ToastAndroid.SHORT,
      //   );
      // },
    });
  });

  const renderThumbnail = () => {
    if (thumbnail) {
      return (
        <Image
          style={{
            width: 40,
            height: 40,
          }}
          source={{uri: `data:${format};base64,${thumbnail}`}}
        />
      );
    } else {
      return <FontAwesome5 name="record-vinyl" size={40} color="#41C8C6" />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.soundTrackContainer,
        {backgroundColor: cardBackgroundColor, opacity: opacity},
      ]}
      onPress={() => {
        props.handleMusicControl(props.item, (id = 'soundtrackCard_control'));
        props.navigation.navigate('play-music');
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.vinylRecordContainer}>{renderThumbnail()}</View>

        {props.children}
      </View>

      <TouchableOpacity
        style={[styles.musicController, {marginRight: icon.marginRight}]}
        onPress={() => {
          props.handleMusicControl(props.item, (id = 'play_pause_control'));
        }}>
        <Entypo name={icon.name} size={icon.size} color="#41C8C6" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
