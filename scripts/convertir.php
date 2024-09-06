<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $archivo = $_POST["nombreArchivo"];

    // si el nombre del archivo nuevo no se ha especificado, se usa el mismo nombre del archivo original
    $archivoNuevo =  $_POST["nombreArchivoNuevo"] != "" ? $_POST["nombreArchivoNuevo"] : $archivo;

    // mejor usar pathinfo para obtener el nombre del archivo sin extension 
    // ya que el nombre del archivo puede diferentes caracteres
    // $nombreArchivoSinExtension = substr($archivoNuevo, 0, -4);

    // usa pathinfo para obtener la extension del archivos
    // y el nombre del archivo sin extension
    $pathInfo = pathinfo($archivoNuevo);
    $nombreArchivoSinExtension = $pathInfo['filename'];
    $extensionArchivo = "." . $pathInfo['extension'];

    $caminito = $_POST["caminito"];
    $archivoPrimerArg = '"' . $caminito . "\\" . $archivo . '"';

    // si el nombre del archivo nuevo es el mismo que archivo, se añade un 1 al final del nombre del archivo
    $anadirMasUno = $_POST["nombreArchivoNuevo"] != "" ? "" : "1";
    $archivoSegundoArg = '"' . $caminito . "\\" . $nombreArchivoSinExtension . $anadirMasUno;

    if (exec("ffmpeg -version")) { //si ffmpeg esta en el path global
        if (isset($_POST["escalar"]) and $_POST["escalar"] == "escalar") {
            $resolucionW = $_POST["resolucionW"];
            $resolucionH = $_POST["resolucionH"];

            // Asegurarse de que las dimensiones sean divisibles por 2
            // $resolucionW = (int)($resolucionW / 2) * 2;
            // $resolucionH = (int)($resolucionH / 2) * 2;
            // el codec libx264 de ffmpeg requiere que las dimensiones sean divisibles por 2
            if ($resolucionW % 2 != 0) {
                $resolucionW = $resolucionW + 1;
            }
            if ($resolucionH % 2 != 0) {
                $resolucionH = $resolucionH + 1;
            }

            // el 2>&1 del finald el comando es para que se muestren los errores en la salida
            $comandoEscalar = "ffmpeg -i " . $archivoPrimerArg . " -vf scale=" . $resolucionW . ":" . $resolucionH . " -c:a copy " . $archivoSegundoArg . $extensionArchivo .'" 2>&1';
            echo $comandoEscalar . "<br>";

            exec($comandoEscalar, $output, $returnCode);
            if ($returnCode === 0) {
                header("Location: ../index.html");
            } else {
                echo $comandoEscalar . "<br>";
                echo "Error al convertir el video.<br>";
                echo "<pre>" . htmlspecialchars(print_r($output, true)) . "</pre>";
            }
        } else if (isset($_POST["recortar"]) and $_POST["recortar"] == "recortar") {
            $corte1 = $_POST["slider1"];
            $corte2 = $_POST["slider2"];
            $comandoRecortar = "ffmpeg -i " . $archivoPrimerArg . ' -vf "crop=in_w:in_h-(in_h/' . $corte1 . ')*2:0:(in_h/' . $corte2 . ')" ' . $archivoSegundoArg . $extensionArchivo .'" 2>&1';

            exec($comandoRecortar, $output, $returnCode);
            if ($returnCode === 0) {
                header("Location: ../index.html");
            } else {
                echo $comandoRecortar . "<br>";
                echo "Error al convertir el video.<br>";
                echo "<pre>" . htmlspecialchars(print_r($output, true)) . "</pre>";
            }
        } else if (isset($_POST["rotar"]) and $_POST["rotar"] == "rotar") {
            $giroMitad = isset($_POST["giroMitad"]) ? true : false;
            $giro = $_POST["giro"];
            $resolucionWGiro = $_POST["resolucionWGiro"];
            $resolucionHGiro = $_POST["resolucionHGiro"];

            if ($resolucionWGiro % 2 != 0) {
                $resolucionWGiro = $resolucionWGiro + 1;
            }
            if ($resolucionHGiro % 2 != 0) {
                $resolucionHGiro = $resolucionHGiro + 1;
            }

            if ($giroMitad) {
                $comandoGiro = "ffmpeg -i " . $archivoPrimerArg . ' -vf "transpose=' . $giro . ',scale=' . $resolucionWGiro . ':' . $resolucionHGiro . '" -c:a copy ' . $archivoSegundoArg . $extensionArchivo .'" 2>&1';
            } else {
                $comandoGiro = "ffmpeg -i " . $archivoPrimerArg . ' -vf "transpose=' . $giro . '" ' . $archivoSegundoArg . $extensionArchivo .'" 2>&1';
            }

            exec($comandoGiro, $output, $returnCode);
            if ($returnCode === 0) {
                header("Location: ../index.html");
            } else {
                echo "w: " . $resolucionWGiro . " h: " . $resolucionHGiro . "<br>";
                echo $comandoGiro . "<br>";
                echo "Error al convertir el video.<br>";
                echo "<pre>" . htmlspecialchars(print_r($output, true)) . "</pre>";
            }
        } else if (isset($_POST["cortar"]) and $_POST["cortar"] == "cortar") {
            $tiempo = $_POST["tiempo"];

            $comandoCortar = "ffmpeg -i " . $archivoPrimerArg . ' -t ' . $tiempo . ' -c copy ' . $archivoSegundoArg . $extensionArchivo .'" 2>&1';
            exec($comandoCortar, $output, $returnCode);
            if ($returnCode === 0) {
                header("Location: ../index.html");
            } else {
                echo $comandoCortar . "<br>";
                echo "Error al convertir el video.<br>";
                echo "<pre>" . htmlspecialchars(print_r($output, true)) . "</pre>";
            }
        }
    } else {
        echo "FFmpeg no está instalado.";
    }
}
