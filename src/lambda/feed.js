import axios from 'axios';
import convert from 'xml-js';
import sanitizeHtml from 'sanitize-html';
import stringHash from 'string-hash';

function makeError(message, code = 500) {
  return {
    statusCode: 400,
    body: JSON.stringify({ message })
  };
}

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return makeError('Method not supported', 400);
  }

  const feed = JSON.parse(event.body).feed;

  if (!feed) {
    return makeError('No feed provided', 400);
  }

  try {
    const resp = await axios.get(feed);
    const data = resp.data;

    let json;
    let body;
    try {
      json = convert.xml2js(data, { compact: true, ignoreInstruction: true });
      body = JSON.stringify(formatOutput(json));
    } catch(e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: e.message, raw: json })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(formatOutput(json))
    };
  } catch (e) {
    return makeError(e.message);
  }
};

/**
 * Quick/dirty formatting of some discrepancies from XML
 * This is in no way comprehensive
 */
function formatOutput(data) {
  const channel = data.rss.channel;
  const output = {
    raw: channel
  };

  const episodes = Array.isArray(channel.item)
    ? channel.item
    : [channel.item];
  const desc = channel.description;

  output.title = channel.title._text;
  output.link = channel.link && channel.link._text;
  output.episodes = episodes.map(formatEpisode);

  if (channel['itunes:image'])
    output.image = channel['itunes:image']._attributes.href;
  else if (channel.image && channel.image.url)
    output.image = channel.image.url._text;

  output.description = '';
  if (desc._cdata) output.description = desc._cdata;
  if (desc._text) output.description = desc._text;
  output.description = sanitizeHtml(output.description, { allowedTags: [] });

  return output;
}

function formatEpisode(ep, i) {
  const episode = {
    id: '',
    link: ep.link && ep.link._text,
    media: ep.enclosure && ep.enclosure._attributes.url,
    pubDate: ep.pubDate._text,
    summary: '',
    title: '',
  };

  // Find title
  if (ep.title.hasOwnProperty('_text'))
    episode.title = ep.title._text;
  else if (ep.title.hasOwnProperty('_cdata'))
    episode.title = ep.title._cdata;
  else
    episode.title = '' + i;

  // Find media URL
  if (ep.enclosure && ep.enclosure.hasOwnProperty('_url')) {
    episode.media = ep.enclosure._url;
  }

  episode.id = stringHash(episode.title + i);

  // @todo
  // add episode.summary

  return episode;
}
