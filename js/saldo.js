const SALDO_INPUT = document.querySelector("#input_saldo");
const SALDO_ACTUAL_FORM = document.querySelector("#saldo_form");
const MONTO_CARGA = document.querySelector("#monto_carga");
const SALDO_NUEVO = document.querySelector("#nuevo_saldo");
const BTN_CARGAR = document.querySelector("#cargar_saldo");
let saldo;


if(parseInt(localStorage.getItem("saldo"))>0){
    SALDO_INPUT.value = JSON.parse(localStorage.getItem("saldo"))
    SALDO_ACTUAL_FORM.value = SALDO_INPUT.value
}else{
    SALDO_INPUT.value = 0;
    SALDO_ACTUAL_FORM.value = SALDO_INPUT.value
}

BTN_CARGAR.addEventListener("click",()=>{
    SALDO_INPUT.value = parseInt(MONTO_CARGA.value) + parseInt(SALDO_INPUT.value);
    SALDO_NUEVO.value = SALDO_INPUT.value;
    saldo = SALDO_INPUT.value;
    SALDO_ACTUAL_FORM.value = SALDO_INPUT.value
    Swal.fire(
        '',
        'Su saldo a sido cargado con exito.',
        'success'
      )
    localStorage.setItem("saldo",JSON.stringify(parseInt(saldo)));
})


