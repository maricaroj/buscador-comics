//Print General view
const mainContainer = document.getElementById('main-container');

const printData = arr => {
    let box = '';
    arr.forEach(comic => {
        console.log(comic);
        const {title, thumbnail: {extension, path}} = comic;
        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
        box += `
        <div class="column is-one-fifth">
            <figure>
                <a>
                    <img class="height_img" src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                    <p class="has-text-centered">${title}</p>
                </a>
            </figure>
        </div>`  
    });
    mainContainer.innerHTML = box
}
