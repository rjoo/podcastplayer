A basic podcast player that allows you to search for podcasts and play episodes. I built this primarily as an opportunity to learn and get a handle on React.

### Podcasts
To search for podcasts, it uses the simple ITunes Search API on the client side. To extract more information from each podcast and a list of episodes, there's a serverless Lambda function that grabs the RSS feed XML and converts it to JSON.

### Todo
* Make it pretty
* Recently played list
* More comprehensive search function
* Optimize endpoint and make it more secure