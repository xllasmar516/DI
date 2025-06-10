-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 24-04-2025 a las 06:51:37
-- Versión del servidor: 8.0.40
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eventos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

DROP TABLE IF EXISTS `eventos`;
CREATE TABLE `eventos` (
  `evento_id` int NOT NULL,
  `evento_nombre` varchar(255) NOT NULL,
  `evento_descripcion` text,
  `evento_imagen` varchar(255) DEFAULT NULL,
  `evento_fecha` datetime NOT NULL,
  `evento_localizacion` varchar(255) NOT NULL,
  `evento_organizador` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`evento_id`, `evento_nombre`, `evento_descripcion`, `evento_imagen`, `evento_fecha`, `evento_localizacion`, `evento_organizador`) VALUES
(1, 'Conferencia sobre Transformación Digital', 'Charlas sobre la digitalización en empresas y su impacto', 'https://www.sonimalaga.com/wp-content/uploads/2023/11/trabajador-oficina-que-usa-videoconferencia-reunirse-gente-negocios-camara-web-hablando-colegas-videoconferencia-remota-tener-conversacion-internet-llamada-teleconferencia-1-1170x620.jpg', '2025-06-15 00:00:00', 'Centro de Convenciones', 'Tech Conferences Inc.'),
(2, 'Foro de Liderazgo Empresarial', 'Encuentro con expertos en liderazgo y gestión empresarial', 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2019/07/origen-nombres-informatica-nunca-hubieras-imaginado_2.jpg?tf=3840x', '2025-04-20 00:00:00', 'Hotel Internacional', 'Business Leaders Association'),
(3, 'Cumbre de Innovación y Emprendimiento', 'Discusión sobre tendencias innovadoras en startups', 'https://media.istockphoto.com/id/1479759169/es/foto/ciencia-de-datos-y-tecnolog%C3%ADa-de-big-data-computaci%C3%B3n-de-cient%C3%ADficos-de-datos-analizando-y.jpg?s=612x612&w=0&k=20&c=0nuQgMwj_J6mxrSOHZPYiVLCDILieRgDnPALBO6aDSY=', '2025-07-10 00:00:00', 'Universidad Nacional', 'Innovators Hub'),
(4, 'Seminario de Marketing Digital', 'Estrategias modernas para el marketing en línea', 'https://revistaseguridad360.com/wp-content/uploads/2022/11/red-informatica.jpg', '2025-05-30 00:00:00', 'Centro de Exposiciones', 'Digital Marketers'),
(5, 'Congreso de Inteligencia Artificial', 'Impacto de la IA en el mundo empresarial', 'https://cdn.pixabay.com/photo/2015/03/30/12/42/network-698598_1280.jpg', '2025-09-05 00:00:00', 'Auditorio Tecnológico', 'AI Experts'),
(6, 'Jornada de Recursos Humanos', 'Mejores prácticas en la gestión de talento', 'https://www.galdon.com/wp-content/uploads/2013/05/profesion-informatica-galdon-software-1024x576.jpg', '2025-08-12 00:00:00', 'Salón Empresarial', 'HR Professionals'),
(7, 'Foro sobre Ciberseguridad', 'Retos y soluciones en seguridad informática', 'https://intecssa.com/wp-content/uploads/2023/04/%C2%BFQue-se-protege-en-seguridad-informatica.jpg', '2025-06-25 00:00:00', 'Centro de Negocios', 'CyberSafe Corp.'),
(8, 'Simposio de Finanzas y Economía', 'Análisis de las tendencias económicas globales', 'https://www.orbit.es/wp-content/uploads/2019/09/redes-cloud.jpg', '2025-07-18 00:00:00', 'Sala Financiera', 'Finance Experts'),
(9, 'Congreso de E-commerce', 'Estrategias para el comercio en línea', 'https://cdn.euroinnova.edu.es/img/subidasEditor/dise%C3%B1o%20sin%20t%C3%ADtulo%20-%202021-10-29t104425-1635933817.872', '2025-06-10 00:00:00', 'Centro Tecnológico', 'E-commerce Leaders'),
(10, 'Taller de Habilidades de Negociación', 'Técnicas efectivas para negociaciones exitosas', 'https://incuatro.com/wp-content/uploads/2019/06/redes-informaticas-definicion.jpg', '2025-05-15 00:00:00', 'Hotel Empresarial', 'Business Coaches');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participantes`
--

DROP TABLE IF EXISTS `participantes`;
CREATE TABLE `participantes` (
  `participante_id` int NOT NULL,
  `participante_nombre` varchar(255) NOT NULL,
  `participante_email` varchar(255) NOT NULL,
  `evento_id` int NOT NULL,
  `inscripcion_estado` enum('Pendiente','Confirmado','Cancelado') DEFAULT 'Pendiente',
  `numero_acompanantes` int DEFAULT '0',
  `inscripcion_fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `participantes`
--

INSERT INTO `participantes` (`participante_id`, `participante_nombre`, `participante_email`, `evento_id`, `inscripcion_estado`, `numero_acompanantes`, `inscripcion_fecha`) VALUES
(1, 'Juan Pérez', 'juan.perez@email.com', 1, 'Confirmado', 2, '2025-01-30 08:06:48'),
(2, 'María González', 'maria.gonzalez@email.com', 1, 'Confirmado', 1, '2025-01-30 08:06:48'),
(3, 'Carlos López', 'carlos.lopez@email.com', 2, 'Confirmado', 0, '2025-01-30 08:06:48'),
(4, 'Ana Ramírez', 'ana.ramirez@email.com', 2, 'Cancelado', 3, '2025-01-30 08:06:48'),
(5, 'Pedro Sánchez', 'pedro.sanchez@email.com', 6, 'Pendiente', 0, '2025-01-30 08:06:48'),
(6, 'Laura Torres', 'laura.torres@email.com', 3, 'Confirmado', 2, '2025-01-30 08:06:48'),
(7, 'José Fernández', 'jose.fernandez@email.com', 4, 'Confirmado', 1, '2025-01-30 08:06:48'),
(8, 'Sofía Castro', 'sofia.castro@email.com', 5, 'Pendiente', 0, '2025-01-30 08:06:48'),
(9, 'Diego Herrera', 'diego.herrera@email.com', 6, 'Cancelado', 4, '2025-01-30 08:06:48'),
(10, 'Elena Ruiz', 'elena.ruiz@email.com', 7, 'Confirmado', 1, '2025-01-30 08:06:48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`evento_id`);

--
-- Indices de la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`participante_id`),
  ADD KEY `evento_id` (`evento_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `evento_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `participantes`
--
ALTER TABLE `participantes`
  MODIFY `participante_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `participantes_ibfk_1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`evento_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
