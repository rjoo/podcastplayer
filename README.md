A basic podcast player that allows you to search for podcasts and play episodes. I built this primarily as an opportunity to learn and get a handle on React.

### Podcasts
To search for podcasts, it uses the simple ITunes Search API on the client side. To extract more information from each podcast and a list of episodes, there's a thin Express API server that exposes an endpoint that will fetch and convert the XML data to JSON from the respective RSS feeds.

```
node api/server.js
```

### Todo
* Test more podcasts RSS feeds and convert more needed data from them (episode summaries, media url, etc)
* Add an audio player
* Make it pretty (override Blueprint default styling)
* Optimize endpoint and make it more secure