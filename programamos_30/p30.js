document.addEventListener("DOMContentLoaded", function(event) {
    fetchData();
});
//     // parent_object.appendChild(div);

const fetchData = ()=> {
    const url_api = 'https://pokeapi.co/api/v2/pokemon/';
    const foo = [
        fetch(url_api + 1).then(response => response.json()),
        fetch(url_api + 2).then(response => response.json()),
        fetch(url_api + 3).then(response => response.json())
    ]
    Promise.all(foo)
        .then(responses => {
            console.log(responses);
            // return responses;
        })
        //   // mapea el array de resultados dentro de un array de response.json() para leer sus contenidos
        // .then(responses => Promise.all(responses.map(r => r.json())))
        // // todas las respuestas JSON son analizadas: "users" es el array de ellas
        // .then(users => users.forEach(user => console.log(user)))
        .catch((error)=>console.log(error))
    const properties = {text : "texto imagen", src : "../imgs/cartas/svg/001-slip_on_shoes.svg"}
    addElement(properties, ".pokemon-items");
    addElement(properties, ".pokemon-items");
}   



const addElement =(properties,parent_class) => {
    let div = document.createElement('div');
    let parent_object = document.querySelector(parent_class)
    div.id = 'content';
    div.className = 'card-content';
    div.innerHTML = `<p>${properties.text}</p>
                    <img src="${properties.src}" alt="${properties.text}" />`;
    parent_object.appendChild(div);
}