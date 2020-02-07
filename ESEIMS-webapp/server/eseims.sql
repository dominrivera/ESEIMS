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
  `username` varchar(15) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table USERS';

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `dni`, `username`, `password`, `email`, `role`, `created`) VALUES
(1, 'Juan', 'Blanco Garcia', '87654321A', 'jbgarcia', '345623445ASFghtrBvV4344344', 'jbgarcia@esei.uvigo.es', 'admin', '2020-02-06 21:00:57'),
(2, 'David', 'Perez Rodriguez', '12345678A', 'dprodriguez', '1243513245FGETRGeferg43', 'dprodriguez@esei.uvigo.es', 'user', '2020-02-06 21:00:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `short_description` varchar(40) NOT NULL,
  `description` varchar(255) NOT NULL,
  `comment` varchar(255),
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

INSERT INTO `tickets` (`id`, `short_description`, `description`, `comment`, `status`, `assignment`, `creator`, `created`, `modified`) VALUES
(1, 'PC bloqueado', 'el PC numero 2 del aula 31 esta bloqueado en la pantaall de inicio', '', 'open', '', 'test creator', '2020-02-06 20:59:10', '2020-02-06 20:59:10'),
(2, 'PC poco brillo de pantalla', 'la pantalla del pc 3 del aula 33 parece que esta apagada y el boton para subir el brillo no funciona', '', 'in progress', 'jperez', 'test creator', '2020-02-06 21:00:23', '2020-02-06 21:00:23'),
(3, 'PC no responde', 'el PC numero 6 del aula 12 no enciende', '', 'closed', '', 'test creator', '2020-02-06 21:00:57', '2020-02-06 21:00:57');
