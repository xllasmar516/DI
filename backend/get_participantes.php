<?php
require_once('config.php');
$conexion = obtenerConexion();

// No hay datos de entrada

// SQL
$sql = "SELECT p.*, e.evento_nombre AS evento FROM participantes p INNER JOIN eventos e ON p.evento_id = e.evento_id;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

// parámetros: $datos, $ok, $mensaje, $conexion
responder($datos, true, "Datos recuperados", $conexion);