<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$evento = json_decode($_POST['evento']);

//preguntar a carlos si la fecha la pongo asi y que hago con la imagen
$sql = "UPDATE eventos
SET evento_nombre = '" . $evento->nombre . "', 
evento_descripcion = '" .  $evento->descripcion . "', 
evento_imagen = '" . $evento->imagen . "', 
evento_fecha = '" . $evento->fecha . "', 
evento_localizacion = '" .  $evento->localizacion . "', 
evento_organizador = '" . $evento->organizador  . "'
WHERE evento_id =  $evento->eventoid ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el evento", $conexion);
}
?>