const RESULTADO = document.querySelector("#resultado_apuesta");
const BTN_JUGAR = document.querySelector("#jugar");
const SALDO_INPUT = document.querySelector("#input_saldo");
const RESULTADO_LETRAS = document.querySelector(".caca");

if(parseInt(localStorage.getItem("saldo"))>0){
    SALDO_INPUT.value = JSON.parse(localStorage.getItem("saldo"))
}else{
    SALDO_INPUT.value = 0;
}


let dado;
let dadoTirado;
let saldo;
let nuevo_saldo;

function jugar(){
    dadoTirado = Tirar_dado()

    let dados_apostado = parseInt(document.querySelector("#dado_apostado").value);
    let apuesta = document.querySelector("#apuesta").value;
    saldo = JSON.parse(localStorage.getItem("saldo"));

    if (apuesta>saldo || apuesta == 0 || apuesta == ""  || isNaN(apuesta)){
        alert("Debes realizar una apuesta mayor o igual a su saldo actual.")
    }
    else{
        if(dados_apostado>=1 & dados_apostado <=6){
            if (dados_apostado == dadoTirado ){
                RESULTADO.value = dadoTirado;
                nuevo_saldo = saldo+(parseInt(apuesta)*3);
        
                SALDO_INPUT.value = nuevo_saldo;
                RESULTADO_LETRAS.innerHTML="";
                RESULTADO_LETRAS.innerHTML= h3("win","GANASTE");
            }
            else{
                RESULTADO.value = dadoTirado;
                nuevo_saldo = saldo-parseInt(apuesta);
        
                SALDO_INPUT.value = nuevo_saldo;
                RESULTADO_LETRAS.innerHTML = "";
                RESULTADO_LETRAS.innerHTML = h3("lost","PERDISTE");
            }
            cambio_de_imagen(dadoTirado);
            localStorage.setItem("saldo",JSON.stringify(nuevo_saldo))
        }
        else{
            alert("Debes ingresar un valor de dado del 1 al 6.")
        }
        
    }
    
    
}


function cambio_de_imagen(dado){
    const IMAGEN_RESULTADO = document.querySelector(".resultado_imagen");
    switch (dado) {
        case 1:
            IMAGEN_RESULTADO.innerHTML = "";
            IMAGEN_RESULTADO.innerHTML = `
            <img class="img_resultado" src="imgJuegos/dado1.jpg" alt=""></img>
            `
            break;
        case 2:
            IMAGEN_RESULTADO.innerHTML = "";
            IMAGEN_RESULTADO.innerHTML = `
            <img class="img_resultado" src="imgJuegos/dado2.jpg" alt=""></img>
            `
            break;
        case 3:
            IMAGEN_RESULTADO.innerHTML = "";
            IMAGEN_RESULTADO.innerHTML = `
            <img class="img_resultado" src="imgJuegos/dado3.jpg" alt=""></img>
            `
            break;
        case 4:
            IMAGEN_RESULTADO.innerHTML = "";
            IMAGEN_RESULTADO.innerHTML = `
            <img class="img_resultado" src="imgJuegos/dado4.jpg" alt=""></img>
            `
            break;        
        case 5:
            IMAGEN_RESULTADO.innerHTML = "";
            IMAGEN_RESULTADO.innerHTML = `
            <img class="img_resultado" src="imgJuegos/dado5.jpg" alt=""></img>
            `
            break;    
        case 6:
            IMAGEN_RESULTADO.innerHTML = "";
            IMAGEN_RESULTADO.innerHTML = `
            <img class="img_resultado" src="imgJuegos/dado6.jpg" alt=""></img>
            `
            break;
    }
}


function h3(resultado,mensaje){
    oracion = `
    <h3 class="h3_resultado_${resultado}">${mensaje}</h3>`;
    return oracion
}



function Tirar_dado(){

    dado = Math.round(Math.random()*5)+1;
    return dado
}

BTN_JUGAR.addEventListener("click",jugar);



