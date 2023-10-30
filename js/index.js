import { Wesen } from "./wesen.js";
import { wesens } from "./wesen-array.js";
import { Tipo, Peligrosidad } from "./enums.js";
import { avisoSelWesen, successMessage } from "./alertas.js";

let wesenActivo;

function crearLiWesen(wesen) {
  const lista = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = wesen.nombre;
  const img = document.createElement("img");
  img.src = wesen.imagen;
  img.alt = "Wesen";
  li.appendChild(img);
  li.addEventListener("click", () => cargarWesen(wesen));
  li.id = wesen.uuid;
  lista.appendChild(li);
}

function cargarWesen(wesen) {
  document.getElementById("nombre").value = wesen.nombre;
  document.getElementById("imagen").value = wesen.imagen;
  document.getElementById("wesen_type").value = wesen.tipo;
  document.getElementById("wesen_danger").value = wesen.peligrosidad;
  document.getElementById("descripcion").value = wesen.descripcion;
  document.getElementById("notas").value = wesen.notas;
  wesenActivo = wesen;
}

function cargarSelect(elementId, dataType) {
  const select = document.getElementById(elementId);
  Object.keys(dataType).forEach(function (tipo) {
    const option = document.createElement("option");
    option.text = tipo;
    select.add(option);
  });
}

function crear() {
  if (!document.getElementById("wesen_data").checkValidity()) {
    return;
  }
  const wesen = new Wesen(
    document.getElementById("nombre").value,
    document.getElementById("imagen").value,
    document.getElementById("wesen_type").value,
    document.getElementById("wesen_danger").value,
    document.getElementById("descripcion").value,
    document.getElementById("notas").value,
  );
  wesens.push(wesen);
  crearLiWesen(wesen);
  wesenActivo = undefined;
  document.getElementById("wesen_data").reset();
  successMessage("Wesen creado correctamente");
}

function editar() {
  if (wesenActivo === undefined) {
    avisoSelWesen();
    return;
  }
  if (!document.getElementById("wesen_data").checkValidity()) {
    return;
  }
  wesenActivo.nombre = document.getElementById("nombre").value;
  wesenActivo.imagen = document.getElementById("imagen").value;
  wesenActivo.tipo = document.getElementById("wesen_type").value;
  wesenActivo.peligrosidad = document.getElementById("wesen_danger").value;
  wesenActivo.descripcion = document.getElementById("descripcion").value;
  wesenActivo.notas = document.getElementById("notas").value;
  document.getElementById(
    wesenActivo.uuid,
  ).innerHTML = `${wesenActivo.nombre} <br> <img src='${wesenActivo.imagen}' alt='${wesenActivo.nombre}'>`;
  successMessage("Wesen editado correctamente");
}

function eliminar() {
  if (wesenActivo === undefined) {
    avisoSelWesen();
    return;
  }
  wesens.splice(wesens.indexOf(wesenActivo), 1);
  document.getElementById(wesenActivo.uuid).remove();
  wesenActivo = undefined;
  document.getElementById("wesen_data").reset();
  successMessage("Wesen eliminado correctamente");
}

function addEventBtn(btn, action) {
  document.getElementById(btn).addEventListener("click", action);
}

cargarSelect("wesen_type", Tipo);
cargarSelect("wesen_danger", Peligrosidad);
addEventBtn("crear", crear);
addEventBtn("editar", editar);
addEventBtn("eliminar", eliminar);
wesens.forEach((wesen) => crearLiWesen(wesen));