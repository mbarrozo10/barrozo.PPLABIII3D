
//Metodo generar tabla exportado para poder usarse en anuncios
export const crearTabla = (data) => {
    if(!Array.isArray(data)) return null;
    
    const tabla = document.createElement('tabla');
    MostrarSpinner();
    tabla.appendChild(CrearCabecera());
    tabla.appendChild(CrearCuerpo(data));

    return tabla;
}

function MostrarSpinner(){
    const $div= document.getElementById('spinner');
    const $seccionTabla= document.getElementById('selTabla');
    $seccionTabla.style.display="none";
    $div.style.display="block";

    setTimeout(function() {
        $div.style.display="none";
        $seccionTabla.style.display="block";
    }, 1000);
}

//Crea la cabecera, puede hacerse dinamicamente pero no quiero <3
const CrearCabecera = () => {
    const thead = document.createElement("thead"),
    headrow= document.createElement("tr");
    
    const thTitulo= document.createElement("th");
    const thtrans= document.createElement("th");
    const thDesc=   document.createElement("th");
    const thPrecio= document.createElement("th");
    const thCantB=   document.createElement("th");;
    
    thTitulo.textContent = "Nombre ";
    thtrans.textContent = "Fuerza ";
    thDesc.textContent = "Alias";
    thPrecio.textContent = "Editorial ";
    thCantB.textContent = "Arma";

    headrow.appendChild(thTitulo);
    headrow.appendChild(thtrans);
    headrow.appendChild(thDesc);
    headrow.appendChild(thPrecio);
    headrow.appendChild(thCantB);

    thead.appendChild(headrow);

    return thead;
};

//Crea el cuerpo de la tabla con los datos pasados
const CrearCuerpo= (data) => {
    const tbody = document.createElement("tbody");

    data.forEach(element => {
        const tr= document.createElement("tr");
        for(const key in element) {
            if(key ==="id"){
                tr.dataset.id=element[key];
            }else{
            const td= document.createElement("td");
            td.textContent = element[key];
          
            tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

//Actualiza la tabla, exporto para poder usarla cuando la necesito
export const actualizarTabla= (contenedor, data) => {
    while(contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.lastChild);
    }
    contenedor.appendChild(crearTabla(data));
  }


