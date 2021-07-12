//Key
const private = "dfe8cb22eeb11d19206ec91e1d9bae2f9db5f51b";
const public = "67067bc7995973198c01b6d156e12ab1";
const timestamp = Date.now(); //da miliseegundos de donde se hace la llamada
const hash = md5(timestamp + private + public);
const totalResult = document.getElementById("total-result");

//Print General view
const contanierSpinner = document.getElementById("container-spinner");
const contanierSpinner2 = document.getElementById("container-spinner-2");
const contanierSpinner3 = document.getElementById("container-spinner-3");
const containerComics = document.getElementById("container-comics");
const mainContainer = document.getElementById("main-container");
const containerComicInfo = document.getElementById("container-comic-info");
const comicInfo = document.getElementById("comic-info");
const comicCharactersInfo = document.getElementById("comic-characters-info");
const comicCharactersResults = document.getElementById("comic-characters-results");
const containerCharacterInfo = document.getElementById("container-character-info");
const characterInfo = document.getElementById("character-info");
const characterComicsInfo = document.getElementById("character-comics-info");
const characterComicsResults = document.getElementById("character-comics-results");
const lightButton = document.getElementById("light-button");
const darkButton = document.getElementById("dark-button");

//Search-Nav
const searchInput = document.getElementById("search-input");
const searchType = document.getElementById("search-type");
const searchOrder = document.getElementById("search-order");
const searchBtn = document.getElementById("search-btn");

// Pagination
const containerPagination = document.getElementById("container-pagination");
let pageNumber = 1;

//General Request
let offset = 0;
let total;
let input = searchInput.value;
let order = searchOrder.value;
let type = searchType.value;

// General search of comics and characters

const fetchData = (input, order) => {
  contanierSpinner.classList.remove('is-hidden');
  mainContainer.classList.add('is-hidden')
  total = undefined;
  let url;
  if (input !== "") {
    url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  } else {
    url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printData(obj.data.results);
      total = obj.data.total;
      totalResult.innerHTML = total;
      contanierSpinner.classList.add("is-hidden");
    })
    .catch((err) => console.error(err));
};

const fetchCharacters = (input, order) => {
  contanierSpinner.classList.remove('is-hidden');
  mainContainer.classList.add('is-hidden');
  total = undefined;

  let url;
  if (input !== "") {
    url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  } else {
    url = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printCharactersComic(obj.data.results, "", mainContainer);
      total = obj.data.total;
      totalResult.innerHTML = total;
      contanierSpinner.classList.add("is-hidden");

    })
    .catch((err) => console.error(err));
};

//Comics
let comicId = "";
const getId = (id) => {
  total = undefined;

  const url = `https://gateway.marvel.com/v1/public/comics/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printInfoComic(obj.data.results);
      total = obj.data.total;
    })
    .catch((err) => console.error(err));
  comicId = id;
  pageNumber = 1;
  getCharacterComicId(comicId);
  return comicId;
};

const getCharacterComicId = (id) => {
  contanierSpinner3.classList.remove("is-hidden");
  offset = 0;
  const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printCharactersComic(
        obj.data.results,
        comicCharactersResults,
        comicCharactersInfo
      );
      contanierSpinner3.classList.add("is-hidden");
    })
    .catch((err) => console.error(err));
};

//Characters
let characterId = "";
const getCharacterId = (id) => {
  total = undefined;

  const url = `https://gateway.marvel.com/v1/public/characters/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printInfoCharater(obj.data.results);
      total = obj.data.results[0].comics.available;
    })
    .catch((err) => console.error(err));
  characterId = id;
  pageNumber = 1;
  getComicsCharacterId(characterId);
  return characterId;
};

const getComicsCharacterId = (id) => {
  characterComicsInfo.classList.add("is-hidden");
  contanierSpinner2.classList.remove("is-hidden");
  const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${public}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((obj) => {
      printComicsCharacter(obj.data.results);
      contanierSpinner2.classList.add("is-hidden");
    })
    .catch((err) => console.error(err));
};

//Search-Nav
const searchURLUpdate = () => {
  containerComicInfo.classList.add("is-hidden");
  containerCharacterInfo.classList.add("is-hidden");
  containerComics.classList.remove("is-hidden");
  total = undefined;
  offset = 0;
  input = searchInput.value;
  type = searchType.value;
  order = searchOrder.value;

  if (type === "comics") {
    fetchData(input, order);
  }

  if (type === "characters") {
    fetchCharacters(input, order);
  }
  pageNumber = 1;
};

searchBtn.addEventListener("click", searchURLUpdate);

searchType.addEventListener("change", () => {
  const type = searchType.value;
  if (type === "comics") {
    searchOrder.innerHTML = `
        <option value='title'>A/Z</option>
        <option value='-title'>Z/A</option>
        <option value='-focDate'>Más nuevos</option>
        <option value='focDate'>Más viejos</option> 
        `;
  }
  if (type === "characters") {
    searchOrder.innerHTML = `
        <option value='name'>A/Z</option>
        <option value='-name'>Z/A</option>
        `;
  }
});

// // Pagination

const firstPage = (func) => {
  offset = 0;
  func();
  pageNumber = 1;
  return offset;
};

const previewsPage = (func) => {
  offset -= 20;
  func();
  pageNumber = Math.floor(offset / 20) + 1;
  return offset;
};

const nextPage = (func) => {
  offset += 20;
  func();
  pageNumber = Math.floor(offset / 20) + 1;
  return offset;
};

const lastPage = (func) => {
  const isExact = total % 20 === 0;
  const pages = Math.floor(total / 20);
  offset = (isExact ? pages - 1 : pages) * 20;
  offset = total - (total % 20);
  func();
  pageNumber = Math.floor(offset / 20) + 1;
  return offset;
};

// function loader(action) {
//     if (action === 'show') {
//         document.getElementById("loader").style.display = "";
//         document.getElementById("cover-spin").style.display = "";
//     } else {
//         document.getElementById("loader").style.display = "none";
//         document.getElementById("cover-spin").style.display = "none";
//     }
// }

window.onload = () => {
  fetchData(input, order);
};
