import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  songs: [],
  allSongs: [],
  currentSong: '{}',
  songBundleData: '{}',
  currentPlayingMusic: '{}',
  playback_play_duration: 0.0,
  totalDuration: 0.0,
  playList: [],
  volume: 0,
};

const musicReducer = createSlice({
  name: 'musicrReducer',
  initialState: INITIAL_STATE,
  reducers: {
    saveMusic: (state, action) => {
      const {payload} = action;
      state.songs.push(payload);
      state.allSongs.push(payload);
      return state;
    },

    updateMusicList: (state, action) => {
      const {payload} = action;
      state.songs = payload;
      return state;
    },

    setCurrentSong: (state, action) => {
      const {payload} = action;
      state.currentSong = payload;
      return state;
    },

    setSongBundleData: (state, action) => {
      const {payload} = action;
      state.songBundleData = payload;
      return state;
    },

    currentPlayingMusic: (state, action) => {
      const {payload} = action;
      state.currentPlayingMusic = payload;
      return state;
    },

    setPlaybackPlayDuration: (state, action) => {
      const {payload} = action;
      state.playback_play_duration = payload;
      return state;
    },

    setPlaybackTotalDuration: (state, action) => {
      const {payload} = action;
      state.totalDuration = payload;
      return state;
    },

    setPlayList: (state, action) => {
      const {payload} = action;
      state.playList = payload;
      return state;
    },

    resetMusicList: state => {
      state.songs = [];
      return state;
    },
  },
});

export default musicReducer.reducer;
export const {
  saveMusic,
  updateMusicList,
  setCurrentSong,
  setSongBundleData,
  currentPlayingMusic,
  setPlaybackPlayDuration,
  setPlaybackTotalDuration,
  setPlayList,
  resetMusicList,
} = musicReducer.actions;
