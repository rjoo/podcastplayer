import { combineReducers, createStore } from 'redux';

// const initialState = {
//   episodeId: 123,
//   episodeTitle: 'Test',
//   mediaUrl: '/test.mp3',
//   podcastId: 234,
//   podcastTitle: 'Test',
// };

const initialState = {
  episodeId: null,
  episodeTitle: '',
  mediaUrl: '',
  podcastId: null,
  podcastTitle: '',
};

export const playPodcast = (episodeId, episodeTitle, mediaUrl, podcastId, podcastTitle) => ({
  type: 'PLAY_PODCAST',
  podcast: { episodeId, episodeTitle, mediaUrl, podcastId, podcastTitle }
});

export const stopPodcast = () => ({
  type: 'STOP_PODCAST'
});

export const podcast = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAY_PODCAST':
      return action.podcast;
    case 'STOP_PODCAST':
      return initialState;
    default:
      return state;
  }
};

export const store = createStore(combineReducers({ podcast }));
