import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import CommonScreen from '../../Components/Common Screen/screen';
import {styles} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Bar} from 'react-native-progress';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {VolumeManager} from 'react-native-volume-manager';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {Slider} from '@miblanchard/react-native-slider';
import {Music_Controller} from '../../Controllers/Music Controller/musicController';

export default function Play_Music(props) {
  const currentMusic = JSON.parse(
    useSelector(state => state.musicReducer.currentSong),
  );
  const currentPlayingMusic = JSON.parse(
    useSelector(state => state.musicReducer.currentPlayingMusic),
  );
  const playback_play_duration = useSelector(
    state => state.musicReducer.playback_play_duration,
  );
  const playbackTotalDuration = useSelector(
    state => state.musicReducer.totalDuration,
  );
  const dispatcher = useDispatch();

  let playPauseIcon = currentMusic.status
    ? {name: 'controller-paus', size: 25, marginRight: 17}
    : {name: 'controller-play', size: 35, marginRight: 10};

  const [opacity, setOpacity] = useState(new Animated.Value(1));
  const [volume, setVolume] = useState();

  useEffect(() => {
    summonSoundBar();
    vasnishSoundBar();
    getVolume();
    volumeListener();
  }, [volume]);

  const volumeListener = () => {
    const volumeListener = VolumeManager.addVolumeListener(res =>
      setVolume(res.volume),
    );
    return () => volumeListener.remove();
  };

  const getVolume = async () => {
    const volume = await VolumeManager.getVolume('music');
    setVolume(volume);
  };

  const vasnishSoundBar = () => {
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3000);
  };

  const summonSoundBar = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handlePlayPause = () => {
    currentMusic.status = !currentMusic.status;
    Music_Controller.currentMusicStatus(
      JSON.stringify(currentMusic),
      dispatcher,
      currentPlayingMusic,
    );
  };

  return (
    <CommonScreen screenInfo={props}>
      {/* Thumbnail and sounds */}
      <View style={styles.thubnailContainer}>
        {/* soundbar */}
        <Animated.View style={[styles.soundController, {opacity}]}>
          <Icon
            name="sound"
            size={30}
            color="#41C8C6"
            style={styles.iconStyle}
          />
          <Bar
            progress={volume}
            width={200}
            color="#41C8C6"
            style={styles.soundBar}
          />
        </Animated.View>

        <View style={styles.vinylRecordContainer}>
          <FontAwesome5 name="record-vinyl" size={200} color="#41C8C6" />
        </View>
        <Text style={styles.songTitle}>{currentMusic.name}</Text>
      </View>

      {/* controller */}
      <View style={styles.controlContainer}>
        {/* music progress bar */}
        <View style={styles.musicProgressBarContainer}>
          {/* timestamp */}
          <View style={styles.timeStamp}>
            <Text>
              {((playback_play_duration * playbackTotalDuration) / 60).toFixed(
                2,
              )}
            </Text>
            <Text>{(playbackTotalDuration / 60).toFixed(2)}</Text>
          </View>
          {/* <Bar progress={0.3} width={null} color="#41C8C6" style={styles.musicProgressBar} /> */}
          <Slider
            value={playback_play_duration}
            onValueChange={value =>
              Music_Controller.sliderController(value[0], dispatcher)
            }
          />
        </View>

        {/* controller buttons */}
        <View style={styles.musicControllerButtons}>
          <TouchableOpacity>
            <Ionicons name="ios-shuffle-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="stepbackward" size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePlayPause()}>
            <Entypo name={playPauseIcon.name} size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="stepforward" size={25} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons name="loop" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </CommonScreen>
  );
}
