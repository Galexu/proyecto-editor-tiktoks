// import { archivoVideo } from './general.js';
const containerFileName = document.querySelector('.container-file-name');
const fileNameEditor = document.querySelector('.file-name-editor');
const fileNameEditorInput = document.querySelector('.file-name-editor input');
const nombreArchivoNuevo = document.querySelectorAll('.nombreArchivoNuevo');

containerFileName.addEventListener('click', function () {
    // fileNameEditor.textContent = containerFileName.textContent;
    fileNameEditor.style.display = 'block';
    fileNameEditorInput.value = containerFileName.textContent;
    fileNameEditorInput.focus();
    // selecciona donde poner el cursor en el texto
    fileNameEditorInput.setSelectionRange(0, 0);
});

fileNameEditorInput.addEventListener('blur', function () {
    fileNameEditor.style.display = 'none';
    containerFileName.textContent = fileNameEditorInput.value;

    nombreArchivoNuevo.forEach(element => {
        element.value = fileNameEditorInput.value;
    });
});

fileNameEditorInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        fileNameEditor.style.display = 'none';
        containerFileName.textContent = fileNameEditorInput.value;

        nombreArchivoNuevo.forEach(element => {
            element.value = fileNameEditorInput.value;
        });
    } 
});
