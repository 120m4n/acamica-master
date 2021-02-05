let btnApiGithub = document.getElementById("apiGithub");
let username = document.getElementById("username");
let querySearch = document.getElementById("giphySearch");
let btnapiGiphy = document.getElementById("apiGiphy");
let btnapiGiphySearch = document.getElementById("apiGiphySearch");
//necesario para dibujar los gifs
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

//add listeners to

btnapiGiphy.addEventListener("click", () =>{
    getGiphyData()
})

btnapiGiphySearch.addEventListener("click", () =>{
    getGiphyDataBySearch()
})

const getGiphyDataBySearch = () => {
    const query = querySearch.value;
    const url_api = getURLSearch(query, 15,'r',0)
    console.log(url_api);
    const req = fetch(url_api);

    req
    .then(response => response.json())
    .then(json => addTenGif(json.data));
}

const getGiphyData = () =>{
    
    const url_api = getURL(10,'r')
    console.log(url_api);
    const req = fetch(url_api);

    req
    .then(response => response.json())
    .then(json => addTenGif(json.data));
}


const addTenGif = (arr) => { 
    // console.log(arr)
    items.innerHTML = '';
    arr.forEach(element => {
    //     // addImgToBody(element.images.fixed_height_small.url)
        const src = element.images.fixed_height_small.url;
        const title = element.title;
        const rating = element.rating;
        // console.log(title);
        templateCard.querySelector('img').setAttribute('src', src);
        templateCard.querySelector('img').setAttribute('alt', title);
        templateCard.querySelector('h5').innerHTML = `rating: ${rating}`;
        templateCard.querySelector('p').innerHTML =`${title}`;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    items.appendChild(fragment);
}

function addImgToBody(url_img){ 
    const img = document.createElement("img");
    img.src = url_img;
    // img.style.height ="200px";
    document.querySelector("body").appendChild(img);
}

/////tset
async function fetchData(username){
    const url_api = `https://api.github.com/users/${username}`;

    const response = await fetch(url_api);
    const gifs = await response.json();

    if (response.status !== 200 && response.status !== undefined)
        throw Error('El usuario no existe');

    return gifs.name;


}



(async () => {
    try {
        const nombre = await fetchData('rickitan')
        console.log(nombre);
    } catch (error) {
        console.error(error);
    }
})()


