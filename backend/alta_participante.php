<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$participante = json_decode($_POST['participante']);

$sql = "INSERT INTO participantes VALUES(null, '$participante->nombre' , '$participante->email', $participante->eventoid, '$participante->inscripcionEstado', $participante->acompanantes, '$participante->inscripcionFecha'); ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta el participante", $conexion);
}
?>