import { casillaResolucionW, casillaResolucionH, width, height } from './escalar.js';
const giro = document.getElementById('giro');
const giroMitad = document.getElementById('giroMitad');
const resolucionHGiro = document.getElementById('resolucionHGiro');
const resolucionWGiro = document.getElementById('resolucionWGiro');

giro.addEventListener('change', function () {
    let valorSeleccionado = giro.value;
    switch (valorSeleccionado) {
        case "0":
            video.style.transform = "rotate(90deg) scaleX(-1)";
            break;
        case "1":
            video.style.transform = "rotate(90deg)";
            break;
        case "2":
            video.style.transform = "rotate(-90deg)";
            break;
        case "3":
            video.style.transform = "rotate(-90deg) scaleX(-1)";
            break;
        default:
            video.style.transform = "none";
            break;
    }
});

giroMitad.addEventListener('change', function () {
    if (this.checked) {
        // casilla.textContent = `${width / 2}:${height / 2}`;
        casillaResolucionW.value = width / 2;
        casillaResolucionH.value = height / 2;
        resolucionHGiro.value = height / 2;
        resolucionWGiro.value = width / 2;
    } else {
        // casilla.textContent = `${width}:${height}`;
        casillaResolucionW.value = width;
        casillaResolucionH.value = height;
        resolucionHGiro.value = height;
        resolucionWGiro.value = width;
    }
});