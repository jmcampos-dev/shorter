const API_KEY = process.env.REACT_APP_API_KEY;
export default async function getLink(link) {
const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
	},
  mode: 'cors',
	body: new URLSearchParams({
		url: link
	})
};
  
  const response = await fetch(url, options)
    .then(response => response.json())
    .catch(err => console.error(err));
  console.log(response);
  return response.result_url;
}
