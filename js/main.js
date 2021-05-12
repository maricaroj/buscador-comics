//Print General view
const containerComics = document.getElementById('container-comics');
const mainContainer = document.getElementById('main-container');
const containerComicInfo = document.getElementById('container-comic-info');
const comicInfo = document.getElementById('comic-info');


const printData = arr => {
    let box = '';
    arr.forEach(comic => {
        // console.log(comic);
        const {title, thumbnail: {extension, path}, id} = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        box += `
        <div class="column is-one-fifth" onclick="getId(${id})">
            <figure>
                <a>
                    <img class="height_img" src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                    <p class="has-text-centered">${title}</p>
                </a>
            </figure>
        </div>`  
    });
    mainContainer.innerHTML = box
};

const printInfoComic = arr => {
    containerComics.classList.add('is-hidden');
    containerComicInfo.classList.remove('is-hidden');
    let box = '';
    arr.forEach(comic => {
        const {title, thumbnail: {extension, path}, creators, description, dates} = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        const releaseDate = new Intl.DateTimeFormat('es-AR').format(new Date(dates?.find(el => el.type === 'onsaleDate').date))
        const writer = creators?.items?.filter(el => el.role === 'writer').map((creator) => creator.name)
        .join(', ')
        box += `
        <div class="columns">
        <div class="column is-one-quarter">
            <figure class="img-detalle">
            <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}" class="img-comic-info">
            </figure>
        </div>
        <div class="column is-size-5 px-6 py-4">
            <h3 class="title">${title}</h3>
            <h4 class="subtitle has-text-weight-bold m-0 mb-2">Publicado:</h4>
            <p>${releaseDate}</p>
            <h4 class="subtitle has-text-weight-bold m-0 mt-3 mb-2">Guionistas:</h4>
            <p>${writer ? writer : 'Sin información'}</p>
            <h4 class="subtitle has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h4>
            <p class="has-text-justified pr-6">${description ? description : 'Sin información'}</p>
        </div>
        </div> `
  });
  comicInfo.innerHTML = box

}
