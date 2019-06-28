import axios from 'axios';

export async function handler(event, context) {
  const { query } = event.queryStringParameters;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No query provided' })
    };
  }

  try {
    const resp = await axios.get(`https://itunes.apple.com/search?term=${query}&entity=podcast`);
    const data = resp.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: e.message
      })
    };
  }
}
