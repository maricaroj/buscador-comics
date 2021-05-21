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
        printData(obj.data.results)
        totalResult.innerHTML = obj.data.total
    })
    .catch(response =>console.error(response))
};

fetchData();

//Comics
let comicId = '';
const getId = (id) =>{
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => printInfoComic(obj.data.results))
    .catch(err => console.error(err))
    comicId = id
    getCharacterComicId(comicId)
    return comicId
};

const getCharacterComicId = (id) =>{
    const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => printCharactersComic(obj.data.results))
    .catch(err => console.error(err))
};

//Characters
let characterId = '';
const getCharacterId = (id) =>{
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => printInfoCharater(obj.data.results))
    .catch(err => console.error(err))
    characterId = id
    getComicsCharacterId(characterId)
    return characterId
};

const getComicsCharacterId = (id) =>{
    const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => printComicsCharacter(obj.data.results))
    .catch(err => console.error(err))
};