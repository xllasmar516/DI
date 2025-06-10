<?php
require_once('config.php');
$conexion = obtenerConexion();

$fecha = $_GET['fecha'];


// SQL
$sql = "SELECT e.* FROM eventos e WHERE e.evento_fecha = '$fecha';";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);