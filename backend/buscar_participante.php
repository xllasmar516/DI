<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idparticipante = $_GET['idparticipante'];

// SQL
$sql = "SELECT p.*, e.evento_nombre AS evento FROM participantes p, eventos e 
WHERE p.evento_id = e.evento_id 
AND p.participante_id = $idparticipante;";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if($fila){ // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Datos recuperados", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el participante", $conexion);
}