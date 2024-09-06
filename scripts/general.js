import { obtenerResolucion } from './escalar.js';
const archivo = document.getElementById('archivo');
const casillaV = document.getElementById("casillaVideo");
const ruta = document.getElementById('ruta');
const caminito = document.querySelectorAll('.caminito');
const inputArchivo = document.querySelectorAll(".nombreArchivo");
const loader = document.querySelectorAll('.loader');
const botonCookies = document.querySelector('#botonR');
const containerFileName = document.querySelector('.container-file-name');
export let video;
export let archivoVideo;

// TODO: diferentes temas con menu escondido, se guarda el tema actual en las cookies

archivo.addEventListener('change', function (event) {
    // basicamente usa el archivo que se arrastra al input file
    // para despues adjudicar ese mismo nombre a todos los .nombreArchivo del html
    // para que asi cada formulario tenga el nombre del archivo para enviarlo a php sin importar a que formulario le des
    // sin esto el archivo php ejecuta la ruta sin el nombre - Ejemplo: D:\Stuff\Desktop\b\awemer\download\
    archivoVideo = event.target.files[0];
    inputArchivo.forEach(element => {
        element.value = archivoVideo.name;
    });

    // muestra el nombre del archivo
    containerFileName.innerHTML = archivoVideo.name;

    // todo lo de abajo para para que aparezca el video
    let videoExistente = document.getElementById('video');
    // si hay un video existente lo elimina
    if (videoExistente) {
        videoExistente.parentNode.removeChild(videoExistente);
    }

    // crea un objeto URL para el video
    let url = URL.createObjectURL(archivoVideo);
    video = document.createElement('video');
    video.setAttribute("id", "video");

    // El método URL.createObjectURL es necesario para crear una URL temporal que el navegador
    // puede usar para acceder al contenido del archivo, sin el no puedes asignar directamente
    // un objeto File o Blob al atributo src de un elemento <video>
    video.src = url;
    video.controls = true;
    casillaV.style.display = 'block';
    casillaV.appendChild(video);
    video.addEventListener('loadedmetadata', obtenerResolucion);
});

// carga la ruta de las cookies
// y con el addEventListener tambien cada vez que cambias la ruta en el cuadro de texto
// actualiza los input escondidos con el valor de la ruta en cada formulario para enviarlo a php, similar a lo de arriba
ruta.addEventListener('change', function () {
    caminito.forEach(element => {
        element.value = ruta.value;
    });
    document.cookie = `ruta=${ruta.value}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/`;
});

// muestra la rueda de carga
loader.forEach(element => {
    element.addEventListener('click', function () {
        video.pause();
        document.querySelector('.cargando-contenedor').style.display = 'block';
        // let audio = document.getElementById("audio");
        // audio.play();
    });
});

botonCookies.addEventListener('click', function () {
    document.cookie = `ruta=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    ruta.value = "D:\\Stuff\\Desktop\\b\\awemer\\download";
    caminito.forEach(element => {
        element.value = "D:\\Stuff\\Desktop\\b\\awemer\\download";
    });
});

function cargarDesdeCookies() {
    let cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let [name, value] = cookie.trim().split('=');
        if (name === 'ruta') {
            document.getElementById('ruta').value = value;
            caminito.forEach(element => {
                element.value = value;
            });
        }
    }
}
document.addEventListener('DOMContentLoaded', cargarDesdeCookies);
