import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  Modal,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import ExitScreen from '../../Components/Exit Screen/ExitScreen';
import {Bar} from 'react-native-progress';
import CommonScreen from '../../Components/Common Screen/screen';
import {useSelector, useDispatch} from 'react-redux';
import MarqueeText from 'react-native-marquee';
import SoundtrackCard from '../../Components/SoundTrack Card/soundtrackCard';
import {StorageController} from '../../Controllers/Permission Controller/StorageController';
import {styles} from './Styles';
import {Music_Controller} from '../../Controllers/Music Controller/musicController';
import {
  updateShowSettings,
  updateExitModal,
} from '../../Store/Reducers/settingsReducer';
import {setCurrentSong} from '../../Store/Reducers/musicReducer';
import Settings from '../../Components/Settings Screen/settings';
import SettingsComponent from '../../Components/Setting Component/settingComponent';
import Sound from 'react-native-sound';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {updateShowLoader} from '../../Store/Reducers/loaderReducer';
import {color} from 'react-native-reanimated';
import {Settings_Controller} from '../../Controllers/Seetings Controller/settingsController';

export default function Home(props) {
  const {width} = Dimensions.get('screen');
  const themeResolver = () => {
    if (isDarkModeOn) {
      return {
        icon: <Entypo name="moon" size={30} color="#41C8C6" />,
        name: 'Dark Mode',
      };
    }
    return {
      icon: <Entypo name="light-up" size={30} color="#41C8C6" />,
      name: 'Light Mode',
    };
  };
  const playModeResolver = () => {
    switch (playMode) {
      case 'single':
        return {
          icon: (
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: '#41C8C6',
              }}>
              1
            </Text>
          ),
          name: 'Single',
        };

      case 'shuffle':
        return {
          icon: (
            <Ionicons name="ios-shuffle-outline" size={30} color="#41C8C6" />
          ),
          name: 'Shuffle',
        };

      case 'loop':
        return {
          icon: <MaterialIcons name="loop" size={30} color="#41C8C6" />,
          name: 'Loop',
        };

      default:
    }
  };

  const outputAudioModeResolver = () => {
    switch (outputAudioMode) {
      case 'speaker':
        return {
          icon: <AntDesign name="sound" size={30} color="#41C8C6" />,
          name: 'Speaker',
        };
        break;

      case 'audio-bluetooth':
        return {
          icon: (
            <MaterialCommunityIcons
              name="music-note-bluetooth"
              size={30}
              color="#41C8C6"
            />
          ),
          name: 'Bluetooth',
        };
        break;

      case 'audio-jack':
        return {
          icon: (
            <MaterialCommunityIcons
              name="audio-input-stereo-minijack"
              size={30}
              color="#41C8C6"
            />
          ),
          name: 'Earphone',
        };
        break;
    }
  };

  const music = useSelector(state => state.musicReducer.songs);
  const currentMusic = useSelector(state => state.musicReducer.currentSong);
  const playMode = useSelector(state => state.settingsReducer.playMode);
  const outputAudioMode = useSelector(
    state => state.settingsReducer.outputAudioMode,
  );

  const playback_play_duration = useSelector(
    state => state.musicReducer.playback_play_duration,
  );
  let playPauseIcon = JSON.parse(currentMusic).status
    ? {name: 'controller-paus', size: 30, marginRight: 17}
    : {name: 'controller-play', size: 40, marginRight: 10};
  const isDarkModeOn = useSelector(state => state.settingsReducer.isDarkModeOn);
  const currentPlayingMusic = JSON.parse(
    useSelector(state => state.musicReducer.currentPlayingMusic),
  );
  const getMusicBundleData = useSelector(
    state => state.musicReducer.songBundleData,
  );
  const {textColor} = useSelector(state => state.settingsReducer.useColor);
  const setting = useSelector(state => state.settingsReducer);
  const animation = new Animated.Value(0);
  const setSongs = useDispatch();
  const settingData = [
    {
      icon: <Ionicons name="reload" size={30} color="#41C8C6" />,
      name: 'Refresh',
    },
    themeResolver(),
    {
      icon: <Ionicons name="ios-search-outline" size={30} color="#41C8C6" />,
      name: 'Search',
    },
    playModeResolver(),
    outputAudioModeResolver(),
    {
      icon: <Ionicons name="md-exit-outline" size={30} color="#41C8C6" />,
      name: 'Exit Music',
    },
  ];

  useEffect(() => {}, [outputAudioMode]);

  useEffect(() => {
    StorageController.access_storage(setSongs);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Settings_Controller.handleExitButton(setSongs);
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    Music_Controller.setPlayList(music, playMode, setSongs);
  }, [playMode]);

  const handleMusicControl = (item, id) => {
    let selectedMusic = Music_Controller.updateMusic(
      music,
      item,
      id,
      setSongs,
      getMusicBundleData,
      currentPlayingMusic,
    );
    Music_Controller.updateMusicListInState(selectedMusic, setSongs);
  };

  const renderSoundTracks = ({item}) => {
    const {name} = JSON.parse(item);

    return (
      <View>
        <SoundtrackCard
          navigation={props.navigation}
          item={JSON.parse(item)}
          handleMusicControl={handleMusicControl}
          handleShowSettings={handleShowSettings}>
          <MarqueeText
            style={[styles.songTitle, {color: textColor}]}
            speed={0.2}
            marqueeOnStart={true}
            loop={true}>
            {name}
          </MarqueeText>
        </SoundtrackCard>
      </View>
    );
  };

  const showSettings = () => {
    if (setting.showSettings) {
      Animated.spring(animation, {
        toValue: 5,
        duration: 1000,
        friction: 1,
        tension: 20,
        useNativeDriver: true,
      }).start(() => animation.setValue(0));
      return (
        <Settings animation={animation} navigation={props.navigation}>
          <FlatList
            data={settingData}
            renderItem={item => renderSettingComponent(item)}
            keyExtractor={(item, index) => index.toString()}
            style={styles.settingComponentFlatlist}
            contentContainerStyle={{
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            numColumns={3}
          />
        </Settings>
      );
    }
  };

  const renderSettingComponent = ({item}) => {
    return <SettingsComponent componentData={item} newProps={props} />;
  };

  const onPressSettingComponent = (...args) => {};

  const handleShowSettings = () => {};

  const SoundTrackFlatlist = () => {
    return (
      <FlatList
        data={music}
        renderItem={item => renderSoundTracks(item)}
        keyExtractor={index => index.toString()}
        style={styles.soundTrackFlatlist}
      />
    );
  };

  const showCurrentPlayback = () => {
    let jsonCurrentMusic = JSON.parse(currentMusic);
    if (currentMusic != '{}') {
      return (
        <TouchableOpacity
          style={styles.currentPlayback}
          onPress={() => props.navigation.navigate('play-music')}>
          <View>
            <Bar
              progress={playback_play_duration}
              width={width}
              color="black"
              borderWidth={0}
              borderRadius={0}
            />
          </View>

          <View style={styles.songData}>
            <View>
              <FontAwesome5 name="record-vinyl" size={40} color="black" />
            </View>

            <View style={{width: '77%'}}>
              <MarqueeText speed={0.2} marqueeOnStart={true} loop={true}>
                {JSON.parse(currentMusic).name}
              </MarqueeText>
            </View>

            <TouchableOpacity
              onPress={() => handlePlayPause()}
              style={{marginRight: playPauseIcon.marginRight}}>
              <Entypo
                name={playPauseIcon.name}
                size={playPauseIcon.size}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const handlePlayPause = () => {
    let temp = JSON.parse(currentMusic);
    temp.status = !temp.status;
    Music_Controller.currentMusicStatus(
      JSON.stringify(temp),
      setSongs,
      currentPlayingMusic,
    );
  };

  return (
    <SafeAreaView>
      <CommonScreen screenInfo={props}>
        {SoundTrackFlatlist()}
        {showCurrentPlayback()}
        {showSettings()}
        <ExitScreen />
      </CommonScreen>
    </SafeAreaView>
  );
}
