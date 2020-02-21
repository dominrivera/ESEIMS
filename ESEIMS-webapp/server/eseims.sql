-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-02-2020 a las 21:10:27
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

DROP DATABASE IF EXISTS eseims;

CREATE DATABASE eseims;

GRANT ALL PRIVILEGES ON eseims.* TO 'admin' IDENTIFIED BY 'admin';

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
  `name` varchar(50) NOT NULL,
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
(1, 'Juan', 'Blanco Garcia', '87654321A', '345623445ASFghtrBvV4344344', 'jbgarcia@esei.uvigo.es', 'admin', '2020-02-06 21:00:57'),
(2, 'David', 'Perez Rodriguez', '12345678A', '1243513245FGETRGeferg43', 'dprodriguez@esei.uvigo.es', 'user', '2020-02-06 21:00:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `status` enum('open','in progress','closed') NOT NULL,
  `assignment` varchar(40),
  `creator` varchar(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table TICKETS';

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `status`, `assignment`, `creator`, `created`, `modified`) VALUES
(1, 'PC bloqueado', 'open', '', 'test creator', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(2, 'PC poco brillo de pantalla', 'in progress', 'jperez', 'test creator', '2020-02-06 21:00:23', '2020-02-06 21:00:23'),
(3, 'PC no responde', 'closed', '', 'test creator', '2020-02-06 21:00:57', '2020-02-06 21:00:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

DROP TABLE IF EXISTS `comments`;

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `message` varchar(400) NOT NULL,
  `creator` varchar(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table COMMENTS';

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`id`, `ticket_id`, `message`, `creator`, `created`) VALUES
(1, 1, 'el PC numero 2 del aula 31 esta bloqueado en la pantaall de inicio', 'Javier Garcia', '2020-02-06 20:59:10'),
(2, 2, 'la pantalla del pc 3 del aula 33 parece que esta apagada y el boton para subir el brillo no funciona', 'Juan Martinez', '2020-02-06 21:00:23'),
(3, 2, 'Hola juan, voy a revisarlo', 'Pedro Perez', '2020-02-06 22:00:57');
