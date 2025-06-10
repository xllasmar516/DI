<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idparticipante = $_POST['idparticipante'];

// SQL
$sql = "DELETE FROM participantes WHERE participante_id = $idparticipante;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);