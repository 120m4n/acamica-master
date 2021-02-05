const elementos_pag = 15;
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
let carton = {};


document.addEventListener("DOMContentLoaded", function(event) {
    fetchData();
});

const fetchData = ()=> {
    try {
        
        // const temp_data = data.slice(0, elementos_pag); 

        var randomMembers = getRandomSubarray(cartas, 15);
        // console.log(randomMembers);
        pintarCards(randomMembers);
    }catch(e) {
        console.log(e);
    }
}

cards.addEventListener("click", function(event) {
    //se alcanzo el numero de elementos en el carrito del
    addJugada(event);    

})

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

const addJugada = event => {
   
    
    if (event.target.classList.contains('card-img-top')){

        // console.log(event.target.dataset)

        const isSelect = event.target.dataset.selected;
        //valida si ya se selecciono el articulo
        if (isSelect == 0){
            setJugada(event.target);
        }else{
            // elimina el articulo del carrito
            delete carton[event.target.dataset.id]
            // activa para que el articulo pueda ser seleccionado nuevamente
            actualizarObjeto(event.target, 0);
            // pintarCarrito(); 
        }

        console.log(carton);
        
    }
    event.stopPropagation();
}

const setJugada = objeto => {

    const jugada = {
        id: objeto.dataset.id,
        selected: 1,
    }

    carton[jugada.id] = {...jugada}
    //actualizar seleccion
    actualizarObjeto(objeto, 1);
    
}

const actualizarObjeto = function (objeto, opcion) {
    if (opcion === 1){
        objeto.style.opacity = "0.2";
        objeto.dataset.selected = opcion;
    }

    if (opcion === 0){
        objeto.style.opacity = "1";
        objeto.dataset.selected = opcion;
    }

}