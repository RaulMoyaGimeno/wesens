import { Wesen } from "./wesen.js";
import { wesens } from "./wesen-array.js";
import { Tipo, Peligrosidad } from "./enums.js";
import { avisoSelWesen, successMessage } from "./alertas.js";

let wesenActivo;

function crearLiWesen(wesen) {
  const lista = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = wesen.nombre;
  li.appendChild(document.createElement("br"));
  const img = document.createElement("img");
  img.src = wesen.imagen;
  img.alt = "Wesen";
  li.appendChild(img);
  li.addEventListener("click", () => cargarWesen(wesen));
  li.id = wesen.uuid;
  lista.appendChild(li);
}

function generarLista() {
  wesens.forEach((wesen) => {
    crearLiWesen(wesen);
  });
}

function cargarWesen(wesen) {
  const nombre = document.getElementById("nombre");
  const imagen = document.getElementById("imagen");
  const wesen_type = document.getElementById("wesen_type");
  const wesen_danger = document.getElementById("wesen_danger");
  const descripcion = document.getElementById("descripcion");
  const notas = document.getElementById("notas");

  nombre.value = wesen.nombre;
  imagen.value = wesen.imagen;
  wesen_type.value = wesen.tipo;
  wesen_danger.value = wesen.peligrosidad;
  descripcion.value = wesen.descripcion;
  notas.value = wesen.notas;

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
  const nombre = document.getElementById("nombre").value;
  const imagen = document.getElementById("imagen").value;
  const wesen_type = document.getElementById("wesen_type").value;
  const wesen_danger = document.getElementById("wesen_danger").value;
  const descripcion = document.getElementById("descripcion").value;
  const notas = document.getElementById("notas").value;
  const wesen = new Wesen(
    nombre,
    imagen,
    wesen_type,
    wesen_danger,
    descripcion,
    notas,
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

cargarSelect("wesen_type", Tipo);
cargarSelect("wesen_danger", Peligrosidad);

function addEventBtn(btn, action) {
  const button = document.getElementById(btn);
  button.addEventListener("click", action);
}

addEventBtn("crear", crear);
addEventBtn("editar", editar);
addEventBtn("eliminar", eliminar);

generarLista();
