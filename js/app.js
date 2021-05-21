//Key
const private ='dfe8cb22eeb11d19206ec91e1d9bae2f9db5f51b'

const public = '67067bc7995973198c01b6d156e12ab1'

const timestamp = Date.now();  //da miliseegundos de donde se hace la llamada

const hash = md5(timestamp + private + public);


const totalResult = document.getElementById('total-result');

//General Request
const fetchData = () =>{
    const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => {
        console.log(obj);
        printData(obj.data.results)
        totalResult.innerHTML = obj.data.total
    })
    .catch(response =>console.error(response))
};

fetchData();

let comicId = '';
const getId = (id) =>{
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => printInfoComic(obj.data.results))
    comicId = id
    getComicIdCharacter(comicId)
    return comicId
};

const getComicIdCharacter = (id) =>{
    const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => printCharactersComic(obj.data.results))
};

