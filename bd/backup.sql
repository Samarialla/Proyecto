-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda_detalle`
--

DROP TABLE IF EXISTS `agenda_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agenda_detalle` (
  `agenda_det_cod` int(11) NOT NULL AUTO_INCREMENT,
  `dias_dias_cod_1` int(11) NOT NULL,
  `agenda_medica_agend_cod_1` int(11) NOT NULL,
  `medico_medico_cod_1` int(11) NOT NULL,
  `especialidades_espec_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`agenda_det_cod`),
  KEY `fk_agenda_detalle_dias1_idx` (`dias_dias_cod_1`),
  KEY `fk_agenda_detalle_agenda_medica1_idx` (`agenda_medica_agend_cod_1`),
  KEY `fk_agenda_detalle_medico1_idx` (`medico_medico_cod_1`),
  KEY `fk_agenda_detalle_especialidades1_idx` (`especialidades_espec_cod_1`),
  CONSTRAINT `fk_agenda_detalle_agenda_medica1` FOREIGN KEY (`agenda_medica_agend_cod_1`) REFERENCES `agenda_medica` (`agend_cod_1`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_agenda_detalle_dias1` FOREIGN KEY (`dias_dias_cod_1`) REFERENCES `dias` (`dias_cod_1`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_agenda_detalle_especialidades1` FOREIGN KEY (`especialidades_espec_cod_1`) REFERENCES `especialidades` (`espec_cod_1`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_agenda_detalle_medico1` FOREIGN KEY (`medico_medico_cod_1`) REFERENCES `medico` (`medico_cod_1`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_detalle`
--

LOCK TABLES `agenda_detalle` WRITE;
/*!40000 ALTER TABLE `agenda_detalle` DISABLE KEYS */;
INSERT INTO `agenda_detalle` VALUES (24,3,25,1,1),(26,2,26,1,1);
/*!40000 ALTER TABLE `agenda_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agenda_medica`
--

DROP TABLE IF EXISTS `agenda_medica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agenda_medica` (
  `agend_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `cupo` int(11) NOT NULL,
  `agen_hora_final` time NOT NULL,
  `agenda_observ` varchar(100) DEFAULT NULL,
  `agenda_hora_inicio` time NOT NULL,
  `agent_medi_estado` enum('Activo','Anulado') NOT NULL,
  `agenda_modificacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `users_id` int(11) NOT NULL,
  `datos` varchar(255) DEFAULT NULL,
  `medico_medico_cod_1` int(11) NOT NULL,
  `especialidades_espec_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`agend_cod_1`),
  KEY `fk_agenda_medica_users1_idx` (`users_id`),
  KEY `fk_agenda_medica_medico1_idx` (`medico_medico_cod_1`),
  KEY `fk_agenda_medica_especialidades1_idx` (`especialidades_espec_cod_1`),
  CONSTRAINT `fk_agenda_medica_especialidades1` FOREIGN KEY (`especialidades_espec_cod_1`) REFERENCES `especialidades` (`espec_cod_1`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_agenda_medica_medico1` FOREIGN KEY (`medico_medico_cod_1`) REFERENCES `medico` (`medico_cod_1`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_agenda_medica_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_medica`
--

LOCK TABLES `agenda_medica` WRITE;
/*!40000 ALTER TABLE `agenda_medica` DISABLE KEYS */;
INSERT INTO `agenda_medica` VALUES (25,2,'12:24:00','nada','12:24:00','Activo','2020-06-25 16:24:46',1,'[{\"value\":3,\"label\":\"MIERCOLES\"}]',1,1),(26,50,'12:38:00','nada','12:38:00','Activo','2020-06-25 16:38:18',1,'[{\"value\":2,\"label\":\"MARTES\"}]',1,1);
/*!40000 ALTER TABLE `agenda_medica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ajustes`
--

DROP TABLE IF EXISTS `ajustes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ajustes` (
  `cod_ajustes` int(11) NOT NULL AUTO_INCREMENT,
  `estado_ajuste` varchar(15) NOT NULL,
  `obs_ajustes` varchar(100) NOT NULL,
  `sucursal_cod` int(11) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `cod_motivo` int(11) NOT NULL,
  PRIMARY KEY (`cod_ajustes`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ajustes`
--

LOCK TABLES `ajustes` WRITE;
/*!40000 ALTER TABLE `ajustes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ajustes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apertura_caja`
--

DROP TABLE IF EXISTS `apertura_caja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apertura_caja` (
  `aper_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `aper_fecha` date NOT NULL,
  `aper_hora` time NOT NULL,
  `aper_monto` int(11) NOT NULL,
  `cierre_fecha` date NOT NULL,
  `cierre_hora` time NOT NULL,
  `cierre_monto` int(11) NOT NULL,
  `caja_cod` int(11) NOT NULL,
  `usuario_cod` int(11) NOT NULL,
  PRIMARY KEY (`aper_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apertura_caja`
--

LOCK TABLES `apertura_caja` WRITE;
/*!40000 ALTER TABLE `apertura_caja` DISABLE KEYS */;
/*!40000 ALTER TABLE `apertura_caja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `area_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `area_descr` varchar(40) NOT NULL,
  PRIMARY KEY (`area_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistencia` (
  `asis_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `hora_entra` datetime NOT NULL,
  `hora_salida` datetime NOT NULL,
  `medico_cod_3` int(11) NOT NULL,
  `fun_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`asis_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia`
--

LOCK TABLES `asistencia` WRITE;
/*!40000 ALTER TABLE `asistencia` DISABLE KEYS */;
/*!40000 ALTER TABLE `asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banco`
--

DROP TABLE IF EXISTS `banco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banco` (
  `banco_cod` int(11) NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(60) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `telefono` varchar(25) NOT NULL,
  PRIMARY KEY (`banco_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco`
--

LOCK TABLES `banco` WRITE;
/*!40000 ALTER TABLE `banco` DISABLE KEYS */;
/*!40000 ALTER TABLE `banco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caja`
--

DROP TABLE IF EXISTS `caja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caja` (
  `caja_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `caja_desc` varchar(25) NOT NULL,
  `caja_estad` varchar(5) NOT NULL,
  `ultima_factur` int(11) NOT NULL,
  PRIMARY KEY (`caja_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caja`
--

LOCK TABLES `caja` WRITE;
/*!40000 ALTER TABLE `caja` DISABLE KEYS */;
/*!40000 ALTER TABLE `caja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cargo` (
  `cargo_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `cargo_des` varchar(40) NOT NULL,
  PRIMARY KEY (`cargo_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
/*!40000 ALTER TABLE `cargo` DISABLE KEYS */;
/*!40000 ALTER TABLE `cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cobro_tarjet`
--

DROP TABLE IF EXISTS `cobro_tarjet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cobro_tarjet` (
  `tarjeta_cod_2` int(11) NOT NULL,
  `nro_tarje` int(11) NOT NULL,
  `nro_aut` int(11) NOT NULL,
  `impor_tarjeta` int(11) NOT NULL,
  PRIMARY KEY (`tarjeta_cod_2`,`nro_tarje`,`nro_aut`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cobro_tarjet`
--

LOCK TABLES `cobro_tarjet` WRITE;
/*!40000 ALTER TABLE `cobro_tarjet` DISABLE KEYS */;
/*!40000 ALTER TABLE `cobro_tarjet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cod_com`
--

DROP TABLE IF EXISTS `cod_com`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cod_com` (
  `cod_com` int(11) NOT NULL AUTO_INCREMENT,
  `num_fact_com` int(11) NOT NULL,
  `estado_com` varchar(15) NOT NULL,
  `fecha_com` date NOT NULL,
  `tipo_pago_cod` int(11) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `cod_prov` int(11) NOT NULL,
  `sucursal_cod` int(11) NOT NULL,
  PRIMARY KEY (`cod_com`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cod_com`
--

LOCK TABLES `cod_com` WRITE;
/*!40000 ALTER TABLE `cod_com` DISABLE KEYS */;
/*!40000 ALTER TABLE `cod_com` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulta`
--

DROP TABLE IF EXISTS `consulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consulta` (
  `cons_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `cons_descrip` varchar(250) NOT NULL,
  `talla` decimal(10,0) NOT NULL,
  `peso` decimal(10,0) NOT NULL,
  `temperatura` decimal(10,0) NOT NULL,
  `fecha_consulta` date NOT NULL,
  `turno_turno_cod` int(11) NOT NULL,
  PRIMARY KEY (`cons_cod_1`),
  KEY `fk_consulta_turno1_idx` (`turno_turno_cod`),
  CONSTRAINT `fk_consulta_turno1` FOREIGN KEY (`turno_turno_cod`) REFERENCES `turno` (`turno_cod`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulta`
--

LOCK TABLES `consulta` WRITE;
/*!40000 ALTER TABLE `consulta` DISABLE KEYS */;
/*!40000 ALTER TABLE `consulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentas_pagar`
--

DROP TABLE IF EXISTS `cuentas_pagar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuentas_pagar` (
  `cuentas_pagar_cod` int(11) NOT NULL AUTO_INCREMENT,
  `importe_pagar` int(11) NOT NULL,
  `fecha_venc` date NOT NULL,
  `estado` varchar(15) NOT NULL,
  `cod_com` int(11) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `nro_cuotas` int(11) NOT NULL,
  `compras_cod_com` int(11) NOT NULL,
  PRIMARY KEY (`cuentas_pagar_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas_pagar`
--

LOCK TABLES `cuentas_pagar` WRITE;
/*!40000 ALTER TABLE `cuentas_pagar` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuentas_pagar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposito`
--

DROP TABLE IF EXISTS `deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deposito` (
  `deposito_cod` int(11) NOT NULL,
  `desp_descri` varchar(45) NOT NULL,
  PRIMARY KEY (`deposito_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposito`
--

LOCK TABLES `deposito` WRITE;
/*!40000 ALTER TABLE `deposito` DISABLE KEYS */;
/*!40000 ALTER TABLE `deposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `det_fact`
--

DROP TABLE IF EXISTS `det_fact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `det_fact` (
  `factura_cod_2` int(11) NOT NULL,
  `servicios_cod_1` int(11) NOT NULL,
  `det_fact_cant` int(11) NOT NULL,
  `det_fact_precio` int(11) NOT NULL,
  `det_fact_exe` int(11) NOT NULL,
  `det_fact_grav5` int(11) NOT NULL,
  `det_fact_grav10` int(11) NOT NULL,
  PRIMARY KEY (`factura_cod_2`,`servicios_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `det_fact`
--

LOCK TABLES `det_fact` WRITE;
/*!40000 ALTER TABLE `det_fact` DISABLE KEYS */;
/*!40000 ALTER TABLE `det_fact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dias`
--

DROP TABLE IF EXISTS `dias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dias` (
  `dias_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `dias_descrip` varchar(15) NOT NULL,
  PRIMARY KEY (`dias_cod_1`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dias`
--

LOCK TABLES `dias` WRITE;
/*!40000 ALTER TABLE `dias` DISABLE KEYS */;
INSERT INTO `dias` VALUES (1,'LUNES'),(2,'MARTES'),(3,'MIERCOLES'),(4,'JUEVES'),(5,'VIERNES'),(6,'SABADO'),(7,'DOMINGO');
/*!40000 ALTER TABLE `dias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidades`
--

DROP TABLE IF EXISTS `especialidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `especialidades` (
  `espec_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `espec_descrip` varchar(40) NOT NULL,
  PRIMARY KEY (`espec_cod_1`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (1,'Pediatria'),(2,'Clinico');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factura` (
  `factura_cod_` int(11) NOT NULL AUTO_INCREMENT,
  `fact_nro` int(11) NOT NULL,
  `fact_fecha` date NOT NULL,
  `fact_estado` varchar(5) NOT NULL,
  `fact_iva5` int(11) NOT NULL,
  `fact_iva10` int(11) NOT NULL,
  `pac_cod` int(11) NOT NULL,
  `aper_cod_2` int(11) NOT NULL,
  `fun_cod_2` int(11) NOT NULL,
  `tipo_fac_cod` int(11) NOT NULL,
  `sucursal_cod` int(11) NOT NULL,
  PRIMARY KEY (`factura_cod_`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionario`
--

DROP TABLE IF EXISTS `funcionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `funcionario` (
  `fun_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `fun_nombre` varchar(40) NOT NULL,
  `fun_apellido` varchar(40) NOT NULL,
  `func_telef` varchar(20) NOT NULL,
  `fun_cedula` varchar(100) NOT NULL,
  `fun_direccion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fun_cod_1`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionario`
--

LOCK TABLES `funcionario` WRITE;
/*!40000 ALTER TABLE `funcionario` DISABLE KEYS */;
INSERT INTO `funcionario` VALUES (1,'sergio','4ea4','44964','4646456465400','4464'),(2,'Sergio','Ayala','6546547979','459667598','sin datos');
/*!40000 ALTER TABLE `funcionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iva_compra`
--

DROP TABLE IF EXISTS `iva_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iva_compra` (
  `cod_iva_com` int(11) NOT NULL AUTO_INCREMENT,
  `iva_compras` varchar(10) NOT NULL,
  `cod_com` int(11) NOT NULL,
  PRIMARY KEY (`cod_iva_com`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iva_compra`
--

LOCK TABLES `iva_compra` WRITE;
/*!40000 ALTER TABLE `iva_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `iva_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iva_venta`
--

DROP TABLE IF EXISTS `iva_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iva_venta` (
  `iva_venta_cod` int(11) NOT NULL AUTO_INCREMENT,
  `iva_venta` int(11) NOT NULL,
  `factura_cod_` int(11) NOT NULL,
  PRIMARY KEY (`iva_venta_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iva_venta`
--

LOCK TABLES `iva_venta` WRITE;
/*!40000 ALTER TABLE `iva_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `iva_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libro_compras`
--

DROP TABLE IF EXISTS `libro_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libro_compras` (
  `libro_com_det` int(11) NOT NULL AUTO_INCREMENT,
  `cod_com` int(11) NOT NULL,
  `cod_prov` int(11) NOT NULL,
  `tipo_nota_cod` int(11) NOT NULL,
  PRIMARY KEY (`libro_com_det`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libro_compras`
--

LOCK TABLES `libro_compras` WRITE;
/*!40000 ALTER TABLE `libro_compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `libro_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca_tarje`
--

DROP TABLE IF EXISTS `marca_tarje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca_tarje` (
  `marca_tarje_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `marca_tarje_descrip` varchar(50) NOT NULL,
  PRIMARY KEY (`marca_tarje_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca_tarje`
--

LOCK TABLES `marca_tarje` WRITE;
/*!40000 ALTER TABLE `marca_tarje` DISABLE KEYS */;
/*!40000 ALTER TABLE `marca_tarje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medico`
--

DROP TABLE IF EXISTS `medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medico` (
  `medico_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `medic_nombre` varchar(30) NOT NULL,
  `medic_apellido` varchar(40) NOT NULL,
  `medic_direcc` varchar(55) NOT NULL,
  `medic_telef` varchar(25) NOT NULL,
  `medic_ci` varchar(20) NOT NULL,
  PRIMARY KEY (`medico_cod_1`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medico`
--

LOCK TABLES `medico` WRITE;
/*!40000 ALTER TABLE `medico` DISABLE KEYS */;
INSERT INTO `medico` VALUES (1,'Sergo','Amarilla','prueb','454696','454546');
/*!40000 ALTER TABLE `medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mercaderia`
--

DROP TABLE IF EXISTS `mercaderia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mercaderia` (
  `mercaderia_cod` int(11) NOT NULL AUTO_INCREMENT,
  `merca_descr` varchar(50) NOT NULL,
  `merc_preciov` int(11) NOT NULL,
  `precioc` int(11) NOT NULL,
  `cod_prov` int(11) NOT NULL,
  PRIMARY KEY (`mercaderia_cod`,`cod_prov`),
  KEY `fk_mercaderia_proveedor1_idx` (`cod_prov`),
  CONSTRAINT `fk_mercaderia_proveedor1` FOREIGN KEY (`cod_prov`) REFERENCES `proveedor` (`cod_prov`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercaderia`
--

LOCK TABLES `mercaderia` WRITE;
/*!40000 ALTER TABLE `mercaderia` DISABLE KEYS */;
INSERT INTO `mercaderia` VALUES (2,'qwq',121,1212,2),(4,'asasD4',4546,4646,2);
/*!40000 ALTER TABLE `mercaderia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulos` (
  `modulos_cod` int(11) NOT NULL AUTO_INCREMENT,
  `modulo_nombre` varchar(45) DEFAULT NULL,
  `modulo_icono` varchar(45) DEFAULT NULL,
  `modulo_event_key` varchar(45) DEFAULT NULL,
  `modulo_descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`modulos_cod`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` VALUES (1,'Dasboard','fa fa-tachometer m-1','#Bienvenido','<Bienvenido />'),(2,'Clientes','fa far fa-user m-1','#Clientes','<Clientes />'),(3,'Agenda',' fa fa-address-card-o m-1','#Agenda','<Agenda/>');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos_usuarios`
--

DROP TABLE IF EXISTS `modulos_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulos_usuarios` (
  `users_id` int(11) NOT NULL,
  `modulos_modulos_cod` int(11) NOT NULL,
  PRIMARY KEY (`users_id`,`modulos_modulos_cod`),
  KEY `fk_users_has_modulos_modulos1_idx` (`modulos_modulos_cod`),
  KEY `fk_users_has_modulos_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_modulos_modulos1` FOREIGN KEY (`modulos_modulos_cod`) REFERENCES `modulos` (`modulos_cod`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_modulos_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos_usuarios`
--

LOCK TABLES `modulos_usuarios` WRITE;
/*!40000 ALTER TABLE `modulos_usuarios` DISABLE KEYS */;
INSERT INTO `modulos_usuarios` VALUES (1,1),(1,2),(1,3);
/*!40000 ALTER TABLE `modulos_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motivo_ajuste`
--

DROP TABLE IF EXISTS `motivo_ajuste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `motivo_ajuste` (
  `cod_motivo` int(11) NOT NULL AUTO_INCREMENT,
  `motivo_descr` varchar(100) NOT NULL,
  PRIMARY KEY (`cod_motivo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motivo_ajuste`
--

LOCK TABLES `motivo_ajuste` WRITE;
/*!40000 ALTER TABLE `motivo_ajuste` DISABLE KEYS */;
/*!40000 ALTER TABLE `motivo_ajuste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota_cred_deb_pago`
--

DROP TABLE IF EXISTS `nota_cred_deb_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nota_cred_deb_pago` (
  `nota_cred_deb_pag_cod` int(11) NOT NULL AUTO_INCREMENT,
  `pago_cod` int(11) NOT NULL,
  `concepto_pago` varchar(100) NOT NULL,
  `fecha_pag` date NOT NULL,
  `estado_pago` varchar(15) NOT NULL,
  PRIMARY KEY (`nota_cred_deb_pag_cod`,`pago_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_cred_deb_pago`
--

LOCK TABLES `nota_cred_deb_pago` WRITE;
/*!40000 ALTER TABLE `nota_cred_deb_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `nota_cred_deb_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota_cred_deb_prod`
--

DROP TABLE IF EXISTS `nota_cred_deb_prod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nota_cred_deb_prod` (
  `cod_nota_cred_prod` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `condicion` varchar(20) NOT NULL,
  `estado_nota_cred` varchar(15) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `sucursal_cod` int(11) NOT NULL,
  `tipo_nota_cod` int(11) NOT NULL,
  `factura_cod_` int(11) NOT NULL,
  PRIMARY KEY (`cod_nota_cred_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_cred_deb_prod`
--

LOCK TABLES `nota_cred_deb_prod` WRITE;
/*!40000 ALTER TABLE `nota_cred_deb_prod` DISABLE KEYS */;
/*!40000 ALTER TABLE `nota_cred_deb_prod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_compras`
--

DROP TABLE IF EXISTS `orden_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orden_compras` (
  `orden_cod` int(11) NOT NULL AUTO_INCREMENT,
  `fechaorden` date NOT NULL,
  `estado_orden` varchar(45) NOT NULL,
  `cod_prov` int(11) NOT NULL,
  `cod_pedido` int(11) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `sucursal_cod` int(11) NOT NULL,
  `pedido_cod_pedido` int(11) NOT NULL,
  PRIMARY KEY (`orden_cod`),
  KEY `fk_orden_compras_pedido1_idx` (`pedido_cod_pedido`),
  CONSTRAINT `fk_orden_compras_pedido1` FOREIGN KEY (`pedido_cod_pedido`) REFERENCES `pedido` (`cod_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_compras`
--

LOCK TABLES `orden_compras` WRITE;
/*!40000 ALTER TABLE `orden_compras` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordenes` (
  `ordenes_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `ordenes_descrip` varchar(100) NOT NULL,
  `fecha_orden` date NOT NULL,
  `estado_orden` varchar(15) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `espec_cod_1` int(11) NOT NULL,
  `medico_cod_1` int(11) NOT NULL,
  `pac_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`ordenes_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paciente` (
  `pac_cod` int(11) NOT NULL AUTO_INCREMENT,
  `pac_ci` int(11) NOT NULL,
  `pac_apellido` varchar(30) NOT NULL,
  `pac_nombre` varchar(30) NOT NULL,
  `pac_fech_nac` date NOT NULL,
  `pac_direccion` varchar(60) NOT NULL,
  `pac_telef` varchar(20) NOT NULL,
  `pac_ocupacion` varchar(40) NOT NULL,
  PRIMARY KEY (`pac_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pago` (
  `pago_cod` int(11) NOT NULL AUTO_INCREMENT,
  `cod_nota_cred_prod` int(11) NOT NULL,
  `fech_pago` date NOT NULL,
  `fecha` date NOT NULL,
  `estado_pago` varchar(15) NOT NULL,
  `importe_pago` int(11) NOT NULL,
  `sucursal_cod` int(11) NOT NULL,
  `aper_cod_1` int(11) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `caja_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`pago_cod`,`cod_nota_cred_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago_cheque`
--

DROP TABLE IF EXISTS `pago_cheque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pago_cheque` (
  `pago_cheq_cod_1` int(11) NOT NULL,
  `pago_cod` int(11) NOT NULL,
  `cod_nota_cred_prod` int(11) NOT NULL,
  `monto_cheque` int(11) NOT NULL,
  `fecha_emision` date NOT NULL,
  `fecha_ven` date NOT NULL,
  `nro_cheque` int(11) NOT NULL,
  `titular_cod` int(11) NOT NULL,
  `banco_cod` int(11) NOT NULL,
  PRIMARY KEY (`pago_cheq_cod_1`,`pago_cod`,`cod_nota_cred_prod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago_cheque`
--

LOCK TABLES `pago_cheque` WRITE;
/*!40000 ALTER TABLE `pago_cheque` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago_cheque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedido` (
  `cod_pedido` int(11) NOT NULL,
  `ped_fecha` date NOT NULL,
  `ped_estado` varchar(15) NOT NULL,
  `users_id` int(11) NOT NULL,
  `mercaderia_mercaderia_cod` int(11) NOT NULL,
  `mercaderia_cod_prov` int(11) NOT NULL,
  PRIMARY KEY (`cod_pedido`),
  KEY `fk_pedido_users1_idx` (`users_id`),
  KEY `fk_pedido_mercaderia1_idx` (`mercaderia_mercaderia_cod`,`mercaderia_cod_prov`),
  CONSTRAINT `fk_pedido_mercaderia1` FOREIGN KEY (`mercaderia_mercaderia_cod`, `mercaderia_cod_prov`) REFERENCES `mercaderia` (`mercaderia_cod`, `cod_prov`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2019-04-05','1',1,4,0);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presupuesto`
--

DROP TABLE IF EXISTS `presupuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `presupuesto` (
  `presu_cod` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_presu` date NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `tipo_pres_cod` int(11) NOT NULL,
  `pac_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`presu_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presupuesto`
--

LOCK TABLES `presupuesto` WRITE;
/*!40000 ALTER TABLE `presupuesto` DISABLE KEYS */;
/*!40000 ALTER TABLE `presupuesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proveedor` (
  `cod_prov` int(11) NOT NULL AUTO_INCREMENT,
  `prov_descr` varchar(45) NOT NULL,
  `prov_ruc` varchar(45) NOT NULL,
  `prov_direcc` varchar(60) NOT NULL,
  `prov_telefono` varchar(25) NOT NULL,
  PRIMARY KEY (`cod_prov`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Teisa','400588-8','justo Priteo','0364'),(2,'Conacyt','457878-/','--','5656+'),(3,'ABC','15454','Viva121','4546');
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recauda_a_depos`
--

DROP TABLE IF EXISTS `recauda_a_depos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recauda_a_depos` (
  `recaud_a_depo_cod` int(11) NOT NULL AUTO_INCREMENT,
  `recau_des_fecha` date NOT NULL,
  `recaud_des_montoefec` int(11) NOT NULL,
  `aper_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`recaud_a_depo_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recauda_a_depos`
--

LOCK TABLES `recauda_a_depos` WRITE;
/*!40000 ALTER TABLE `recauda_a_depos` DISABLE KEYS */;
/*!40000 ALTER TABLE `recauda_a_depos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receta` (
  `receta_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_rece` date NOT NULL,
  `fecha_rece_ven` date NOT NULL,
  `receta_descr` varchar(150) NOT NULL,
  `receta_observa` varchar(200) NOT NULL,
  `pac_cod` int(11) NOT NULL,
  `medico_cod_1` int(11) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`receta_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servicios` (
  `servicios_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `servi_precio` int(11) NOT NULL,
  `servi_descripcion` varchar(50) NOT NULL,
  `tipo_imp_cod` int(11) NOT NULL,
  PRIMARY KEY (`servicios_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `mercaderia_cod` int(11) NOT NULL,
  `deposito_cod` int(11) NOT NULL,
  `sucursal_cod` int(11) NOT NULL,
  `stock_cantidad` varchar(20) NOT NULL,
  PRIMARY KEY (`mercaderia_cod`,`deposito_cod`,`sucursal_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursal`
--

DROP TABLE IF EXISTS `sucursal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sucursal` (
  `sucursal_cod` int(11) NOT NULL,
  `sucu_descr` varchar(45) NOT NULL,
  PRIMARY KEY (`sucursal_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursal`
--

LOCK TABLES `sucursal` WRITE;
/*!40000 ALTER TABLE `sucursal` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjet_emisor`
--

DROP TABLE IF EXISTS `tarjet_emisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarjet_emisor` (
  `tarjet_emisor_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `tarjet_emisor_descrip` varchar(50) NOT NULL,
  PRIMARY KEY (`tarjet_emisor_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjet_emisor`
--

LOCK TABLES `tarjet_emisor` WRITE;
/*!40000 ALTER TABLE `tarjet_emisor` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjet_emisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjeta`
--

DROP TABLE IF EXISTS `tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarjeta` (
  `tarjeta_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_tarj_cod` int(11) NOT NULL,
  `marca_tarje_cod` int(11) NOT NULL,
  `tarjet_emisor_cod` int(11) NOT NULL,
  PRIMARY KEY (`tarjeta_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjeta`
--

LOCK TABLES `tarjeta` WRITE;
/*!40000 ALTER TABLE `tarjeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_factura`
--

DROP TABLE IF EXISTS `tipo_factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_factura` (
  `tipo_fac_cod` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_fact_descr` varchar(25) NOT NULL,
  PRIMARY KEY (`tipo_fac_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_factura`
--

LOCK TABLES `tipo_factura` WRITE;
/*!40000 ALTER TABLE `tipo_factura` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_impuesto`
--

DROP TABLE IF EXISTS `tipo_impuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_impuesto` (
  `tipo_imp_cod` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_imp_descrip` varchar(50) NOT NULL,
  `porcentaje` int(11) NOT NULL,
  `fecha_ajuste` date NOT NULL,
  PRIMARY KEY (`tipo_imp_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_impuesto`
--

LOCK TABLES `tipo_impuesto` WRITE;
/*!40000 ALTER TABLE `tipo_impuesto` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_impuesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_nota`
--

DROP TABLE IF EXISTS `tipo_nota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_nota` (
  `tipo_nota_cod` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_nota_descr` varchar(50) NOT NULL,
  PRIMARY KEY (`tipo_nota_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_nota`
--

LOCK TABLES `tipo_nota` WRITE;
/*!40000 ALTER TABLE `tipo_nota` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_nota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pago`
--

DROP TABLE IF EXISTS `tipo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_pago` (
  `tipo_pago_cod` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_pago_desc` varchar(20) NOT NULL,
  PRIMARY KEY (`tipo_pago_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pago`
--

LOCK TABLES `tipo_pago` WRITE;
/*!40000 ALTER TABLE `tipo_pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_presu`
--

DROP TABLE IF EXISTS `tipo_presu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_presu` (
  `tipo_pres_cod` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_pres_descr` varchar(45) NOT NULL,
  `monto_presu` varchar(50) NOT NULL,
  PRIMARY KEY (`tipo_pres_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_presu`
--

LOCK TABLES `tipo_presu` WRITE;
/*!40000 ALTER TABLE `tipo_presu` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_presu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_tarje`
--

DROP TABLE IF EXISTS `tipo_tarje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_tarje` (
  `tipo_tarj_cod_1` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_tarj_descr` varchar(45) NOT NULL,
  PRIMARY KEY (`tipo_tarj_cod_1`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_tarje`
--

LOCK TABLES `tipo_tarje` WRITE;
/*!40000 ALTER TABLE `tipo_tarje` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_tarje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_tratamiento`
--

DROP TABLE IF EXISTS `tipo_tratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_tratamiento` (
  `tipo_tra_cod` int(11) NOT NULL AUTO_INCREMENT,
  `descr_tipo_trata` varchar(50) NOT NULL,
  PRIMARY KEY (`tipo_tra_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_tratamiento`
--

LOCK TABLES `tipo_tratamiento` WRITE;
/*!40000 ALTER TABLE `tipo_tratamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_tratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_usuario` (
  `tipo_usu_cod` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_usu_descr` varchar(25) NOT NULL,
  PRIMARY KEY (`tipo_usu_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_vacuna`
--

DROP TABLE IF EXISTS `tipo_vacuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_vacuna` (
  `vacuna_cod` int(11) NOT NULL AUTO_INCREMENT,
  `vac_descrip` varchar(500) NOT NULL,
  PRIMARY KEY (`vacuna_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_vacuna`
--

LOCK TABLES `tipo_vacuna` WRITE;
/*!40000 ALTER TABLE `tipo_vacuna` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_vacuna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titular`
--

DROP TABLE IF EXISTS `titular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `titular` (
  `titular_cod` int(11) NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(100) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `telefono` varchar(25) NOT NULL,
  PRIMARY KEY (`titular_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titular`
--

LOCK TABLES `titular` WRITE;
/*!40000 ALTER TABLE `titular` DISABLE KEYS */;
/*!40000 ALTER TABLE `titular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamiento`
--

DROP TABLE IF EXISTS `tratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tratamiento` (
  `trata_cod` int(11) NOT NULL AUTO_INCREMENT,
  `obser_tratamiento` varchar(120) NOT NULL,
  `paciente_pac_cod` int(11) NOT NULL,
  PRIMARY KEY (`trata_cod`),
  KEY `fk_tratamiento_paciente1_idx` (`paciente_pac_cod`),
  CONSTRAINT `fk_tratamiento_paciente1` FOREIGN KEY (`paciente_pac_cod`) REFERENCES `paciente` (`pac_cod`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamiento`
--

LOCK TABLES `tratamiento` WRITE;
/*!40000 ALTER TABLE `tratamiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno`
--

DROP TABLE IF EXISTS `turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turno` (
  `turno_cod` int(11) NOT NULL AUTO_INCREMENT,
  `turno_estado` varchar(8) NOT NULL,
  `turno_fecha` date NOT NULL,
  `turno_max` int(11) NOT NULL,
  `turno_min` int(11) NOT NULL,
  `turno_hora` datetime NOT NULL,
  `paciente_pac_cod` int(11) NOT NULL,
  `agenda_medica_agend_cod_1` int(11) NOT NULL,
  PRIMARY KEY (`turno_cod`,`paciente_pac_cod`,`agenda_medica_agend_cod_1`),
  KEY `fk_turno_paciente1_idx` (`paciente_pac_cod`),
  KEY `fk_turno_agenda_medica1_idx` (`agenda_medica_agend_cod_1`),
  CONSTRAINT `fk_turno_agenda_medica1` FOREIGN KEY (`agenda_medica_agend_cod_1`) REFERENCES `agenda_medica` (`agend_cod_1`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_turno_paciente1` FOREIGN KEY (`paciente_pac_cod`) REFERENCES `paciente` (`pac_cod`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno`
--

LOCK TABLES `turno` WRITE;
/*!40000 ALTER TABLE `turno` DISABLE KEYS */;
/*!40000 ALTER TABLE `turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno_detalle`
--

DROP TABLE IF EXISTS `turno_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turno_detalle` (
  `horapaciente` time NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `turno_turno_cod` int(11) NOT NULL,
  KEY `fk_turno_detalle_turno1_idx` (`turno_turno_cod`),
  CONSTRAINT `fk_turno_detalle_turno1` FOREIGN KEY (`turno_turno_cod`) REFERENCES `turno` (`turno_cod`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno_detalle`
--

LOCK TABLES `turno_detalle` WRITE;
/*!40000 ALTER TABLE `turno_detalle` DISABLE KEYS */;
/*!40000 ALTER TABLE `turno_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Sergio','sergojavier23@gmail.com',NULL,'$2y$10$sobwqQIDG.BqjGGvU0.d2OYRyft2tWYMrWZl0fHwIHLfE4sfsJfSm',NULL,'2020-06-10 19:13:09','2020-06-10 19:13:09'),(2,'Amarilla','sergojavier23@hotmail.com',NULL,'$2y$10$sobwqQIDG.BqjGGvU0.d2OYRyft2tWYMrWZl0fHwIHLfE4sfsJfSm',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacunacion`
--

DROP TABLE IF EXISTS `vacunacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vacunacion` (
  `vac_cod` int(11) NOT NULL AUTO_INCREMENT,
  `vacuna_cod` int(11) NOT NULL,
  `pac_cod` int(11) NOT NULL,
  `usuario_cod_1` int(11) NOT NULL,
  `fecha_vacu` date NOT NULL,
  PRIMARY KEY (`vac_cod`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacunacion`
--

LOCK TABLES `vacunacion` WRITE;
/*!40000 ALTER TABLE `vacunacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `vacunacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'web'
--

--
-- Dumping routines for database 'web'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-26 12:48:40
