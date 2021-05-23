//Key
const private ='dfe8cb22eeb11d19206ec91e1d9bae2f9db5f51b'

const public = '67067bc7995973198c01b6d156e12ab1'

const timestamp = Date.now();  //da miliseegundos de donde se hace la llamada

const hash = md5(timestamp + private + public);


const totalResult = document.getElementById('total-result');

//General Request

let offset = 0;
let total = 0;

const fetchData = () =>{
    const url = `https://gateway.marvel.com/v1/public/comics?limit=20&offset=20&ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
    .then(response => response.json())
    .then(obj => {
        printData(obj.data.results)
        console.log(obj.data.results);
        total = obj.data.total
        totalResult.innerHTML = total
    })
    .catch(response =>console.error(response))

    return total
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

// Pagination

const firstBtn = document.getElementById('first-page-btn');
const previewsBtn = document.getElementById('previews-page-btn');
const nextBtn = document.getElementById('next-page-btn');
const lastBtn = document.getElementById('last-page-btn');

const firstPage = () =>{
    enableBtn();
    offset = 0;
    disabledBtn();
    fetchData();
    return offset
};

const previewsPage = () =>{
    enableBtn();
    offset -= 20;
    disabledBtn();
    fetchData();
    return offset
};

const nextPage = () =>{
    enableBtn();
    offset += 20;
    disabledBtn();
    fetchData();
    return offset
};

const lastPage = () =>{
    enableBtn()
    offset = total - 20
    disabledBtn();
    fetchData();
    return offset
}

const disabledBtn = () =>{
    if(offset === 0 ){
        firstBtn.disabled = true;
        previewsBtn.disabled = true;
    }
    if(offset === total -20){
        nextBtn.disabled = true;
        lastBtn.disabled = true;
    }
};

const enableBtn = () =>{
    if(firstBtn.disabled || previewsBtn.disabled){
        firstBtn.disabled = false;
        previewsBtn.disabled = false;
    }
    if(nextBtn.disabled || lastBtn.disabled){
        nextBtn.disabled = false;
        lastBtn.disabled = false;
    }
};

disabledBtn();