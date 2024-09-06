import { video } from './general.js';
const casillaTiempo = document.getElementById('tiempo');
const interruptorTiempo = document.getElementById('interruptorLongitudMitad');

export function tiempo() {
    let duracionSegundos = video.duration;
    // if (duracionSegundos % 2 !== 0) {
    //     duracionSegundos -= 1;
    // }
    const minutos = Math.floor(duracionSegundos / 60);
    const segundos = (duracionSegundos % 60).toFixed(0);

    if (minutos > 0) {
        casillaTiempo.value = `${minutos}:${segundos}`;
    } else {
        casillaTiempo.value = `${segundos}`;
    }

    interruptorTiempo.addEventListener('change', function () {
        const duracionSegundosEntreDos = duracionSegundos / 2;
        const minutos2 = Math.floor(duracionSegundosEntreDos / 60);
        const segundos2 = (duracionSegundosEntreDos % 60).toFixed(0);

        if (this.checked) {
            if (minutos > 0) {
                casillaTiempo.value = `${minutos2}:${segundos2}`;
            } else {
                casillaTiempo.value = `${segundos2}`;
            }
        } else {
            if (minutos > 0) {
                casillaTiempo.value = `${minutos}:${segundos}`;
            } else {
                casillaTiempo.value = `${segundos}`;
            }
        }
    });
}