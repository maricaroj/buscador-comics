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

//General Request
let offset = 0;
let total = 0;


const fetchData = () => {
    let url = `https://gateway.marvel.com/v1/public/comics?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
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
        .then(obj => printInfoComic(obj.data.results))
        .catch(err => console.error(err))
    comicId = id
    getCharacterComicId(comicId)
    return comicId
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
        .then(obj => printInfoCharater(obj.data.results))
        .catch(err => console.error(err))
    characterId = id
    getComicsCharacterId(characterId)
    return characterId
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
    let url2 = ''
    if (type === 'comics' && input != '') {
        url2 = `https://gateway.marvel.com/v1/public/${type}?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
        fetchData(url2)
    }
    if (type === 'comics' && input === '') {
        url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
        fetchData(url)
    }
    if (type === 'characters' && input != '') {
        const url3 = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
        fetchCharacters(url3)
    }
    if (type === 'characters' && input === '') {
        const url4 = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`
        fetchCharacters(url4)
    };

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





// Pagination
const firstBtn = document.getElementById('first-page-btn');
const previewsBtn = document.getElementById('previews-page-btn');
const nextBtn = document.getElementById('next-page-btn');
const lastBtn = document.getElementById('last-page-btn');
const pageNumber = document.getElementById('page-number');

pageNumber.innerHTML = 1

const pagination = (callback) => {
    console.log(callback);
    console.log(offset);
    firstBtn.onclick = () =>{
        enableBtn();
        offset = 0;
        disabledBtn();
        callback();
        pageNumber.innerHTML = 1
        return offset
    }
    previewsBtn.onclick = () => {
        enableBtn();
        offset -= 20;
        disabledBtn();
        callback();
        pageNumber.innerHTML = Math.floor(offset / 20) + 1
        return offset
    }
    nextBtn.onclick = () => {
        console.log(offset);
        enableBtn();
        offset += 20;
        disabledBtn();
        callback();
        pageNumber.innerHTML = Math.floor(offset / 20) + 1
        return offset
    }
    lastBtn.onclick = () => {
        enableBtn()
        // const isExact = total % 20 === 0
        // const pages = Math.floor(total / 20)
        // offset = (isExact ? pages - 1 : pages) * 20
        offset = total - (total % 20)
        disabledBtn();
        callback();
        pageNumber.innerHTML = Math.floor(offset / 20) + 1
        return offset
    }

}



// const firstPage = () => {
//     enableBtn();
//     offset = 0;
//     disabledBtn();
//     fetch(url);
//     pageNumber.innerHTML = 1
//     return offset
// };

// const previewsPage = () => {
//     enableBtn();
//     offset -= 20;
//     disabledBtn();
//     fetch(url);
//     pageNumber.innerHTML = Math.floor(offset / 20) + 1
//     return offset
// };

// const nextPage = () => {
//     enableBtn();
//     offset += 20;
//     disabledBtn();
//     fetch(url);
//     pageNumber.innerHTML = Math.floor(offset / 20) + 1
//     return offset
// };

// const lastPage = () => {
//     enableBtn()
//     offset = total - 20
//     disabledBtn();
//     fetch(url);
//     pageNumber.innerHTML = Math.floor(offset / 20) + 1
//     return offset
// }

const checkBtn = () => {
    offset <= 0 ? firstBtn.disabled = true : firstBtn.disabled = false;
    offset <= 0 ? previewsBtn.disabled = true : previewsBtn.disabled = false;

    offset === total - (total % 20) ? nextBtn.disabled = true : nextBtn.disabled = false;
    offset === total - (total % 20) ? lastBtn.disabled = true : lastBtn.disabled = false;
}
// const disabledBtn = () => {
//     if (offset === 0) {
//         firstBtn.disabled = true;
//         previewsBtn.disabled = true;
//     }
//     if (offset === total - 20) {
//         nextBtn.disabled = true;
//         lastBtn.disabled = true;
//     }
// };

// const enableBtn = () => {
//     if (firstBtn.disabled || previewsBtn.disabled) {
//         firstBtn.disabled = false;
//         previewsBtn.disabled = false;
//     }
//     if (nextBtn.disabled || lastBtn.disabled) {
//         nextBtn.disabled = false;
//         lastBtn.disabled = false;
//     }
// };


window.onload = () => {
    fetchData();
    disabledBtn();
    pagination(fetchData)
}



