import { combineReducers, createStore } from 'redux';

const initialState = {
  podcastTitle: '',
  episodeTitle: '',
  mediaUrl: ''
};

export const playPodcast = (podcastTitle, episodeTitle, mediaUrl) => ({
  type: 'PLAY_PODCAST',
  podcast: { podcastTitle, episodeTitle, mediaUrl }
});

export const podcast = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAY_PODCAST':
      return action.podcast;
    default:
      return state;
  }
};

export const store = createStore(combineReducers({ podcast }));