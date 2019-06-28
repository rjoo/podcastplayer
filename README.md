A basic podcast player that allows you to search for podcasts and play episodes. I built this primarily as an opportunity to learn and get familiar with React.

[Demo](https://admiring-pasteur-5d6231.netlify.com/#/)

## Data
There are two endpoints that are made from Lambda functions in `src/lambda`.
* `/search` - A simple search with the ITunes Search API
* `/feed` - Grabs the RSS feed's XML and converts/formats it to JSON

## TODO
* Responsive layout
* Make it pretty
* Recently played list
* More comprehensive search function
* Optimize /feed endpoint