import { video } from './general.js';
import { tiempo } from './cortar.js';
export const casillaResolucionW = document.getElementById('resolucionW');
export const casillaResolucionH = document.getElementById('resolucionH');
export let width;
export let height;
const interruptorM = document.getElementById('interruptorMitad');
const interruptorD = document.getElementById('interruptorDoble');

export function obtenerResolucion() {
    width = video.videoWidth;
    height = video.videoHeight;

    tiempo();
    // casilla.textContent = `${width}:${height}`;
    casillaResolucionW.value = width;
    casillaResolucionH.value = height;

    interruptorM.addEventListener('change', function () {
        if (this.checked) {
            // casilla.textContent = `${width / 2}:${height / 2}`;
            casillaResolucionW.value = width / 2;
            casillaResolucionH.value = height / 2;
        } else {
            // casilla.textContent = `${width}:${height}`;
            casillaResolucionW.value = width;
            casillaResolucionH.value = height;
        }
    });

    interruptorD.addEventListener('change', function () {
        if (this.checked) {
            // casilla.textContent = `${width * 2}:${height * 2}`;
            casillaResolucionW.value = width * 2;
            casillaResolucionH.value = height * 2;
        } else {
            // casilla.textContent = `${width}:${height}`;
            casillaResolucionW.value = width;
            casillaResolucionH.value = height;
        }
    });

}