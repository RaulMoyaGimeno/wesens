export class Wesen {
  constructor(nombre, imagen, tipo, peligrosidad, descripcion, notas) {
    this.uuid = crypto.randomUUID();
    this.nombre = nombre;
    this.imagen = imagen;
    this.tipo = tipo;
    this.peligrosidad = peligrosidad;
    this.descripcion = descripcion;
    this.notas = notas;
  }
}
