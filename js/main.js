

lightButton.addEventListener('click', ()=>{
    lightButton.classList.add('is-hidden');
    darkButton.classList.remove('is-hidden');
    document.body.classList.add('theme--dark');
});
darkButton.addEventListener('click', ()=>{
    lightButton.classList.remove('is-hidden');
    darkButton.classList.add('is-hidden');
    document.body.classList.remove('theme--dark');
});

const printData = arr => {
    let box = '';
    arr.forEach(comic => {
        const {title, thumbnail: {extension, path}, id} = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        box += `
        <div class="column is-one-fifth" onclick="getId(${id});pagination(getId)">
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
    containerCharacterInfo.classList.add('is-hidden');
    containerComicInfo.classList.remove('is-hidden');
    
    let box = '';
    arr.forEach(comic => {
        const {title, thumbnail: {extension, path}, creators, description, dates, characters: {items}} = comic;
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
            <div class="column is-size-5 px-6 py-4 label-select">
                <h3 class="title title-color">${title}</h3>
                <h4 class="has-text-weight-bold m-0 mb-2">Publicado:</h4>
                <p>${releaseDate}</p>
                <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Guionistas:</h4>
                <p>${writer ? writer : 'Sin información'}</p>
                <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h4>
                <p class="has-text-justified pr-6">${description ? description : 'Sin información'}</p>
            </div>
        </div>`
  });
  comicInfo.innerHTML = box
};


const printCharactersComic = (arr, containerText, container) => {
    if(arr.length === 0){
        containerText.innerHTML = `
            <h3 class="title mb-2 title-color">Personajes</h3>
            <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>
            <p class="subtitle has-text-weight-bold mt-6 title-color">No se han encontrado resultados</p>`
    }
    let box = '';
    arr.forEach(character => {
        const {name, thumbnail: {extension, path}, id} = character;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
       
        containerText.innerHTML = `
                <h3 class="title mb-2 title-color">Personajes</h3>
                <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>`
        box += `<div class="column is-one-fifth" onclick="getCharacterId(${id}); pagination(getCharacterId)">
                    <div class="card-character" data-title="Character" >
                        <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}" class="img-comic-character">
                        <span class="red"></span>
                        <p class="name is-size-5 has-text-weight-bold has-text-centered mt-1 p-3">${name}</p>
                    </div>
                </div> `
    });
  container.innerHTML = box
};
    
const printInfoCharater = (arr) =>{
    containerComics.classList.add('is-hidden');
    containerComicInfo.classList.add('is-hidden');
    containerCharacterInfo.classList.remove('is-hidden');
    let box = '';
    arr.forEach(character => {
        const {name, thumbnail: {extension, path}, description} = character;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        box += `
        <div class="columns">
            <div class="column is-one-quarter">
                <figure class="img-detalle">
                <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}" class="img-comic-info">
                </figure>
            </div>
            <div class="column is-size-5 px-6 py-4 label-select">
                <h3 class="title title-color">${name}</h3>
                <h4 class="has-text-weight-bold m-0 mt-3 mb-2">Descripción:</h4>
                <p class="has-text-justified pr-6">${description ? description : 'Sin información'}</p>
            </div>
        </div>`
    })
    characterInfo.innerHTML = box;

    if(arr[0].comics.available == 0){
        characterComicsResults.innerHTML = `
            <h3 class="title mb-2 title-color">Comics</h3>
            <p class="is-size-6 has-text-weight-bold mt-0 label-select">${arr[0].comics.available} Resultado(s)</p>
            <p class="subtitle has-text-weight-bold mt-6 title-color">No se han encontrado resultados</p>`
    } else{
        characterComicsResults.innerHTML = `
        <h3 class="title mb-2 title-color">Comics</h3>
        <p class="is-size-6 has-text-weight-bold mt-0 label-select">${arr[0].comics.available} Resultado(s)</p>`
    }
};
        
const printComicsCharacter = arr => {
    let box = '';
    arr.forEach(comic => {
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
    })

  characterComicsInfo.innerHTML = box
};
