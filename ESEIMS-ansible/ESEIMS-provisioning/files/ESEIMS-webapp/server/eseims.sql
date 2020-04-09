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
  `surname` varchar(32) NOT NULL,
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
(2, 'User', 'Default', '05382011B', '$2b$10$iNXn1NF3chEULcm0S2uSseyYqHCSAvXI71H6S6H8kJWjZ68JoACQO', 'user@esei.uvigo.es', 'user', '2020-02-06 21:00:57');
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `description` varchar(200) NOT NULL,
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
(1, 'PC bloqueado', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id condimentum purus. Cras efficitur dignissim ex, eget varius massa maximus ut. Duis et turpis dolor. Aliquam erat volutpat.', 'open', '', 'test creator', 2, '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(2, 'PC poco brillo de pantalla', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id condimentum purus. Cras efficitur dignissim ex, eget varius massa maximus ut. Duis et turpis dolor.', 'in progress', 'jperez', 'test creator', 2, '2020-02-06 21:00:23', '2020-02-06 21:00:23'),
(3, 'PC no responde', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id condimentum purus. Cras efficitur dignissim ex, eget varius massa maximus ut. Duis et turpis dolor.', 'closed', '', 'test creator', 1, '2020-02-06 21:00:57', '2020-02-06 21:00:57');

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
(1, 1, 'el PC numero 2 del aula 31 esta bloqueado en la pantaall de inicio', 'Javier Garcia', '2020-02-06 20:59:10'),
(2, 2, 'la pantalla del pc 3 del aula 33 parece que esta apagada y el boton para subir el brillo no funciona', 'Juan Martinez', '2020-02-06 21:00:23'),
(3, 2, 'Hola juan, voy a revisarlo', 'Pedro Perez', '2020-02-06 22:00:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alarms`
--

DROP TABLE IF EXISTS `alarms`;

CREATE TABLE IF NOT EXISTS `alarms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `level` enum('WARNING', 'CRITICAL') NOT NULL,
  `value` int NOT NULL,
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
(1, 'cpu_usage_high', 'WARNING', '85', '192.168.0.33', '31', 'open', 'Javier Garcia', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(2, 'load_high', 'CRITICAL', '6', '192.168.0.31', '33', 'in progress', 'Javier Garcia', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(3, 'disk_usage_high', 'CRITICAL', '96', '192.168.0.20', '31', 'closed', 'Javier Garcia', '2020-02-06 20:59:10', '2020-02-06 20:59:10');
