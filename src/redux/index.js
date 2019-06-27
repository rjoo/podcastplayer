import { combineReducers, createStore } from 'redux';

const initialState = {
  episodeId: '',
  episodeTitle: '',
  mediaUrl: '',
  podcastTitle: '',
};

export const playPodcast = (episodeId, podcastTitle, episodeTitle, mediaUrl) => ({
  type: 'PLAY_PODCAST',
  podcast: { episodeId, podcastTitle, episodeTitle, mediaUrl }
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