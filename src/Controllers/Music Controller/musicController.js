import {ToastAndroid} from 'react-native';
import Sound, {MAIN_BUNDLE} from 'react-native-sound';
import Storage_Services from '../../Services/asyncstorage';
import {MUSIC_BUNDLE_KEY} from '@env';
import {
  updateMusicList,
  setCurrentSong,
  setSongBundleData,
  currentPlayingMusic,
  setPlaybackPlayDuration,
  setPlaybackTotalDuration,
  saveMusic,
} from '../../Store/Reducers/musicReducer';
import {current} from '@reduxjs/toolkit';
const _ = require('lodash');

export class Music_Controller {
  MUSIC_BUNDLE = undefined;
  INTERVAL = undefined;
  currentDuration = undefined;

  static updateMusic = (...args) => {
    let musicList = args[0];
    let selectedMusic = args[1];
    let controllerType = args[2];
    let dispatcher = args[3];
    let musicBundle = args[4];
    let PlayingMusic = args[5];

    let updatedMusicList = musicList.map(ele => {
      ele = JSON.parse(ele);
      if (ele.name == selectedMusic.name) {
        switch (controllerType) {
          case 'soundtrackCard_control':
            ele.status = true;
            break;

          case 'play_pause_control':
            ele.status = !ele.status;
            break;

          default:
            alert('invalid music controller');
        }

        this.currentMusicStatus(JSON.stringify(ele), dispatcher, PlayingMusic);
      } else {
        ele.status = false;
      }
      return JSON.stringify(ele);
    });

    return updatedMusicList;
  };

  static updateMusicListInState = (...args) => {
    let updatedMusicList = args[0];
    let dispatcher = args[1];
    dispatcher(updateMusicList(updatedMusicList));
  };

  static currentMusicStatus = (...args) => {
    let selectedMusic = args[0];
    let dispatcher = args[1];
    let PlayingMusic = args[2];

    dispatcher(setCurrentSong(selectedMusic, dispatcher));
    this.controlMusic(selectedMusic, dispatcher, PlayingMusic);
  };

  static controlMusic = async (...args) => {
    let selectedMusic = JSON.parse(args[0]);
    let dispatcher = args[1];
    let PlayingMusic = args[2];

    if (this.MUSIC_BUNDLE == undefined) {
      this.playMusic(selectedMusic, dispatcher);
    } else {
      if (PlayingMusic != '{}') {
        if (PlayingMusic.name == selectedMusic.name) {
          if (!selectedMusic.status) {
            this.MUSIC_BUNDLE.pause();
          } else {
            this.MUSIC_BUNDLE.play();
          }
        } else {
          this.MUSIC_BUNDLE.stop(() =>
            this.playMusic(selectedMusic, dispatcher),
          );
        }
      }
    }
  };

  static playMusic = (...args) => {
    let selectedMusic = args[0];
    let dispatcher = args[1];

    this.MUSIC_BUNDLE = new Sound(
      selectedMusic.path,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          alert('error playing playback');
          return;
        }
        dispatcher(currentPlayingMusic(JSON.stringify(selectedMusic)));

        let totalDuration = this.MUSIC_BUNDLE.getDuration();
        dispatcher(setPlaybackTotalDuration(totalDuration));
        this.resetDuration(dispatcher);
        this.MUSIC_BUNDLE.play(success => {
          if (success) {
            this.resetDuration(dispatcher);
            dispatcher(setPlaybackPlayDuration(1));
            this.MUSIC_BUNDLE.release();
          }
        });
      },
    );
  };

  static controlVolume = (...args) => {
    // control the volume of the playback
    return null;
  };

  static getCurrentDuration = (...args) => {
    const dispatcher = args[0];
    const totalDuration = this.MUSIC_BUNDLE.getDuration();

    this.INTERVAL = setInterval(() => {
      this.MUSIC_BUNDLE.getCurrentTime(currentDuration => {
        const calculatedDuration = currentDuration / totalDuration;
        if (calculatedDuration > 0.99) {
          clearInterval(this.INTERVAL);
        } else {
          currentDuration = calculatedDuration;
          dispatcher(setPlaybackPlayDuration(calculatedDuration));
        }
      });
    }, 200);
  };

  static resetDuration = (...args) => {
    const dispatcher = args[0];
    clearInterval(this.INTERVAL);
    this.INTERVAL = undefined;
    dispatcher(setPlaybackPlayDuration(0.0));
    this.getCurrentDuration(dispatcher);
  };

  static sliderController = (...args) => {
    const value = args[0];
    const dispatcher = args[1];
    const totaltime = this.MUSIC_BUNDLE.getDuration();
    const newTime = totaltime * value;
    this.MUSIC_BUNDLE.setCurrentTime(newTime);
  };

  static setPlayList = (...args) => {
    const music = args[0];
    const playmode = args[1];
    const dispatcher = args[2];
    let newPlayList = [];

    switch (playmode) {
      case 'loop':
        music.map(ele => {
          ele = JSON.parse(ele);
          this.playMusic(ele, dispatcher);
        });
        break;

      default:
    }
  };

  static handleMusicSearch = (...args) => {
    const dispatcher = args[0];
    const songs = args[1];
    const searchText = args[2];

    const result = _.filter(songs, ele => {
      ele = JSON.parse(ele);
      if (ele.name.includes(searchText)) {
        return ele;
      }
    });

    const stringifyResult = JSON.stringify(result);
    dispatcher(updateMusicList(result));
  };
}
