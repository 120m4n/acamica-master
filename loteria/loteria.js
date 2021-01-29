const elementos_pag = 15;
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", function(event) {
    fetchData();
});

const fetchData = ()=> {
    try {
        
        // const temp_data = data.slice(0, elementos_pag); 

        var randomMembers = getRandomSubarray(cartas, 15);
        console.log(randomMembers);
        pintarCards(randomMembers);
    }catch(e) {
        console.log(e);
    }
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

const pintarCards = data =>{
    data.forEach( producto => {
        templateCard.querySelector('img').setAttribute('src', producto.src);
        templateCard.querySelector('img').setAttribute('alt', producto.id);
        templateCard.querySelector('img').dataset.id = producto.id;
        templateCard.querySelector('img').dataset.selected = 0;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    cards.appendChild(fragment);
}