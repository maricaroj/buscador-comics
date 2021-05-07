//Key
const private ='dfe8cb22eeb11d19206ec91e1d9bae2f9db5f51b'

const public = '67067bc7995973198c01b6d156e12ab1'

const timestamp = Date.now();  //da miliseegundos de donde se hace la llamada

const hash = md5(timestamp + private + public);


//General Request
const fetchData = () =>{
const url = `http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${public}&hash=${hash}`
fetch(url)
 .then(response => response.json())
 .then(obj => printData(obj.data.results))
 .catch(response =>console.error(response))
}

fetchData();