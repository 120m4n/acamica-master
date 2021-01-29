const elementos_pag = 19;
const max_elementos = 5;
const paginas = Math.ceil(data.length / elementos_pag);
const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;

const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", function(event) {
    fetchData();
});

const fetchData = ()=> {
    try {
        
        const temp_data = data.slice(0, elementos_pag); 
        pintarCards(temp_data);
    }catch(e) {
        console.log(e);
    }
}

cards.addEventListener("click", function(event) {
    //se alcanzo el numero de elementos en el carrito del
    addCarrito(event);    

})

///https://stackoverflow.com/questions/45232637/how-to-calculate-the-number-of-items-per-page-and-their-index-using-javascript
function getItemsPerPage(totalItemsCount, numberOfItemsPerPage, page) {
    let pagesCount = (totalItemsCount - 1) / numberOfItemsPerPage + 1;
    let start = (page - 1) * numberOfItemsPerPage + 1;
    let end = Math.min(start + numberOfItemsPerPage - 1, totalItemsCount);
    const pages = {
        id          : page,
        start_page  : start,
        end_page    : end
    }
  
    return pages;
  }

const pintarCards = data =>{
    data.forEach( producto => {
        templateCard.querySelector('img').setAttribute('src', producto.src);
        templateCard.querySelector('img').setAttribute('alt', producto.id);
        templateCard.querySelector('img').dataset.id = producto.id;
        templateCard.querySelector('img').dataset.price = producto.price;
        templateCard.querySelector('img').dataset.selected = 0;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    cards.appendChild(fragment);
}

const addCarrito = event => {
   
    
    if (event.target.classList.contains('card-img-top')){
        const isSelect = event.target.dataset.selected;
        //valida si ya se selecciono el articulo
        if (isSelect == 0){
            setCarrito(event.target);
            // mensajePersonalizado("elemento agregado exitosamente", elementoAgregado)
        }else{
            // elimina el articulo del carrito
            // console.log("paso por aqui")
            if (mensajePersonalizado("Esta seguro de eliminar el elemento??", elementoEliminado)){

                delete carrito[event.target.dataset.id]
                // activa para que el articulo pueda ser seleccionado nuevamente
                actualizarObjeto(event.target, 0);
                pintarCarrito(); 
            }
        }
        
        
    }
    event.stopPropagation();
}

const setCarrito = objeto => {
    
    const producto = {
        id: objeto.dataset.id,
        precio: parseInt(objeto.dataset.price),
        cantidad: 1
    }

    // if (carrito.hasOwnProperty(producto.id)) {
    //     producto.cantidad = carrito[producto.id].cantidad + 1;
    // }

    carrito[producto.id] = {...producto}

    //actualizar seleccion
    actualizarObjeto(objeto, 1);
    

    // console.log(carrito);
    pintarCarrito();


}

const pintarCarrito = () => {
    items.innerHTML = '';
    Object.values(carrito).forEach( (producto,index) => {
        templateCarrito.querySelector('th').textContent = index + 1;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.id;
        templateCarrito.querySelector('span').textContent = producto.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    })

    items.appendChild(fragment);

    pintarFooter();

    // localStorage.setItem('carrito', JSON.stringify(carrito));
}

const actualizarObjeto = function (objeto, opcion) {
    if (opcion === 1){
        objeto.dataset.selected = opcion;
        objeto.setAttribute('src', "../imgs/dustbin.svg"); 
    }

    if (opcion === 0){
        const item = data.find(element => element.id === objeto.dataset.id);
        // console.log(item);
        objeto.dataset.selected = opcion;
        objeto.setAttribute('src', item.src); 
    }

}

const pintarFooter = ()=>{
    footer.innerHTML = "";
    if (Object.keys(carrito).length == 0){
        footer.innerHTML = `<th scope="row" colspan="3">Carrito vacio - comience a comprar</th>`;
        return
    }

    //reduce the number of

    // const nCantidad =  Object.values(carrito).reduce((acc,item)=> acc + item.cantidad, 0)
    const nPrecio   =  Object.values(carrito).reduce((acc,item)=> acc + item.precio, 0)
    // console.log(`${nCantidad} --- ${nPrecio}`);

    // templateFooter.querySelector('th').textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click', () => {
        // 
        borrarSeleccion();
        carrito = {};
        pintarCarrito();
    })

}

const borrarSeleccion = ()=>{
    const selectedCard = cards.querySelectorAll('img[data-selected="1"]');
    selectedCard.forEach(element => actualizarObjeto(element,0));
}


const mensajePersonalizado = (mensaje, callback) => {
    const value = callback(mensaje);
    return value;
}

const elementoEliminado = (mensaje)=>{
    return window.confirm(mensaje);
}

const elementoAgregado = (mensaje)=>{
    alert(mensaje);
}


//pedir propiedades para TODO
const btnpagar = document.getElementById('btn-next');

btnpagar.addEventListener('click', ()=>{
    console.log(carrito)
    let carrito_ordenado = [];
    const propiedad = prompt('Escriba "precio" o "nombre" ');
    if (propiedad === "precio"){
         carrito_ordenado = ordenarPor(carrito,comparePorPrecio )
    }else{
         carrito_ordenado = ordenarPor(carrito,comparePorAlpha )
    }
    
    console.log(carrito_ordenado);


})

const ordenarPor = (productos, callback)=>{
    const temp = Object.values(productos) //convierte en array
    return ordenar(temp, callback);

}


const ordenar = (array, funcionOrden) =>{
   return array.sort(funcionOrden);
}

function comparePorPrecio(a, b) {
    if (a.precio > b.precio) { return 1; }
    if (a.precio < b.precio) { return -1; }
    return 0;
  }

function comparePorAlpha(a, b) {
    if (a.id > b.id) { return 1; } 
    if (a.id < b.id) { return -1; }
    return 0;
  }

//TODO

// function comparePorAlphaDesc(a, b) {
//     if (a.id > b.id) { return 1; } 
//     if (a.id < b.id) { return -1; }
//     return 0;
//   }
