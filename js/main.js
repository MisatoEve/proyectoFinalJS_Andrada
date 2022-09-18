//Entrega Trabajo Final
//►Principal: Tienda de juegos PS4 versión digital - físico

//▼Elementos DOM 
let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')
let acumulador
let divProductos = document.getElementById("productos")
divProductos.setAttribute("class", "productosEstilos")
let inputBuscar = document.getElementById("buscador") 
let btnBuscar = document.getElementById("btnBuscar")

//▼Evento botonCarrito
botonCarrito.addEventListener('click', () => {
    cargarProductosCarrito(productosEnCarrito)
})

//▼Se aplica Operador OR
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

//▼PLANTILLA DOM
function mostrarCatalogo(){
    divProductos.innerHTML= ""
    conjuntoJuegos.forEach((juego)=>{
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML =  `<article id="${juego.id}" class="card container-fluid" style="width: 28rem;">
                                    <img src="${juego.imagen}" alt="${juego.titulo}>
                                    <article class="card-body">
                                        <h3 class="card-title">${juego.titulo}</h3>
                                        <p class="">Formato: ${juego.formato}</p>
                                        <p class="card-text">Año: ${juego.anio}</p>
                                        <p class="precioCard">Precio: ${juego.precio}</p>
                                        <button id="agregarBtn${juego.id}" class="btn btn-primary click">Agregar al carrito</button>
                                    </article>` 
        divProductos.appendChild(nuevoProducto)

        let btnAgregar = document.getElementById(`agregarBtn${juego.id}`)
        console.log(btnAgregar);
        btnAgregar.addEventListener("click", () =>{agregarAlCarrito(juego)})
        })
    }

function agregarAlCarrito(juego){
    console.log(`su juego ${juego.titulo} formato ${juego.formato} ha sido agregado. N° id: ${juego.id}`)
    let juegoAgregado = productosEnCarrito.find((elem) => (elem.id == juego.id))
    console.log(juegoAgregado)
    console.log(productosEnCarrito);
    if (juegoAgregado == undefined){
        productosEnCarrito.push(juego)
        console.log(productosEnCarrito);
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito)) 
        //▲Seteo al storage       
        Swal.fire({
            title: "Ha agregado el producto",
            text: `El juego ${juego.titulo} en formato ${juego.formato} ha sido agregado`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            confirmButtonText:"Entendido",
        })
    }else{
        console.log(`El juego seleccionado ${juego.titulo} ya se encuentra en el carrito`)
        Swal.fire({
            title: "Producto ya agregado",
            text: `El juego ${juego.titulo} en formato ${juego.formato} ya se encuentra en el carrito`,
            icon: "info",
            timer:4000,
            confirmButtonText:"Aceptar",
            confirmButtonColor: 'green',
        })
    }
}

//▼Inputs  
function guardarNuevojuego(){
    let tituloInput = document.getElementById("tituloInput")
    let anioInput = document.getElementById("anioInput")    
    let precioInput = document.getElementById("precioInput")    
    let formatoInput = document.getElementById("formatoInput")
    let juegoCreado = new Juegos(conjuntoJuegos.length+1, tituloInput.value, anioInput.value, precioInput.value, formatoInput.value, "multimedios/newJuego.jpg")
    console.log(juegoCreado)
    conjuntoJuegos.push(juegoCreado)
    localStorage.setItem("conjuntoJuegos", JSON.stringify(conjuntoJuegos))
    //▲Seteo al storage conjuntoJuegos
    //▲CLAVE: "conjuntoJuegos"
}

function cargarProductosCarrito(productosDelStorage) {

    modalBody.innerHTML = " "  
    productosDelStorage.forEach((productoCarrito) => {
        
        modalBody.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
                <img class="card-img-top" src="${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
                <div class="card-body">
                        <h4 class="card-title">${productoCarrito.titulo}</h4>
                        <p class="card-text">$${productoCarrito.precio}</p> 
                        <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>    
            </div>
        `
    })
productosDelStorage.forEach((productoCarrito, indice)=>{
//▼Capturar el boton sin usar variable y adjuntamos evento
    document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener('click', () => {
        //▼Cartel emergente:
        Toastify({
            text: `${productoCarrito.titulo} ha sido eliminado`,
            duration: 2500,
            gravity: "bottom",
            position: "left",
            style:{
                background: "#006FCD",
                color: "white", 
            }
            
            }).showToast();
        console.log(`Producto ${productoCarrito.titulo} eliminado`)
        //▼Eliminamos del DOM
        let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
        console.log(cardProducto);
        cardProducto.remove()

        //▼Eliminamos del array compras
        productosEnCarrito.splice(indice, 1)
        console.log(productosEnCarrito)
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
        cargarProductosCarrito(productosEnCarrito)
    })  
})
//▼Declaro función para calcular total ||▼Se aplica Spread ...
compraTotal(...productosDelStorage)
}

function compraTotal(...productosTotal) {
    acumulador = 0;
    acumulador = productosTotal.reduce((acumulador, productoCarrito)=>{
        return acumulador + productoCarrito.precio 
    },0)
    console.log(acumulador)

//▼Se declara if para acumulador = 0 o != ||▼Se aplica Operador Ternario ? : 
acumulador > 0 ? parrafoCompra.innerHTML = `El importe de su compra es ${acumulador}`: parrafoCompra.innerHTML = `<p>El carrito está vacío</p>`
}

function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result) => {
        let DateTime = luxon.DateTime
        const dt = DateTime.now()
        let fecha = `Siendo las ${dt.toLocaleString(DateTime.TIME_SIMPLE)} del ${dt.toLocaleString(DateTime.DATE_FULL)}`
    if (result.isConfirmed) {
        Swal.fire({
            title: 'Compra realizada',
            icon: 'success',
            confirmButtonColor: '#006FCD',
            text: `Muchas gracias por su compra ^^`,
            footer: `<p>${fecha} usted recibirá un mail con las indicaciones para coordinar la entrega</p>`
        })
        //▲▼Ejecutar .then en caso de que result sea confirmado. 
        productosEnCarrito = []
        localStorage.removeItem('carrito')
        console.log(`El total de su compra es ${acumulador}`)
        //▼Se cargar el modal con el array vacío
        cargarProductosCarrito(productosEnCarrito)
        }
        else{
            Swal.fire({
                title: 'Lo sentimos! La compra no fue realizada',
                icon: 'info',
                text: `La compra continúa pendiente`,
                confirmButtonColor: '#006FCD',
                timer:3500
            })
        }
    })}

//▼Eventos 
botonCarrito.addEventListener('click', () => {
    cargarProductosCarrito(productosEnCarrito)
})
botonFinalizarCompra.addEventListener('click',()=>{
    finalizarCompra()
})
btnBuscar.addEventListener('click', ()=>{
    //▼function de buscado
    //event.preventDefault()
    console.log("click");
    console.log(inputBuscar.value.toLowerCase());
    let tituloBuscado = conjuntoJuegos.filter(juego =>(juego.titulo.toLowerCase() == inputBuscar.value.toLowerCase()))
    console.log(tituloBuscado);
    if(tituloBuscado.length == 0){
        console.log(`No hay coincidencia`);
        mostrarCatalogo(conjuntoJuegos)
    }else{
        mostrarCatalogo(tituloBuscado)

    }
})
//Código
let divLoader = document.getElementById("loader")

const loading = setTimeout(()=>{
    divLoader.remove()
    mostrarCatalogo(conjuntoJuegos)
},2500)

//▼Session Storage | ▼Aplico DarkMode
let btnDarkMode = document.getElementById("botonDarkMode")
let btnLightMode = document.getElementById("botonLightMode")

let darkMode
console.log(localStorage.getItem("darkMode"))
if(localStorage.getItem("darkMode")){
    darkMode = localStorage.getItem("darkMode")
}else{
    console.log("entra primera vez")
    localStorage.setItem("darkMode", "light")
} 

if(darkMode == "dark"){
    document.body.classList.add("darkMode")
}

btnDarkMode.addEventListener("click", ()=>{
    document.body.classList.add("darkMode")
    localStorage.setItem("darkMode", "dark")

})
btnLightMode.addEventListener("click", ()=>{
    document.body.classList.remove("darkMode")
    localStorage.setItem("darkMode", "light")
})

let eliminarModo = document.getElementById("eliminarMode")
eliminarModo.addEventListener("click", ()=>{
    localStorage.removeItem("darkMode")
})
//▲Fin declaraciones 

