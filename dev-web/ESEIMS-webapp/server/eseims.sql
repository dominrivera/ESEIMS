-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-02-2020 a las 21:10:27
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

USE eseims;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eseims`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(32) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table USERS';

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `dni`, `password`, `email`, `role`, `created`) VALUES
(1, 'Admin', 'Default', '66391711A', '$2b$10$jofbTlMQgr1iDc78U5pdx.jiedrOtUxgNMWM8P3sI9Yg2J5S8Gfnm', 'admin@esei.uvigo.es', 'admin', '2020-02-06 21:00:57'),
(2, 'User', 'Default', '05382011B', '$2b$10$iNXn1NF3chEULcm0S2uSseyYqHCSAvXI71H6S6H8kJWjZ68JoACQO', 'user@esei.uvigo.es', 'user', '2020-02-06 21:00:57'),
(3, 'Pedro', 'Dominguez Lopez', '26185206M', '$2a$10$L2BGq4IANF8.Cfqtfi5pSOjGhyStTaS8A59yvFuLbM8yCul2daMIi', 'pdl@esei.uvigo.es', 'user', '2020-04-13 13:08:47'),
(4, 'Juan Pedro', 'Gomez Gomez', '93075242S', '$2a$10$ZQXUT9xbFlXpHPDbSWgnm.6iKQ7igFMBQFCodo2c4yS7wAzVVkTB6', 'jpgg@esei.uvigo.es', 'user', '2020-04-13 13:55:15'),
(5, 'Iago', 'Sanchez Garcia', '62366302P', '$2a$10$hM7F2zXvrFh1dvCMvsrwR.RbFSyUeqwc5jDpz2PSWm9pWTU98Jhr2', 'isg@esei.uvigo.es', 'user', '2020-04-13 13:56:03'),
(6, 'Xoan', 'Barros Mendez', '01535651X', '$2a$10$nOP8jGklq01sBTmHQ4CrDebuhtjYdC/OqVSd0vtzuk8n1tpz8ayvy', 'xbr@esei.uvigo.es', 'user', '2020-04-13 14:02:22'),
(7, 'Diego', 'Rodriguez Perez', '45671686B', '$2a$10$ydCV0oM7TkUbELNA/YPvPu/nRV7Y2pvWkSoBhyxsVG9StSMKo392m', 'drp@esei.uvigo.es', 'user', '2020-04-13 14:27:55'),
(8, 'Domingo', 'Rivera Barros', '35579657Z', '$2a$10$q4YyYcuYMi6O90uekHaDUOL1YvNWjq6xNHfNFTJC/lf7Thb8YUFCG', 'drb@esei.uvigo.es', 'admin', '2020-04-13 14:28:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(400) NOT NULL,
  `status` enum('open','in progress','closed') NOT NULL,
  `assignment` varchar(40),
  `creator` varchar(100) NOT NULL,
  `creatorId` int NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY (`creatorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table TICKETS';

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `status`, `assignment`, `creator`, `creatorId`, `created`, `modified`) VALUES
(1, 'PC 3 infraestructura falla', 'Hola, al encender el PC, este entra en bucle al cargar el SO.', 'in progress', 'Domingo Rivera Barros', 'Pedro Dominguez Lopez', 3, '2020-02-13 14:58:43', '2020-02-14 15:26:33'),
(2, 'PC 6 aula SO7 no arranca', 'Hola, al darle al boton de encender, el pc no arranca.', 'in progress', 'Domingo Rivera Barros', 'Xoan Barros Mendez', 6, '2020-02-14 21:00:23', '2020-02-16 11:00:23'),
(3, 'No veo las graficas en la web de ESEIMS', 'Hola, cuando le doy a la seccion de graficas, aparece un 404.', 'in progress', 'Nicolas Rey Ruiz', 'Juan Pedro Gomez Gomez', 4, '2020-03-06 13:00:57', '2020-03-08 21:00:57'),
(4, 'Monitor no funciona', 'Hola, el monitor del PC 4 del aula 3 no funciona. Podriais revisarlo?', 'closed', 'Nicolas Rey Ruiz', 'Juan Pedro Gomez Gomez', 4, '2020-03-17 11:00:57', '2020-03-19 10:00:07'),
(5, 'Error de red PC 14 aula 25', 'Hola, el PC 14 no tiene conexion a internet, un saludo.', 'open', '', 'Pedro Dominguez Lopez', 3, '2020-04-06 21:00:57', '2020-04-06 21:00:57'),
(6, 'Teclado sin teclas PC 10 aula SO3', 'Hola, al teclado del PC10 le faltan teclas. Un saludo.', 'open', '', 'Iago Sanchez Garcia', 5, '2020-04-06 21:00:57', '2020-04-06 21:00:57'),
(7, 'PC1 de libre acceso no arranca', 'Hola, el PC1 de libre acceso no arranca al darle al boton, podeis revisarlo? Gracias de antemano.', 'open', '', 'Diego Rodriguez Perez', 7, '2020-04-06 21:00:57', '2020-04-06 21:00:57'),
(8, 'Error login PC3 aula 2', 'Hola, no puedo acceder a mi cuenta en el PC3 pero si pruebo en otro si que puedo.', 'open', '', 'Iago Sanchez Garcia', 5, '2020-04-06 21:00:57', '2020-04-06 21:00:57'),
(9, 'Acceso graficas ESEIMS', 'Hola, no tengo acceso a las graficas de ESEIMS, podriais revisarlo? Saludos', 'open', '', 'Iago Sanchez Garcia', 5, '2020-04-06 21:00:57', '2020-04-06 21:00:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

DROP TABLE IF EXISTS `comments`;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticketId` int NOT NULL,
  `message` varchar(400) NOT NULL,
  `creator` varchar(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY (`ticketId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table COMMENTS';

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `ticketId`, `message`, `creator`, `created`) VALUES
(1, 1, 'Hola, estoy revisandolo.', 'Domingo Rivera Barros', '2020-02-14 15:26:33'),
(2, 2, 'Hola, voy a revisarlo, cuando sepa algo te aviso. Un saludo', 'Domingo Rivera Barros', '2020-02-16 11:00:23'),
(3, 3, 'Hola, voy a revisar tu cuenta.Saludos.', 'Nicolas Rey Ruiz', '2020-03-08 21:00:57'),
(4, 4, 'Hola, he reemplazado el monitor. Cierro el ticket. Saludos.', 'Nicolas Rey Ruiz', '2020-03-19 10:00:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alarms`
--

DROP TABLE IF EXISTS `alarms`;

CREATE TABLE IF NOT EXISTS `alarms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `level` enum('WARNING', 'CRITICAL') NOT NULL,
  `value` float NOT NULL,
  `host` varchar(30) NOT NULL,
  `laboratory` varchar(10) NOT NULL,
  `status` enum('open','in progress','closed') NOT NULL,
  `assignment` varchar(40),
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table ALARMS';

	  --
-- Volcado de datos para la tabla `alarms`
--

INSERT INTO `alarms` (`id`, `type`, `level`, `value`, `host`, `laboratory`, `status`, `assignment`, `created`, `modified`) VALUES
(1, 'cpu_usage_high', 'WARNING', '85', '192.168.0.33', '31', 'open', '', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(2, 'load_high', 'WARNING', '3', '192.168.0.31', 'SO8', 'in progress', 'Domingo Rivera Barros', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(3, 'memory_usage_high', 'CRITICAL', '92', '192.168.0.31', '33', 'open', '', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(4, 'load_high', 'CRITICAL', '6', '192.168.0.1', 'SO5', 'open', '', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(5, 'disk_usage_high', 'WARNING', '85', '192.168.0.43', 'SO2', 'open', '', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(6, 'disk_usage_high', 'CRITICAL', '94', '192.168.0.3', 'SO4', 'open', '', '2020-02-06 20:59:10', '2020-02-06 21:59:10'),
(7, 'disk_usage_high', 'CRITICAL', '96', '192.168.0.20', '31', 'closed', 'Domingo Rivera Barros', '2020-02-06 20:59:10', '2020-02-06 21:59:10');
