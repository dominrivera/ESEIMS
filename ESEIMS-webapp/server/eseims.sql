DROP DATABASE IF EXISTS eseims;

CREATE DATABASE eseims;

/*CREATE USER 'eseimsuser'@'localhost' IDENTIFIED BY 'eseimspass';*/

GRANT ALL PRIVILEGES ON eseims.* TO 'admin' IDENTIFIED BY 'admin';

USE eseims;

-- -----------------------------------------------------
-- Table USERS OBLIGATORIO email @esei.uvigo.es
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `name` VARCHAR(50) NOT NULL,
    `surname` VARCHAR(50) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `dni` VARCHAR(12) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `role` ENUM ('admin', 'user') NOT NULL,
    `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `modified` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table TICKETS
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tickets`;

CREATE TABLE IF NOT EXISTS `tickets` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `short_description` VARCHAR(40) NOT NULL,
    `description` VARCHAR(256) NOT NULL,
    `status` ENUM ('assigned', 'in progress', 'closed') NOT NULL,
    `assignment` VARCHAR(40) NOT NULL,
    `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `modified` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- INSERTS `USERS`
-- -----------------------------------------------------

INSERT INTO `users` (`id`, `username`, `name`, `surname`, `dni`, `email`, `password`, `role`, `created`, `modified`) VALUES
('1', 'jbgarcia', 'Juan', 'Blanco Garcia', '87654321A', 'jbgarcia@esei.uvigo.es', '345623445ASFghtrBvV4344344',  'admin', NOW(), NOW()),
('2', 'dprodriguez', 'David', 'Perez Rodriguez', '12345678A', 'dprodriguez@esei.uvigo.es', '1243513245FGETRGeferg43',  'user', NOW(), NOW());

-- -----------------------------------------------------
-- INSERTS `TICKETS`
-- -----------------------------------------------------

INSERT INTO `tickets` (`id`, `short_description`, `description`, `status`, `assignment`, `created`, `modified`) VALUES
('1', 'PC bloqueado', 'el PC numero 2 del aula 31 esta bloqueado en la pantaall de inicio', 'assigned', '', NOW(), NOW()),
('2', 'PC poco brillo de pantalla', 'la pantalla del pc 3 del aula 33 parece que esta apagada y el boton para subir el brillo no funciona', 'in progress', 'Juan Perez', NOW(), NOW()),
('3', 'PC no responde', 'el PC numero 6 del aula 12 no enciende', 'assigned', 'empty', NOW(), NOW());
