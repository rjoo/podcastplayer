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
        setTimeout(() => response.json(parsed), 2000);
      } catch(e) {
        response.status(500).json({ error: 'Error converting feed to json', log: e.message });
      }
    });
  }).on('error', (err) => {
    response.status(500).json({ error: 'Unable to retrieve feed', log: err.message });
  });
});

/**
 * Quick/dirty formatting of some discrepancies
 * This is in no way comprehensive
 */
function formatOutput(data) {
  const output = {
    raw: data
  };

  output.title = data.rss.channel.title;
  output.episodes = data.rss.channel.item.map(ep => {
    const episode = {
      id: ep.guid,
      link: ep.link,
      media: '',
      pubDate: ep.pubDate,
      summary: '',
      title: ep.title,
    };

    // Find proper ID
    ['__text', '__cdata'].forEach(attr => {
      if (ep.guid.hasOwnProperty(attr))
        episode.id = ep.guid[attr];
    });

    if (Array.isArray(ep.title)) {
      episode.title = ep.title.find(t => typeof t === 'string');
    } else if (ep.title.hasOwnProperty('__text')) {
      episode.title = ep.title.__text;
    }

    // @todo
    // episode.link
    // episode.media
    // episode.summary

    return episode;
  });

  const img = data.rss.channel.image;

  output.image = null;
  if (Array.isArray(img)) {
    output.image = img.find(i => i.hasOwnProperty('_href'))._href;
  } else if (img._href) {
    output.image = img._href;
  } else if (img.url) {
    output.image = img.url;
  }

  const desc = data.rss.channel.description;

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

app.listen(8080, () => console.log('Listening on 8080'));
