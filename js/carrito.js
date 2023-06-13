const PRODUCTOS_EN_CARRITO = JSON.parse(localStorage.getItem("carrito"));
const NUMEROCARRO = document.querySelector(".numero_carrito");
const PRECIO_TOTAL = document.querySelector("#precio_total");

const CONTENDOR = document.querySelector(".contenedor_carrito");
const CARRITO_CONTAINER = document.querySelector(".main_carrito");
const OPCIONES_DE_COMPRA = document.querySelector(".opciones_de_compra")

const VACIAR_CARRITO = document.querySelector(".btn_vaciar");
const COMPRAR = document.querySelector(".btn_comprar");
let btn_eliminar = document.querySelectorAll(".producto_carrito_eliminar");



let precio_total = 0;
let numero_carrito;
let numero_de_carro;
let carrito;


numero_de_carro = localStorage.getItem("numero_carro");
if (numero_de_carro>0){
    NUMEROCARRO.innerText = numero_de_carro;
    numero_carrito = numero_de_carro
}
else{
    numero_carrito = 0
}



function cargarCarrito(productos){
    CONTENDOR.innerHTML="";
    productos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("carrito_items");
        div.innerHTML =`
                    <img src=${producto.imagen} alt="">
                    <div class="div_1">
                        <strong>Producto:</strong>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="div_2">
                        <strong>Cantidad:</strong>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="div_2">
                        <strong>Precio:</strong>
                        <p>${producto.precio}</p>
                    </div>
                    <div class="div_3">
                        <strong>Sub total:</strong>
                        <p>${producto.precio*producto.cantidad}</p>
                    </div>
                    <button class="producto_carrito_eliminar" id="${producto.id}">
                        <span class="material-symbols-outlined">
                            delete_sweep
                        </span>
                    </button>
        `
        precio_total += producto.precio * producto.cantidad
        PRECIO_TOTAL.innerText = "$"+precio_total
        CONTENDOR.append(div);
    });
}

if (PRODUCTOS_EN_CARRITO != null){
    cargarCarrito(PRODUCTOS_EN_CARRITO);
    actualizar_btn_eliminar();
}else{
    carro_vacio("v");
}

VACIAR_CARRITO.addEventListener("click",(e)=>{
    Swal.fire({
        title: 'Eliminar productos.',
        text: "Estas seguro que quieres eliminar todos tus productos?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Sus productos fueron eliminados',
            '',
            'success'
          )
          borrar_estorage();
          location.reload();
          
        }
      })
        
    
      
})
COMPRAR.addEventListener("click",(e)=>{
    borrar_estorage();
    carro_vacio("s");
    CONTENDOR.remove();
    
});

function borrar_estorage(){
    localStorage.removeItem('numero_carro');
    localStorage.removeItem('carrito');
}

function actualizar_btn_eliminar(){
    btn_eliminar = document.querySelectorAll(".producto_carrito_eliminar");
    btn_eliminar.forEach(boton =>{
        boton.addEventListener("click",eliminar_producto_carrito);
    })
}

function eliminar_producto_carrito(e){
    let id_btn_eliminar = e.currentTarget.id;
    let index_producto_eliminar = PRODUCTOS_EN_CARRITO.findIndex(producto => producto.id == id_btn_eliminar);

    PRODUCTOS_EN_CARRITO.splice(index_producto_eliminar,1)
    cargarCarrito(PRODUCTOS_EN_CARRITO);
}

function carro_vacio(opcion){

    if (opcion == "v"){
        opcion = "Su carro esta vacio, no hay productos que mostrar."
    }
    else{
        opcion = "Su compra a sido realizada con exito."
    }
    
    const div = document.createElement("div");
    div.classList.add("carro_vacio");
    div.innerHTML= `
    <p>${opcion}</p>`
    CARRITO_CONTAINER.append(div);
    OPCIONES_DE_COMPRA.remove();
    
}

