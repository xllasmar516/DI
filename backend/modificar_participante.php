<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$participante = json_decode($_POST['participante']);

//preguntar a carlos si la fecha la pongo asi
$sql = "UPDATE participantes
SET participante_nombre = '" . $participante->nombre . "', 
participante_email = '" .  $participante->email . "', 
evento_id = $participante->eventoid, 
inscripcion_estado = '" .  $participante->inscripcionEstado . "', 
numero_acompanantes = $participante->acompanantes
WHERE participante_id =  $participante->idparticipante ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el participante", $conexion);
}
?>