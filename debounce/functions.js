var button = document.getElementById("debounce");
let btnApi = document.getElementById("apiGet");
let username = document.getElementById("username");
let btnapiGiphy = document.getElementById("apiGiphy");


function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }

btnapiGiphy.addEventListener("click",()=>{
    const url = `https://api.giphy.com/v1/gifs/trending`;
    const apiKey = `deN938U4Ef66YPDtShWaEralFVTOaOlc`;
    const params = {
        api_key : apiKey,
        limit: 25,
        rating: 'g'
    }

    const url_api = `${url}?${encodeQueryData(params)}`;
    // console.log(encodeQueryData(params));
    const req = fetch(url_api);

    req
    .then(response => response.json())
    .then(json => addTenGif(json.data));

})

function addTenGif(data){ 
    // console.log(data)
    const arr = data.slice(0,10)
    // console.log(arr)
    arr.forEach(element => {
        // console.log(element.images.fixed_height_small_still.url);
        addAvatar(element.images.fixed_height_small.url)
    });
}


function addAvatar(url_avatar){ 
    const img = document.createElement("img");
    img.src = url_avatar;
    img.style.height ="200px";
    document.querySelector("body").appendChild(img);


}

btnApi.addEventListener("click",()=>{
    const url = `https://api.github.com/users/`;
    
    const url_api = `${url}${username.value.trim()}`;

    const req = fetch(url_api);


    req
    .then((response) => {return response.json();})
    .then((data) => {
        if (data.hasOwnProperty('avatar_url')){
           addAvatar(data.avatar_url) 
        }
    })
    .catch(error => console.log("Error <->",error))
    
})
     
// const debounce = (func, wait, immediate)=> {
//     var timeout;

//     return function executedFunction() {
//         var context = this;
//         var args = arguments;
            
//         var later = function() {
//         timeout = null;
//         if (!immediate) func.apply(context, args);
//         };

//         var callNow = immediate && !timeout;
        
//         clearTimeout(timeout);

//         timeout = setTimeout(later, wait);
        
//         if (callNow) func.apply(context, args);
//     };
// };

const debounce = function (func, timeout) {
    let timer;
    
    // console.log(arguments);
    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() =>{
            func(...args);
        }, timeout);
    }
}


button.addEventListener('click', debounce(function() { 
        alert("This alert box will be displayed after 2 seconds no matter how many times you press the button.") 
                        }, 2000)); 

onChange = (text) => {
    console.log(text)
}



// const myfunction = onChange;

// const myfunction = debounce(onChange, 2000, false);
const myfunction = debounce(onChange, 2000)
myfunction('Arial 11')
myfunction('Arial 12')
myfunction('Arial 13')
myfunction('Arial 14')
myfunction('Arial 15')
myfunction('Arial 16')

function syncCode(){
    console.log("Random ", Math.random());
}

function asyncCode(){
    setTimeout(() => console.log("Random ", Math.random()), 2000);
}
/* 
console.log("start code")
syncCode();
console.log("end code")

console.log("start code")
asyncCode();
console.log("end code")

const condition = true;

const promise = new Promise((resolve, reject) => {
	// A mock async action using setTimeout
    // setTimeout(function() { resolve(10); }, 3000);
    
    
	if(condition) {
        
		setTimeout(function() { resolve({operation:'Success!'});}, 3000);
	}
	else {
		reject('Failure!');
	}
})


promise
.then((respuesta) =>{
    console.log(respuesta)
}).catch(function(e) {
	console.log("error", e)
}).finally(function() {
    console.log(`executes regardless or success for failure` )
 });
 */
//  const apiGit = fetch()

/* const p = new Promise((resolve, reject) =>{
    const random = Math.round(Math.random() *10) 

    if (random % 2 === 0) {
        resolve({promesa:"exitosa", numero: random})
    }else{
        reject({promesa:"rechazada", numero: random})
    }
})

p
.then((respuesta) => console.log(respuesta))
.catch((e) => console.log(e))
.finally(function() {
    console.log(`Paso por aqui ` )
 }); */

 const promesa_delayed = new Promise((resolve, reject) =>{
    const random = Math.round(Math.random() *10) 

    if (random % 2 === 0) {
        setTimeout(function() { resolve({promesa:"exitosa", numero: random});}, 2000);
    }else{
        setTimeout(function() { reject({promesa:"rechazada", numero: random});}, 2000);
    }
})


promesa_delayed
.then((respuesta) => console.log(respuesta))
.catch((e) => console.log(e))

console.log("--------------------Funciones asincronas--------------------")

let hello = async function hello() {
    return greeting = await Promise.resolve("Hello");
  };
  
  fetch('../imgs/airplane-1651267-1402988.png')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.blob();
    }
  })
  .then(myBlob => {
    let objectURL = URL.createObjectURL(myBlob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });