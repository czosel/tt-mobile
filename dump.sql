-- MySQL dump 10.16  Distrib 10.2.36-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.2.36-MariaDB-1:10.2.36+maria~bionic

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
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (32987,'La Chaux-de-Fonds',NULL),(33033,'Rio-Star Muttenz','muttenz.png'),(33080,'Bulle','bulle.jpeg'),(33089,'Aarberg','aarberg.png'),(33090,'Belp','belp.png'),(33091,'Bern','bern.png'),(33093,'Brügg','bruegg.png'),(33094,'Burgdorf','burgdorf.jpg'),(33095,'Düdingen','duedingen.png'),(33099,'Grenchen',NULL),(33100,'Grossaffoltern','grossaffoltern.png'),(33101,'Heimberg',NULL),(33102,'Herzogenbuchsee',NULL),(33104,'Huttwil',NULL),(33105,'Interlaken',NULL),(33108,'Kirchberg',NULL),(33109,'Köniz','koeniz.png'),(33110,'Langenthal',NULL),(33111,'Langnau','langnau.png'),(33112,'Lyss','lyss.png'),(33113,'Grauholz','grauholz.png'),(33115,'Münchenbuchsee','muenchenbuchsee.png'),(33116,'Münsingen',NULL),(33119,'Niederscherli','niederscherli.png'),(33122,'Port','port.jpg'),(33123,'Royal Bern',NULL),(33124,'SC Informatik Swisscom Wabern',NULL),(33125,'Schmitten',NULL),(33126,'Schwarzenburg','schwarzenburg.png'),(33127,'Solothurn','solothurn.png'),(33128,'Steffisburg','steffisburg.jpg'),(33129,'Stettlen','stettlen.jpg'),(33131,'Thörishaus','thoerishaus.jpg'),(33132,'Thun','thun.svg'),(33135,'Wichtrach',NULL),(33136,'Wohlensee','wohlensee.png'),(33137,'Worb',NULL),(33138,'Wynigen',NULL),(33156,'bls Spiez',NULL),(33165,'Meyrin','meyrin.jpeg'),(33174,'Veyrier','veyrier.png'),(33175,'ZZ-Lancy','lancy.jpg'),(33197,'Wädenswil','wädenswil.png'),(33203,'Wil SG','wil.png'),(33244,'Neuhausen','neuhausen.png'),(33282,'Ostermundigen',NULL);
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (2,'20201031095251_club_table.js',1,'2020-10-31 11:13:40');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-13 17:03:31