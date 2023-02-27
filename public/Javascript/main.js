//Function to save localStorage and go to mysearch view
function buscar() {
  // Obtener el valor del campo de búsqueda
  var mi_texto = document.getElementById("search").value;

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

  // Mostrar la lista de búsquedas en un div con clase "element"
  var div = document.querySelector(".element");
  div.innerHTML = "";

  for (var i = 0; i < busquedas.length; i++) {
    var p = document.createElement("p");
    p.innerHTML = busquedas[i].termino;
    div.appendChild(p);
  }

  window.location.href='http://localhost:3000/mysearch';
}

