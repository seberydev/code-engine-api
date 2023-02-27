// ELEMENTOS -----------------------------------------------------------
let termToSearch = document.querySelector("#search")
let div = document.querySelector(".element");
let divRes = document.querySelector("#divRes")

// FUNCIONES -----------------------------------------------------------
// MUESTRA BÚSQUEDAS HECHAS ANTERIORMENTE
function showSearches() {
  var busquedas = JSON.parse(localStorage.getItem("busquedas")) || [];
  // Mostrar la lista de búsquedas en un div con clase "element"
  div.innerHTML = "";

  for (var i = 0; i < busquedas.length; i++) {
    var p = document.createElement("p");
    p.innerHTML = busquedas[i].termino;
    div.appendChild(p);
  }
}

//Function to save localStorage and go to mysearch view
function buscar() {
  // Obtener el valor del campo de búsqueda
  var mi_texto = termToSearch.value;

  if (mi_texto != '') {
    // Obtener la lista de búsquedas almacenadas en localStorage
    var busquedas = JSON.parse(localStorage.getItem("busquedas")) || [];

    // Buscar si ya se ha realizado una búsqueda anteriormente
    var terminoEncontrado = false;
    for (var i = 0; i < busquedas.length; i++) {
      if (busquedas[i].termino === mi_texto) {
        terminoEncontrado = true;
        break;
      }
    }

    // Si el término no ha sido buscado anteriormente, agregarlo a la lista
    if (!terminoEncontrado) {
      busquedas.push({ termino: mi_texto });
      localStorage.setItem("busquedas", JSON.stringify(busquedas));
    }

    getTerm(mi_texto)
    window.location.href = 'http://localhost:3000/mysearchs';
  }
}

function getTerm(term) {
  fetch(`http://localhost:3000/api/search?search=${term}`)
    .then((data) => data.json()
      .then((d) => {
        localStorage.setItem('search', JSON.stringify(d[0]))
      })
      .catch((err) => console.log(err)))
    .catch((err) => { console.log(err) })
}

function showRes() {
  divRes.innerHTML = ''

  let searchRes = localStorage.getItem('search')
  if (searchRes == 'undefined') {
    let err = document.createElement("h3");
    err.innerHTML = "Error: término buscado no encontrado";
    divRes.appendChild(err);
  }
  else {
    searchRes = JSON.parse(searchRes)
    let title = document.createElement("h1");
    title.innerHTML = searchRes.term;
    divRes.appendChild(title);
    let def = document.createElement("h3");
    def.innerHTML = searchRes.meaning;
    divRes.appendChild(def);
    console.log(searchRes)
  }
}

// MANDA LLAMAR FUNCIÓN CUANDO PÁGINA CARGA
if (termToSearch) showSearches()
if (divRes) showRes()