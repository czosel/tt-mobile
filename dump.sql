-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: ttmobile
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (32984,'Bernex',NULL),(32985,'Carouge',NULL),(32987,'La Chaux-de-Fonds',NULL),(32988,'Le Locle',NULL),(32992,'Omega',NULL),(32997,'Tavannes',NULL),(32998,'Tramelan',NULL),(33000,'Locarno',NULL),(33001,'Lugano',NULL),(33002,'Riva S.Vitale',NULL),(33004,'Eysins',NULL),(33005,'Forward-Morges',NULL),(33007,'Gland',NULL),(33008,'Grône',NULL),(33009,'Lausanne',NULL),(33011,'Mézières',NULL),(33013,'Montriond-Ouchy',NULL),(33015,'Vevey',NULL),(33017,'KV Liestal',NULL),(33018,'Lenzburg',NULL),(33020,'Liebrüti',NULL),(33021,'Mellingen',NULL),(33022,'Menziken',NULL),(33023,'Möhlin',NULL),(33026,'Niedergösgen',NULL),(33027,'Oberrohrdorf',NULL),(33028,'Oberwil','33028.png'),(33029,'Olten',NULL),(33030,'Pratteln',NULL),(33033,'Rio-Star Muttenz','muttenz.png'),(33034,'Schöftland',NULL),(33036,'Sisseln',NULL),(33037,'Victoria Bottmingen',NULL),(33038,'Waldenburg',NULL),(33039,'Baden-Wettingen',NULL),(33040,'Wettstein Basel',NULL),(33042,'Wohlen',NULL),(33043,'Zofingen',NULL),(33044,'Aarau',NULL),(33046,'Aesch',NULL),(33048,'Basel',NULL),(33050,'Sion',NULL),(33051,'Yvorne',NULL),(33052,'Villars/Glâne',NULL),(33053,'Stalden',NULL),(33054,'Rossens',NULL),(33062,'Yverdon',NULL),(33063,'Romanel',NULL),(33067,'Sierre',NULL),(33073,'Fribourg',NULL),(33074,'Estavayer',NULL),(33075,'Aigle',NULL),(33077,'Blonay',NULL),(33080,'Bulle','bulle.jpeg'),(33082,'Cheyres',NULL),(33084,'Collombey/Muraz',NULL),(33085,'Crissier',NULL),(33089,'Aarberg','aarberg.png'),(33090,'Belp','belp.png'),(33091,'Bern','bern.png'),(33093,'Brügg','bruegg.png'),(33094,'Burgdorf','burgdorf.jpg'),(33095,'Düdingen','duedingen.png'),(33097,'Erlach',NULL),(33099,'Grenchen',NULL),(33100,'Grossaffoltern','grossaffoltern.png'),(33101,'Heimberg',NULL),(33102,'Herzogenbuchsee','herzogenbuchsee.png'),(33104,'Huttwil',NULL),(33105,'Interlaken',NULL),(33106,'Ittigen',NULL),(33108,'Kirchberg','kirchberg.png'),(33109,'Köniz','koeniz.png'),(33110,'Langenthal',NULL),(33111,'Langnau','langnau.png'),(33112,'Lyss','lyss.png'),(33113,'Grauholz','grauholz.png'),(33114,'Regio Moossee','33114.png'),(33115,'Münchenbuchsee','muenchenbuchsee.png'),(33116,'Münsingen',NULL),(33119,'Niederscherli','niederscherli.png'),(33121,'Pieterlen',NULL),(33122,'Port','port.jpg'),(33123,'Royal Bern','royal.png'),(33124,'SC Informatik Swisscom Wabern',NULL),(33125,'Schmitten',NULL),(33126,'Schwarzenburg','schwarzenburg.png'),(33127,'Solothurn','solothurn.png'),(33128,'Steffisburg','steffisburg.jpg'),(33129,'Stettlen','stettlen.jpg'),(33130,'Studen',NULL),(33131,'Thörishaus','thoerishaus.jpg'),(33132,'Thun','thun.svg'),(33133,'Tiefenau',NULL),(33134,'Utzenstorf',NULL),(33135,'Wichtrach',NULL),(33136,'Wohlensee','wohlensee.png'),(33137,'Worb',NULL),(33138,'Wynigen',NULL),(33141,'Breitenbach',NULL),(33142,'Bremgarten',NULL),(33144,'Brugg',NULL),(33146,'BW Rupperswil',NULL),(33148,'Döttingen','33148.png'),(33151,'Fortuna Hausen',NULL),(33153,'Frick',NULL),(33154,'Gelterkinden',NULL),(33156,'bls Spiez',NULL),(33158,'Horgen','33158.png'),(33159,'Châtelaine',NULL),(33163,'Grand-Saconnex',NULL),(33164,'Mandement',NULL),(33165,'Meyrin','meyrin.jpeg'),(33167,'Onex',NULL),(33168,'Puplinge',NULL),(33169,'Rapid-Genève',NULL),(33170,'Silver Star',NULL),(33171,'UGS-Chênois',NULL),(33172,'Vernier',NULL),(33173,'Versoix',NULL),(33174,'Veyrier','veyrier.png'),(33175,'ZZ-Lancy','lancy.jpg'),(33180,'Cortaillod',NULL),(33182,'Delémont',NULL),(33183,'Binningen',NULL),(33184,'Copains Birsfelden',NULL),(33185,'Seebach-Kügeliloo',NULL),(33186,'Sihltal',NULL),(33187,'St. Gallen',NULL),(33190,'Thalwil',NULL),(33191,'Toggenburg',NULL),(33192,'Triesen','triesen.jpg'),(33194,'Urdorf',NULL),(33195,'Uster',NULL),(33197,'Wädenswil','wädenswil.png'),(33198,'Wallenwil',NULL),(33199,'Weinfelden',NULL),(33201,'Wettswil',NULL),(33202,'Wetzikon',NULL),(33203,'Wil SG','wil.png'),(33204,'Winterthur',NULL),(33205,'Wolfhalden',NULL),(33206,'Wolfhausen',NULL),(33208,'Wuppenau',NULL),(33209,'Young Stars ZH','33209.png'),(33211,'Zürich-Affoltern','33211.png'),(33212,'Affoltern A/A','33212.png'),(33214,'Bronschhofen',NULL),(33216,'Buchs Zürich',NULL),(33217,'Bülach','33217.png'),(33218,'BW-Wollishofen',NULL),(33219,'Chur',NULL),(33221,'Dietikon-Weiningen',NULL),(33222,'Dübendorf-Volketswil',NULL),(33223,'Embrachertal','33223.png'),(33225,'Ettenhausen',NULL),(33226,'Flums',NULL),(33228,'Gaiserwald',NULL),(33229,'Glarus',NULL),(33230,'Gossau St.Gallen',NULL),(33232,'Greifensee',NULL),(33233,'Herisau','33233.png'),(33234,'Höngg',NULL),(33236,'Horn',NULL),(33237,'Imperial Winterthur','33237.png'),(33238,'Kloten','33238.png'),(33241,'Meilen-Männedorf',NULL),(33242,'Muolen','33242.png'),(33244,'Neuhausen','neuhausen.png'),(33245,'Niederhasli','33245.png'),(33247,'Oberriet','33247.png'),(33249,'Pinguin Zürich','33249.png'),(33250,'Rapperswil-Jona','33250.png'),(33252,'Romanshorn',NULL),(33253,'Rorschach',NULL),(33254,'Rüschlikon',NULL),(33256,'Ruggell','33256.png'),(33257,'Schaan-Eschen/Mauren','33257.png'),(33258,'Schaffhausen',NULL),(33259,'Balzers','33259.png'),(33261,'Baar',NULL),(33262,'Buochs',NULL),(33263,'Dierikon-Ebikon',NULL),(33264,'Goldau',NULL),(33266,'Hünenberg',NULL),(33268,'Kriens',NULL),(33269,'Rapid Luzern','33269.png'),(33270,'Reussbühl',NULL),(33271,'Emmen','33271.png'),(33272,'Rotkreuz',NULL),(33273,'Rothenburg','33273.png'),(33274,'Sarnen','33274.png'),(33275,'Schenkon','33275.png'),(33277,'Steinhausen',NULL),(33278,'Willisau','33278.png'),(33279,'Zug',NULL),(33282,'Ostermundigen','ostermundigen.png'),(33284,'Martigny',NULL),(33431,'Steckborn-Homburg',NULL),(33544,'Gampel-Steg',NULL),(34104,'T-Card',NULL),(36146,'Associazione Bellinzonese Tennistavolo',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
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

-- Dump completed on 2023-12-16 20:11:21
