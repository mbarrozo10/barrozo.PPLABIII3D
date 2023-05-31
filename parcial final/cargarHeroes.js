

const heroes = JSON.parse(localStorage.getItem('Heroes')) || [];


window.addEventListener('DOMContentLoaded', () => {
    Generar();
});

function Generar() {
    const formulario= document.getElementById('tarjeta');

    heroes.forEach((hero) => {
        const ficha= document.createElement('fieldset');

        const labelNombre= document.createElement('label');
        const labelAlias= document.createElement('label');
        const labelEditorial= document.createElement('label');
        const labelFuerza= document.createElement('label');
        const labelArma= document.createElement('label');
        

        labelNombre.textContent = "nombre: " + hero.nombre;
        labelAlias.textContent = "Alias: " + hero.alias;
        labelEditorial.textContent ="Editorial: " + hero.editorial;
        labelFuerza.textContent= "Fuerza:  " + hero.fuerza;
        labelArma.textContent = "Arma: " + hero.arma;

        labelNombre.style.display="flex";
        labelAlias.style.display="flex";
        labelArma.style.display="flex";
        labelEditorial.style.display= "flex";
        labelFuerza.style.display= "flex";

        ficha.appendChild(labelNombre);
        ficha.appendChild(labelAlias);
        ficha.appendChild(labelFuerza);
        ficha.appendChild(labelArma);
        ficha.appendChild(labelEditorial);

        ficha.classList.add("Fichas");
        formulario.appendChild(ficha);
        
    })
}