const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');
const app = express();
const X2JS = require('x2js');

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
        const parsed = x2js.xml2js(data);
        setTimeout(() => response.json(parsed), 5000);
      } catch(e) {
        response.status(500).json({ error: 'Error converting feed to json', log: e.message });
      }
    });
  }).on('error', (err) => {
    response.status(500).json({ error: 'Unable to retrieve feed', log: err.message });
  });
});

app.listen(8080, () => console.log('Listening on 8080'));
