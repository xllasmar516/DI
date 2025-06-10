<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$eventoid = $_GET['eventoid'];

// SQL
//preguntar a carlos si aqui debo hacer una consulta multitabla o no
$sql = "SELECT e.* FROM eventos e 
WHERE e.evento_id = $eventoid;";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el evento", $conexion);
}