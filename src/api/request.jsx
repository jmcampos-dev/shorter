export default async function getLink(link) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  // This is the API call to short.io
  const options = {
    method: 'POST', // The method is POST
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: API_KEY
    },
    body: JSON.stringify({domain: 'c0c1.short.gy', originalURL: link})
  };
  
  const response = await fetch('https://api.short.io/links', options)
    .then(response => response.json())
    .catch(err => console.error(err));
  return response;
}
