
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    // Validar Campos
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios.');

        return;
    }
    

    // Consultar la API
    consultarAPI(ciudad, pais);

};


function mostrarError(mensaje){

    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        // Crear una alerta

        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700','px-4','py-3','rounded','max-w-md', 'mx-auto','mt-6','text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

          // Borrar alerta
   setTimeout(()=>{
    alerta.remove()   
   },3000)
    }

};

function consultarAPI(ciudad, pais){
    
    const appID = '68667016d3e3cb1d6cbb2d703cd8d4df';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    spinerCarga();

    fetch(url)
    .then( respuesta => respuesta.json())
    .then( datos =>{
        limpiarHTML() //Limpiar HTML previo

        if(datos.cod === '404'){
            mostrarError('Ciudad no encontrada.');
            return;
        };

        // Imprime la respuesta en el HTML
        mostrarClima(datos);
    });
}


function mostrarClima(datos){
    const {main: { temp, temp_max, temp_min } } = datos;
    const centigrados = KelvinACentigrados(temp);
    const centigradosMax = KelvinACentigrados(temp_max);
    const centigradosMin = KelvinACentigrados(temp_min);

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');
    
    const max = document.createElement('p');
    max.innerHTML = `Máxima: ${centigradosMax} &#8451;`;
    max.classList.add('font-bold','text-xl');
    
    const min = document.createElement('p');
    min.innerHTML = `Mínima: ${centigradosMin} &#8451;`;
    min.classList.add('font-bold','text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);
    resultado.appendChild(resultadoDiv);

}
// Helper = Funcion que hace una sola accicon
const KelvinACentigrados = grados => parseInt( grados - 273.15);

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    };
};

function spinerCarga(){
    limpiarHTML()

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}