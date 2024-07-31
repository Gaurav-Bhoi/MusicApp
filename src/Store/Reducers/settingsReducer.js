import {createSlice} from '@reduxjs/toolkit';
import {Animated} from 'react-native';

const INITIAL_STATE = {
  showSettings: false,
  showExit: false,
  isDarkModeOn: false,
  playMode: 'single',
  useColor: {
    headerColor: '#41C8C6',
    screenBackground: '#D7DDE9',
    textColor: 'black',
    cardBackgroundColor: 'white',
  },
  showSearchBar: false,
  outputAudioMode: 'speaker',
};

const settingsReducer = createSlice({
  name: 'settingsReducer',
  initialState: INITIAL_STATE,
  reducers: {
    updateShowSettings: state => {
      state.showSettings = !state.showSettings;
      return state;
    },

    updateExitModal: state => {
      state.showExit = !state.showExit;
      return state;
    },

    enableDarkMode: state => {
      if (state.isDarkModeOn) {
        state.isDarkModeOn = false;
        state.useColor.headerColor = '#41C8C6';
        state.useColor.screenBackground = '#D7DDE9';
        state.useColor.cardBackgroundColor = 'white';
        state.useColor.textColor = 'black';
      } else {
        state.isDarkModeOn = true;
        state.useColor.headerColor = '#18122B';
        state.useColor.screenBackground = '#251e3b';
        state.useColor.cardBackgroundColor = '#393053';
        state.useColor.textColor = '#D4D4D4';
      }
      return state;
    },

    setPlayMode: state => {
      switch (state.playMode) {
        case 'single':
          state.playMode = 'loop';
          return state;

        case 'loop':
          state.playMode = 'shuffle';
          return state;

        case 'shuffle':
          state.playMode = 'single';
          return state;

        default:
          state.playMode = 'single';
          return state;
      }
    },

    setAudioOutputMode: state => {
      switch (state.outputAudioMode) {
        case 'speaker':
          state.outputAudioMode = 'audio-bluetooth';
          break;

        case 'audio-bluetooth':
          state.outputAudioMode = 'audio-jack';
          break;

        case 'audio-jack':
          state.outputAudioMode = 'speaker';
          break;
        default:
      }

      return state;
    },

    updateShowSearchBar: state => {
      state.showSearchBar = !state.showSearchBar;
      return state;
    },
  },
});

export default settingsReducer.reducer;
export const {
  updateShowSettings,
  updateExitModal,
  enableDarkMode,
  setPlayMode,
  setAudioOutputMode,
  updateShowSearchBar,
} = settingsReducer.actions;
