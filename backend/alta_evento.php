<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$evento = json_decode($_POST['evento']);

$sql = "INSERT INTO eventos VALUES(null, '$evento->nombre' , '$evento->descripcion', '$evento->imagen', '$evento->fecha', '$evento->localizacion', '$evento->organizador'); ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta el evento", $conexion);
}
?>