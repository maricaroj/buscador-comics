//Key
const private = 'dfe8cb22eeb11d19206ec91e1d9bae2f9db5f51b'
const public = '67067bc7995973198c01b6d156e12ab1'
const timestamp = Date.now();  //da miliseegundos de donde se hace la llamada
const hash = md5(timestamp + private + public);
const totalResult = document.getElementById('total-result');

//Print General view
const containerComics = document.getElementById('container-comics');
const mainContainer = document.getElementById('main-container');
const containerComicInfo = document.getElementById('container-comic-info');
const comicInfo = document.getElementById('comic-info');
const comicCharactersInfo = document.getElementById('comic-characters-info');
const comicCharactersResults = document.getElementById('comic-characters-results');
const containerCharacterInfo = document.getElementById('container-character-info');
const characterInfo = document.getElementById('character-info');
const characterComicsInfo = document.getElementById('character-comics-info');
const characterComicsResults = document.getElementById('character-comics-results');
const lightButton = document.getElementById('light-button');
const darkButton = document.getElementById('dark-button');

//Search-Nav
const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('search-type');
const searchOrder = document.getElementById('search-order');
const searchBtn = document.getElementById('search-btn');

// Pagination
const containerPagination = document.getElementById('container-pagination');
let pageNumber = 1


//General Request
let offset = 0;
let total;
let order = searchOrder.value;
let input = searchInput.value;

const fetchData = (input, order) => {
    let url;
    if(input !== ''){
        url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
    } else{
        url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
    }
    fetch(url)
        .then(response => response.json())
        .then(obj => {
            printData(obj.data.results)
            total = obj.data.total
            totalResult.innerHTML = total
        })
        .catch(err => console.error(err))
    return total
};


//Comics
let comicId = '';
const getId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => {
            printInfoComic(obj.data.results)
            total = obj.data.total;
        })
        .catch(err => console.error(err))
    comicId = id
    pageNumber = 1;
    getCharacterComicId(comicId)
    return [comicId, total]
};

const getCharacterComicId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => printCharactersComic(obj.data.results, comicCharactersResults, comicCharactersInfo))
        .catch(err => console.error(err))
};

//Characters
let characterId = '';
const getCharacterId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => {
            printInfoCharater(obj.data.results)
            total = obj.data.results[0].comics.available;
        })
        .catch(err => console.error(err))
    characterId = id
    pageNumber = 1;
    getComicsCharacterId(characterId)
    return [characterId, total]
};

const getComicsCharacterId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => printComicsCharacter(obj.data.results))
        .catch(err => console.error(err))
};


//Search-Nav

const fetchCharacters = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(obj => {
            printCharactersComic(obj.data.results, '', mainContainer)
            total = obj.data.total
            totalResult.innerHTML = total
        })
        .catch(err => console.error(err))
};

const searchURLUpdate = () => {
    const input = searchInput.value
    const type = searchType.value
    const order = searchOrder.value
    if (type === 'comics') {
        // url2 = `https://gateway.marvel.com/v1/public/${type}?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
        fetchData(input, order)
    }
    if (type === 'characters' && input != '') {
        const url3 = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
        fetchCharacters(url3)
    }
    if (type === 'characters' && input === '') {
        const url4 = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
        fetchCharacters(url4)
    };
    offset = 0;
    pageNumber = 1;

}

searchBtn.addEventListener('click', searchURLUpdate);
searchType.addEventListener('change', () => {
    const type = searchType.value
    if (type === 'comics') {
        searchOrder.innerHTML = `
        <option value='title'>A/Z</option>
        <option value='-title'>Z/A</option>
        <option value='-focDate'>Más nuevos</option>
        <option value='focDate'>Más viejos</option> 
        `
    }
    if (type === 'characters') {
        searchOrder.innerHTML = `
        <option value='name'>A/Z</option>
        <option value='-name'>Z/A</option>
        `
    }
})


// // Pagination

const firstPage = (func) => {
    offset = 0;
    func();
    pageNumber  = 1
    return offset
};

const previewsPage = (func) => {
    offset -= 20;
    func();
    pageNumber = Math.floor(offset / 20) + 1
    return offset
};

const nextPage = (func) => {
    offset += 20;
    func();
    pageNumber = Math.floor(offset / 20) + 1
    return offset
};

const lastPage = (func) => {
    const isExact = total % 20 === 0
    const pages = Math.floor(total / 20)
    offset = (isExact ? pages - 1 : pages) * 20
    offset = total - (total % 20)
    func();
    pageNumber  = Math.floor(offset / 20) + 1
    return offset
}


window.onload = () => {
    fetchData(input, order);
}