const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const app = express();
const X2JS = require('x2js');
const sanitizeHtml = require('sanitize-html');

app.use(express.json());
app.use(cors());

app.post('/api/feed', cors(), (request, response) => {
  const feed = request.body.feed;
  if (!feed) {
    response.status(400).json({ error: 'No feed provided' });
    return;
  }

  const x2js = new X2JS();
  const protocol = feed.includes('https://') ? https : http;

  protocol.get(feed, (res) => {
    let data = '';
    res.setEncoding('utf8');

    res.on('data', (d) => data += d);
    res.on('end', () => {
      try {
        const parsed = formatOutput(x2js.xml2js(data));
        response.json(parsed);
      } catch(e) {
        response.status(500).json({ error: 'Error converting feed to json', log: e.message });
      }
    });
  }).on('error', (err) => {
    response.status(500).json({ error: 'Unable to retrieve feed', log: err.message });
  });
});

/**
 * Quick/dirty formatting of some discrepancies from XML
 * This is in no way comprehensive
 */
function formatOutput(data) {
  const output = {
    raw: data
  };

  const episodes = Array.isArray(data.rss.channel.item)
    ? data.rss.channel.item
    : [data.rss.channel.item];
  const img = data.rss.channel.image;
  const desc = data.rss.channel.description;

  output.title = data.rss.channel.title;
  output.episodes = episodes.map(formatEpisode);

  output.image = null;
  if (Array.isArray(img)) {
    output.image = img.find(i => i.hasOwnProperty('_href'))._href;
  } else if (img._href) {
    output.image = img._href;
  } else if (img.url) {
    output.image = img.url;
  }

  output.description = '';
  if (Array.isArray(desc)) {
    output.description = desc.find(d => typeof d === 'string');

    if (!output.description) {
      output.description = desc.find(d => d.hasOwnProperty('__text')) || { '__text': '' };
      output.description = output.description.__text;
    }
  } else if (typeof desc === 'string') {
    output.description = desc;
  }

  output.description = sanitizeHtml(output.description, { allowedTags: [] });

  return output;
}

function formatEpisode(ep, i) {
  const episode = {
    id: i,
    link: ep.link,
    media: ep.enclosure,
    pubDate: ep.pubDate,
    summary: '',
    title: ep.title,
  };

  // Find title
  if (Array.isArray(ep.title)) {
    episode.title = ep.title.find(t => typeof t === 'string');
  } else if (ep.title.hasOwnProperty('__text')) {
    episode.title = ep.title.__text;
  }

  // Find media URL
  if (ep.encoslure && ep.enclosure.hasOwnProperty('_url')) {
    episode.media = ep.enclosure._url;
  }

  // @todo
  // fix episode.link
  // add episode.summary

  return episode;
}

app.listen(8080, () => console.log('Listening on 8080'));
