const PRODUCTOS_CONTAINER = document.getElementById("contender_productos");
const DIV_PRODUCTOS = document.getElementById("div_productos");
const BOTONESFILTROS = document.querySelectorAll(".btn_filtros")
const NUMEROCARRO = document.querySelector(".numero_carrito");
const NOMBREH2 = document.querySelector(".h2_comprar")

let BTN_COMPRAR = document.querySelectorAll(".btn-comprar")
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

const CARRITO_STORAGE = JSON.parse(localStorage.getItem("carrito"))

if (CARRITO_STORAGE == null){
     carrito =[];
}
else{
    carrito=CARRITO_STORAGE;
}


function subir_productos(productos){

    DIV_PRODUCTOS.innerHTML=""
    productos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add('productos');
        div.innerHTML =`
        
                        <img src=${producto.imagen} alt="dados">
                        <h3>${producto.titulo}</h3>
                        <span>$${producto.precio}</span>
                        <button class="btn-comprar" id=${producto.id} >Comprar</button>
       `;
       DIV_PRODUCTOS.append(div);

    
    })
    actualizarBtnComprar();
}

BOTONESFILTROS.forEach(boton =>{
    boton.addEventListener("click",(e)=>{
        if(e.currentTarget.id === "productos"){
            NOMBREH2.innerText = "Todos los productos";
            subir_productos(productos)
        }
        else{
            const PRODUCTOSFILTRADOS = productos.filter(producto => producto.categoria.id === e.currentTarget.id);  
            const PIMER_PRODUCTO = productos.find(producto =>producto.categoria.id === e.currentTarget.id);

            NOMBREH2.innerText = PIMER_PRODUCTO.categoria.nombre;
            
            subir_productos(PRODUCTOSFILTRADOS)
        }
    })
})

function actualizarBtnComprar(){
    BTN_COMPRAR = document.querySelectorAll(".btn-comprar")
    BTN_COMPRAR.forEach(boton =>{
        boton.addEventListener("click",(e)=>{
            numero_carrito ++
            NUMEROCARRO.innerText = numero_carrito;
            localStorage.setItem("numero_carro",numero_carrito);
            

            if(carrito.some(producto => e.currentTarget.id === producto.id)){
                const INDEX_DEL_PRODUCTO = carrito.findIndex(producto =>e.currentTarget.id === producto.id)
                carrito[INDEX_DEL_PRODUCTO].cantidad++;
            }
            else{
                const PRODUCTO_SELECCIONADO = productos.find(producto => e.currentTarget.id === producto.id)
                carrito.push(PRODUCTO_SELECCIONADO)
            }
            localStorage.setItem("carrito",JSON.stringify(carrito))
            console.log(carrito)
        })

    })
}

subir_productos(productos);