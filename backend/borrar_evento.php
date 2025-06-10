<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$eventoid = $_POST['eventoid'];

// SQL
$sql = "DELETE FROM eventos WHERE evento_id = $eventoid;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);