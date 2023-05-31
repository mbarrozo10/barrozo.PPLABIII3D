import {Heroes} from './heroes.js';
import {Superheroe} from './superheroe.js';
import {armas} from './armas.js';
import {crearTabla} from './tabla.js';
import {actualizarTabla} from './tabla.js';

const $seccionTabla= document.getElementById("selTabla");
let anuncios= JSON.parse(localStorage.getItem('Heroes')) || Heroes;
let flag=true;
let indice=0;
localStorage.setItem('Heroes', JSON.stringify(anuncios));
//Seteo addevent para que guarde el manejador 

$seccionTabla.appendChild(crearTabla(JSON.parse(localStorage.getItem('Heroes'))));
window.addEventListener('DOMContentLoaded', () => {

    const formulario = document.getElementById('formularioAlta');

    armas.forEach((x) => {
      const opcion = document.createElement('option');
      opcion.value = x;
      opcion.text= x;
      formulario.arma.appendChild(opcion);
    });
    formulario.addEventListener('submit', Manejador);
   
  });



//Decido si voy a guardar o a modificar dependiendo del estado del boton (no es lo mejor)

function Manejador(event) {
  event.preventDefault();
  const formulario = document.getElementById('formularioAlta');
  if(flag) {
    GuardarAnuncio();
  }
  else {
    ModificarAnuncio(formulario);
  }
  }



//Event listener para detectar si apreto en la tabla
window.addEventListener("click", (e) => {
  if(e.target.matches("td")){
      
      const id = e.target.parentElement.dataset.id;
      indice= id;
      const anuncioSeleccionado = anuncios.find((personaje) => personaje.id==id);
      CargarDatosSeleccionado(anuncioSeleccionado);
  }
});

//Genero el objeto anuncio y verifico sus valores
function GuardarAnuncio() {
  const id= generarId();
  const alias= document.getElementById('txtDescripcion').value;
  const nombre = document.getElementById('txtTitulo').value;
  const fuerza= document.getElementById('fuerza').value;
  const indice= document.getElementById('arma').selectedIndex;
  let arma;
  for(const key in armas){
    if(key== indice){
      arma= armas[key];
    }

  }
  const transacciones = document.getElementsByName('transaccion');
  let transaccion= false;
  transacciones.forEach(element => {
      if(element.checked) {
          transaccion= element.value;
      }
  });
  if(nombre !="" && fuerza !=undefined && arma !=""){
    const personaje = new Superheroe(parseInt(id),nombre,fuerza,alias,transaccion,arma);
    AgregarAnuncio(personaje);
    LimpiarFormulario(id+1);
   
  }else{
    alert("Algun campo esta vacio");
  }

}

//Agrego el anuncio al anuncios y actualizo el localstorage y la tabla
function AgregarAnuncio(Anuncio) {
  anuncios.push(Anuncio);
  console.log(anuncios);
  actualizarTabla($seccionTabla,anuncios); 
}

//Carga los datos de la tabla al formulario
function CargarDatosSeleccionado(anuncioSeleccionado){
    const formulario = document.getElementById('formularioAlta');
    formulario.txtTitulo.value= anuncioSeleccionado.nombre;
    formulario.txtDescripcion.value= anuncioSeleccionado.alias;
    formulario.fuerza.value= anuncioSeleccionado.fuerza;
    flag=false;
    for(const key in armas){
      
        if(armas[key]== anuncioSeleccionado.arma){
          formulario.arma.selectedIndex= key;
        }
    }
    
    if(anuncioSeleccionado.transaccion == "venta")
        {
            document.getElementById('rTransaccionVenta').checked = true;
          
        }else
        {
          
            document.getElementById('rTransaccionAlquiler').checked = true;
        }
    formulario.btnGuardar.value= "Modificar";
    formulario.btnBorrar.disabled=false;
    formulario.btnCancelar.disabled=false;
    formulario.btnBorrar.addEventListener('click',() => {BorrarAnuncio(anuncioSeleccionado, formulario)});
    formulario.btnCancelar.addEventListener('click',() => {
      LimpiarFormulario(0);
    formulario.btnGuardar.value="Guardar";
    formulario.btnBorrar.disabled=true;
    formulario.btnCancelar.disabled=true;
    })
    
}

function generarId()
{
    let id;
    for(var i = 0; i < anuncios.length; i++)
    {
        if(i == (anuncios.length - 1))
        {
            id = anuncios[i].id;
        }
    }
    return id + 1;
}

//Limpia el formulario
function LimpiarFormulario(id) {
  flag=true;
  localStorage.setItem('Heroes', JSON.stringify(anuncios));
  document.getElementById('txtTitulo').value = "";
  document.getElementById('txtDescripcion').value = "";
}

//Modifica el anuncio seleccionado en la tabla
function ModificarAnuncio(formulario) {
    anuncios.find((personaje) => {
      if(personaje.id===parseInt(indice) ){
        personaje.nombre= formulario.txtTitulo.value;
        personaje.alias= formulario.txtDescripcion.value;
        personaje.fuerza= document.getElementById('fuerza').value;
        const indice= document.getElementById('arma').selectedIndex;
        let arma;
        for(const key in armas){
          if(key== indice){
            arma= armas[key];
          }

        }
        const transacciones = document.getElementsByName('transaccion');
        let transaccion= false;
        transacciones.forEach(element => {
            if(element.checked) {
                transaccion= element.value;
            }
        });
        personaje.editorial= transaccion;
        personaje.arma= arma;
        flag=true;
      }
    }
    )
    actualizarTabla($seccionTabla,anuncios);
    LimpiarFormulario(anuncios[anuncios.length - 1].id + 1);
    
    formulario.btnGuardar.value="Guardar";
    formulario.btnBorrar.disabled=true;
}

//Borra el anuncio seleccionado en la tabla
function BorrarAnuncio(anuncioBorrar, formulario){
  let anunciosNuevo= [];
  flag=true;
  anuncios.forEach((personaje) => {
      if(personaje.id!==anuncioBorrar.id){
        anunciosNuevo.push(personaje);
      }
    });
  anuncios= anunciosNuevo;
  actualizarTabla($seccionTabla,anunciosNuevo);
  console.log(anunciosNuevo);
  LimpiarFormulario(anunciosNuevo[anunciosNuevo.length - 1].id + 1)
  
  formulario.btnGuardar.value="Guardar";
  formulario.btnBorrar.disabled=true;
}
