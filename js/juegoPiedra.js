let puntosUsuario = 0;
let puntosPC = 0;

let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let mensaje = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegiTuArma = document.querySelector("#elegi-tu-arma");
let cajaResultado = document.querySelector("#resultado-piedra")

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario");
let contenedorEleccionPC = document.querySelector("#eleccion-computadora");

let botonesArmas = document.querySelectorAll(".arma");
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
});


let apuesta;
let resultado = document.querySelector("#resultado-piedra");

const SALDO_INPUT = document.querySelector("#input_saldo");
let saldo;
let nuevo_saldo;

if(parseInt(localStorage.getItem("saldo"))>0){
    SALDO_INPUT.value = JSON.parse(localStorage.getItem("saldo"))
}else{
    SALDO_INPUT.value = 0;
}


function iniciarTurno(e) {
    saldo = JSON.parse(localStorage.getItem("saldo"));
    apuesta = document.querySelector("#apuesta-piedra").value;
    

    if (apuesta>saldo || apuesta == 0 || apuesta == ""  || isNaN(apuesta)){
        alert("Debes realizar una apuesta mayor o igual a su saldo actual.")
    }
    else{
        let eleccionPC = Math.floor(Math.random() * 3);
        let eleccionUsuario = e.currentTarget.id;
    
        if (eleccionPC === 0) {
            eleccionPC = "piedra🗿";
        } else if (eleccionPC === 1) {
            eleccionPC = "papel📋"
        } else if (eleccionPC === 2) {
            eleccionPC = "tijera✂️"
        }
    
    
        if (
            (eleccionUsuario === "piedra🗿" && eleccionPC === "tijera✂️") ||
            (eleccionUsuario === "tijera✂️" && eleccionPC === "papel📋") ||
            (eleccionUsuario === "papel📋" && eleccionPC === "piedra🗿")
        ) {
            ganaUsuario();
        } else if (
            (eleccionPC === "piedra🗿" && eleccionUsuario === "tijera✂️") ||
            (eleccionPC === "tijera✂️" && eleccionUsuario === "papel📋") ||
            (eleccionPC === "papel📋" && eleccionUsuario === "piedra🗿")
        ) {
            ganaPC();
        } else {
            empate();
        }
    
        mensaje.classList.remove("disabled");
        contenedorEleccionUsuario.innerText = eleccionUsuario;
        contenedorEleccionPC.innerText = eleccionPC;
    
        if (puntosUsuario === 5 || puntosPC === 5) {
    
            if (puntosUsuario === 5) {
                instrucciones.innerText = "🔥 ¡Ganaste el juego! 🔥";
                acreditacion("gana",saldo);
                cajaResultado.value ="Ganaste";
                cajaResultado.classList.remove("perdio");
                cajaResultado.classList.add("gano");
            }
    
            if (puntosPC === 5) {
                instrucciones.innerText = "😭 ¡La casa ganó el juego! 😭"
                acreditacion("pierde",saldo)
                cajaResultado.value ="Perdiste";
                cajaResultado.classList.remove("gano");
                cajaResultado.classList.add("perdio");
            }
    
            elegiTuArma.classList.add("disabled");
            reiniciar.classList.remove("disabled");
            reiniciar.addEventListener("click", reiniciarJuego);
        }
    }
}

function ganaUsuario() {
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorGanaPunto.innerText = "¡Ganaste un punto! 🔥"
}

function ganaPC() {
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
    contenedorGanaPunto.innerText = "¡La casa ganó un punto! 😭"
}

function empate() {
    contenedorGanaPunto.innerText = "¡Empate! 😱"
}

function reiniciarJuego() {
    reiniciar.classList.add("disabled");
    elegiTuArma.classList.remove("disabled");
    mensaje.classList.add("disabled");

    puntosUsuario = 0;
    puntosPC = 0;
    
    contenedorPuntosUsuario.innerText = puntosUsuario;
    contenedorPuntosPC.innerText = puntosPC;
    cajaResultado.value ="";

    instrucciones.innerText = "El primero en llegar a 5 puntos gana."
}

function acreditacion(resultado,saldoe){
    ca = saldoe

    if (resultado == "gana"){
        nuevo_saldo = saldo+(parseInt(apuesta)*2);
        SALDO_INPUT.value = nuevo_saldo;
    }
    else{
        nuevo_saldo = saldo-parseInt(apuesta);
        SALDO_INPUT.value = nuevo_saldo;
    }
    localStorage.setItem("saldo",JSON.stringify(nuevo_saldo))

}