//▼Creamos la estructura de los objetos
class Juegos{
    constructor (id, titulo, anio, precio, formato, imagen){
        this.id = id;
        this.titulo = titulo;
        this.anio = anio;
        this.precio = precio;
        this.formato = formato;
        this.imagen = imagen
    };
};
//▼Creamos los nuevos Array
let conjuntoJuegos = []
//▼Realizamos llamada - Aplicamos Fetch con Await. Asincrónico.
const cargarConjunto = async () =>{
    const response = await fetch("juegos.json")
    const data = await response.json()
    for(let juego of data){
                let juegoNuevo = new Juegos(juego.id, juego.titulo, juego.anio, juego.precio, juego.formato, juego.imagen)
                conjuntoJuegos.push(juegoNuevo)
            }
}
cargarConjunto()