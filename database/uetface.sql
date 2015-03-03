-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: uetface
-- ------------------------------------------------------
-- Server version	5.6.22-log

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
-- Table structure for table `giangvien`
--

DROP TABLE IF EXISTS `giangvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giangvien` (
  `ma_giang_vien` varchar(45) NOT NULL,
  `ho_va_ten` varchar(45) NOT NULL,
  `nam_sinh` int(11) NOT NULL,
  `khoa` varchar(45) NOT NULL,
  `diem_danh_gia` double NOT NULL,
  PRIMARY KEY (`ma_giang_vien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giangvien`
--

LOCK TABLES `giangvien` WRITE;
/*!40000 ALTER TABLE `giangvien` DISABLE KEYS */;
/*!40000 ALTER TABLE `giangvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giangvien_monhoc`
--

DROP TABLE IF EXISTS `giangvien_monhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `giangvien_monhoc` (
  `ma_giang_vien` varchar(45) NOT NULL,
  `ma_mon` varchar(45) NOT NULL,
  PRIMARY KEY (`ma_giang_vien`,`ma_mon`),
  KEY `fk_giangvien_monhoc_giangvien1_idx` (`ma_giang_vien`),
  KEY `fk_giangvien_monhoc_monhoc1_idx` (`ma_mon`),
  CONSTRAINT `fk_giangvien_monhoc_giangvien1` FOREIGN KEY (`ma_giang_vien`) REFERENCES `giangvien` (`ma_giang_vien`) ON UPDATE CASCADE,
  CONSTRAINT `fk_giangvien_monhoc_monhoc1` FOREIGN KEY (`ma_mon`) REFERENCES `monhoc` (`ma_mon`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giangvien_monhoc`
--

LOCK TABLES `giangvien_monhoc` WRITE;
/*!40000 ALTER TABLE `giangvien_monhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `giangvien_monhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ketquadanhgia`
--

DROP TABLE IF EXISTS `ketquadanhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ketquadanhgia` (
  `ma_kqdg` int(10) unsigned NOT NULL,
  `ma_mon` varchar(45) NOT NULL,
  `ma_giang_vien` varchar(45) NOT NULL,
  `ma_sinh_vien` int(10) unsigned NOT NULL,
  `1` int(10) unsigned NOT NULL,
  `2` int(10) unsigned NOT NULL,
  `3` int(10) unsigned NOT NULL,
  `4` int(10) unsigned NOT NULL,
  `5` int(10) unsigned NOT NULL,
  `6` int(10) unsigned NOT NULL,
  `7` int(10) unsigned NOT NULL,
  `8` int(10) unsigned NOT NULL,
  `9` int(10) unsigned NOT NULL,
  `10` int(10) unsigned NOT NULL,
  `11` int(10) unsigned NOT NULL,
  `12` int(10) unsigned NOT NULL,
  `13` int(10) unsigned NOT NULL,
  `14` int(10) unsigned NOT NULL,
  `15` int(10) unsigned NOT NULL,
  `16` int(10) unsigned NOT NULL,
  `17` int(10) unsigned NOT NULL,
  `18` int(10) unsigned NOT NULL,
  `19` int(10) unsigned NOT NULL,
  `20` int(10) unsigned NOT NULL,
  `21` int(10) unsigned NOT NULL,
  `22` int(10) unsigned NOT NULL,
  `23` int(10) unsigned NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_kqdg`,`ma_mon`,`ma_giang_vien`,`ma_sinh_vien`),
  KEY `fk_ketquadanhgia_monhoc1_idx` (`ma_mon`),
  KEY `fk_ketquadanhgia_sinhvien1_idx` (`ma_sinh_vien`),
  KEY `fk_ketquadanhgia_giangvien1_idx` (`ma_giang_vien`),
  CONSTRAINT `fk_ketquadanhgia_giangvien1` FOREIGN KEY (`ma_giang_vien`) REFERENCES `giangvien` (`ma_giang_vien`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ketquadanhgia_monhoc1` FOREIGN KEY (`ma_mon`) REFERENCES `monhoc` (`ma_mon`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ketquadanhgia_sinhvien1` FOREIGN KEY (`ma_sinh_vien`) REFERENCES `sinhvien` (`ma_sinh_vien`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ketquadanhgia`
--

LOCK TABLES `ketquadanhgia` WRITE;
/*!40000 ALTER TABLE `ketquadanhgia` DISABLE KEYS */;
/*!40000 ALTER TABLE `ketquadanhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lopmonhoc`
--

DROP TABLE IF EXISTS `lopmonhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lopmonhoc` (
  `ma_lop` int(11) NOT NULL,
  `ma_mon` varchar(45) NOT NULL,
  `tiet_bat_dau` int(10) unsigned NOT NULL,
  `tiet_ket_thuc` int(10) unsigned NOT NULL,
  `ngay_hoc` varchar(45) NOT NULL,
  `giang_duong` varchar(45) NOT NULL,
  PRIMARY KEY (`ma_lop`,`ma_mon`),
  KEY `fk_lopmonhoc_monhoc1_idx` (`ma_mon`),
  CONSTRAINT `fk_lopmonhoc_monhoc1` FOREIGN KEY (`ma_mon`) REFERENCES `monhoc` (`ma_mon`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lopmonhoc`
--

LOCK TABLES `lopmonhoc` WRITE;
/*!40000 ALTER TABLE `lopmonhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `lopmonhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monhoc`
--

DROP TABLE IF EXISTS `monhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monhoc` (
  `ma_mon` varchar(45) NOT NULL,
  `ten_mon` varchar(45) NOT NULL,
  `khoa` varchar(45) NOT NULL,
  `tin_chi` int(10) unsigned NOT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ma_mon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monhoc`
--

LOCK TABLES `monhoc` WRITE;
/*!40000 ALTER TABLE `monhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `monhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sinhvien`
--

DROP TABLE IF EXISTS `sinhvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sinhvien` (
  `ma_sinh_vien` int(10) unsigned NOT NULL,
  `tai_khoan` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `mat_khau` varchar(45) NOT NULL,
  `gioi_tinh` varchar(10) NOT NULL,
  `ho_va_ten` varchar(45) NOT NULL,
  `khoa_nam_hoc` varchar(45) NOT NULL,
  `lop_khoa_hoc` varchar(45) NOT NULL,
  PRIMARY KEY (`ma_sinh_vien`,`tai_khoan`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sinhvien`
--

LOCK TABLES `sinhvien` WRITE;
/*!40000 ALTER TABLE `sinhvien` DISABLE KEYS */;
/*!40000 ALTER TABLE `sinhvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sinhvien_has_lopmonhoc`
--

DROP TABLE IF EXISTS `sinhvien_has_lopmonhoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sinhvien_has_lopmonhoc` (
  `ma_sinh_vien` int(10) unsigned NOT NULL,
  `ma_lop` int(11) NOT NULL,
  PRIMARY KEY (`ma_sinh_vien`,`ma_lop`),
  KEY `fk_sinhvien_has_lopmonhoc_lopmonhoc1_idx` (`ma_lop`),
  KEY `fk_sinhvien_has_lopmonhoc_sinhvien1_idx` (`ma_sinh_vien`),
  CONSTRAINT `fk_sinhvien_has_lopmonhoc_lopmonhoc1` FOREIGN KEY (`ma_lop`) REFERENCES `lopmonhoc` (`ma_lop`) ON UPDATE CASCADE,
  CONSTRAINT `fk_sinhvien_has_lopmonhoc_sinhvien1` FOREIGN KEY (`ma_sinh_vien`) REFERENCES `sinhvien` (`ma_sinh_vien`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sinhvien_has_lopmonhoc`
--

LOCK TABLES `sinhvien_has_lopmonhoc` WRITE;
/*!40000 ALTER TABLE `sinhvien_has_lopmonhoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `sinhvien_has_lopmonhoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_teacher`
--

DROP TABLE IF EXISTS `tbl_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_teacher` (
  `teacher_id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_name` varchar(45) DEFAULT NULL,
  `teacher_personal_page` varchar(200) DEFAULT NULL,
  `teacher_avatar` varchar(200) DEFAULT NULL,
  `teacher_description` varchar(3000) DEFAULT NULL,
  `teacher_work_place` varchar(100) DEFAULT NULL,
  `teacher_active` int(11) DEFAULT NULL,
  `teacher_acadamic_title` varchar(45) DEFAULT NULL,
  `teacher_birthday` varchar(45) DEFAULT NULL,
  `teacher_sex` int(5) DEFAULT NULL,
  `teacher_faculty` int(5) DEFAULT NULL,
  `teacher_dept` int(5) DEFAULT NULL,
  `teacher_rate` float DEFAULT NULL,
  `teacher_personality` varchar(3000) DEFAULT NULL,
  `advices` varchar(3000) DEFAULT NULL,
  `teacher_research` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_teacher`
--

LOCK TABLES `tbl_teacher` WRITE;
/*!40000 ALTER TABLE `tbl_teacher` DISABLE KEYS */;
INSERT INTO `tbl_teacher` VALUES (1,'Phạm Bảo Sơn','http://www.coltech.vnu.edu.vn/~sonpb/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/PGS. TS. Pham Bao Son.jpg','Thầy dạy dễ hiểu, dễ tính','Đại học Công nghệ - Đại học Quốc Gia Hà Nội',1,'PGS. TS.','<p>\r\n	Đang cập nhật</p>',1,1,1,4.3,'Thầy cởi mở, sẵn sàng giải đáp thắc mắc của sinh viên','<p>\r\n	Lời khuy&ecirc;n khi học gi&aacute;o vi&ecirc;n n&agrave;y</p>','<p>\r\n	C&ocirc;ng tr&igrave;nh nghi&ecirc;n cứu của thầy, c&ocirc;</p>'),(2,'Trần Thị Minh Châu','uet.vnu.edu.vn/~chauttm/','http://bluebee-uet.com/themes/classic/assets/img/chauttm.jpg','Cô dạy khá dễ hiểu, tuy nhiên đôi khi đi hơi nhanh. Đặc biệt là cô rất nghiêm khắc nên khó xin xỏ ','Bộ môn Công nghệ Phần mềm, 309, E3',1,'TS. GV. ','Đang cập nhật',0,1,2,4.5,NULL,'Học cô rất hay','<ul>\r\n	<li>- Lập tr&igrave;nh nh&uacute;ng v&agrave; thời gian thực.</li>\r\n	<li>- Lập tr&igrave;nh hướng đối tượng.</li>\r\n	<li>- Cấu tr&uacute;c dữ liệu v&agrave; giải thuật.</li>\r\n	<li>- Hệ ph&acirc;n t&aacute;n.</li>\r\n	<li>- C&ocirc;ng nghệ phần mềm</li>\r\n</ul>'),(3,'Nguyễn Nam Hải','uet.vnu.edu.vn/~hainn/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Nguyen Nam Hai.jpg','Nghiêm khắc và chấm chặt tay là phong cách của thầy. Tuy nhiên ai chăm chỉ vẫn hoàn toàn có thể được điểm cao vì thầy ra đề không khó và sát với chương trình học','Đại học Công nghệ',1,'Giảng viên','Đang cập nhật',1,1,2,4,'Thầy khá là nghiêm khắc','Chú ý trên lớp, làm bài đầy đủ theo chỉ dẫn của thầy sẽ được kết quả tốt','<ul>\r\n	<li>2004-2008: Unisys &ndash; Student Training management software system, model of credit trainning.</li>\r\n	<li>2003-2004: Domasoft &ndash; Domitory management software</li>\r\n	<li>2002-2003: Objtest &ndash; Objective test software system Webman &ndash; Portal, Website management system</li>\r\n	<li>2000-2002: Fiacsys &ndash; Finace &amp; Accounting management system</li>\r\n	<li>1996-2000: Unisoft &ndash; Student Training management software system</li>\r\n	<li>1994-1995: Netgard &ndash; Network guard &amp; mantain software</li>\r\n	<li>1992-1994: Jimage &ndash; Jpeg image processing software,&nbsp;Graphic Servor Calculating &ndash; Computing system for Robot&rsquo;s Dynamic System,&nbsp;Motor Auto Tuning - Servo Motor Controler auto tuning&nbsp;system</li>\r\n	<li>1990-1992: Computerization project for Vietnam Ocean Ship Company &ndash; Construction software &amp; performace system</li>\r\n	<li>1989-1990: Vsafe &ndash; Virus protection solution for IBM PC</li>\r\n	<li>1988-1989: Vied &ndash; Vietnamese editor software for NEC PC</li>\r\n</ul>'),(4,'Lê Phê Đô','uet.vnu.edu.vn/~dolp/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/dopl.png',NULL,'Bộ môn Các Phương pháp Toán trong Công nghệ',1,'TS. ','Đang cập nhật',1,1,2,4.8,NULL,NULL,NULL),(5,'Hà Tiến Ngoạn','http://math.ac.vn/vi/component/staff/?task=getProfile&staffID=41','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Ha Tien Ngoan.jpg',NULL,'Viện Toán học',1,'PGS. TS. ','Đang cập nhật',1,NULL,NULL,0,'Thầy rất dễ tính.','Nếu không quá bỏ bê thì điểm chắc chắn cao.','<ul>\r\n	<li><a href=\"http://math.ac.vn/vi/component/staff/?task=getProfile&amp;staffID=41\">H&agrave; Tiến Ngoạn</a>, Nguyen Van Ngoc, Pseudo-differential operators related to Halkel transforms and application to dual integral equations, In:&nbsp; Algebraic Structures in Partial Differential Equations Related to Complex and Clifford Analysis, Ho Chi Minh City University of Education Press (2010), 249 -- 271.</li>\r\n	<li><a href=\"http://math.ac.vn/vi/component/staff/?task=getProfile&amp;staffID=41\">H&agrave; Tiến Ngoạn</a>, N. H. Hoang, The Wronskian solutions of the Sine-Gordon equation, In:&nbsp; Algebraic Structures in Partial Differential Equations Related to Complex and Clifford Analysis, Ho Chi Minh City University of Education Press (2010) 171 -- 208.</li>\r\n	<li><a href=\"http://math.ac.vn/vi/component/staff/?task=getProfile&amp;staffID=41\">H&agrave; Tiến Ngoạn</a>,&nbsp;<a href=\"http://journals.math.ac.vn/acta/images/stories/pdf1/Vol_36_No_2/Bai14_HTNgoan_2011_5.pdf\">On characteristic systems for general multidimensional Monge-Ampere equations</a>,&nbsp;&nbsp;<a href=\"http://journals.math.ac.vn/acta/index.php/no-2-2011\">Acta Math. Vietnamica&nbsp; 36 (2011), 330 -- 344</a>.</li>\r\n</ul>'),(6,'Hoàng Nam Nhật','http://cpd.vn/Default.aspx?tabid=692&Doctorid=1171','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Hoang Nam Nhat.JPG',NULL,NULL,1,'TS. ','1962',1,1,1,5,'Thầy khá dễ tính.','Chú ý làm bài tập thì điểm luôn luôn cao.','Đang cập nhật'),(7,'Nguyễn Năng Định','http://www.vnu.edu.vn/upload/2010/08/210/file/Nguyen%20Nang%20Dinh.pdf','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Nguyen Nang Dinh.JPG',NULL,'Phòng TN, Bộ môn (Trung tâm), Khoa Vật lý kỹ thuật & Công nghệ nano',1,'GS. ','15-8-1950',1,3,1,0,'Thầy rất thoải mái.','Làm đủ bài tập điểm sẽ rất cao.','<ul>\r\n	<li>T&aacute;c giả cuốn Vật l&yacute; v&agrave; C&ocirc;ng nghệ m&agrave;ng mỏng, NXB ĐHQGHN - 2005</li>\r\n	<li>Chủ bi&ecirc;n cuốn Thực h&agrave;nh C&ocirc;ng nghệ, NXB ĐHQGHN - 2007</li>\r\n	<li>[1]V.T.Bich, N.N.Dinh, N.H.Hoang, T.X.Hoai, L.V.Hong and V.D.Mien, Preparation of In2O3: Sn (ITO) Thin&nbsp;</li>\r\n	<li>Films by Electron Beam Deposition, Phys.Stat.Sol.(a), 102, K.91-95 (1987).&nbsp;</li>\r\n	<li>[2]. O. Erlandsson, J.Lindvall, N.N.Toan, N.V.Hung, V.T.Bich and N.N.Dinh, Electrochromic Properties of&nbsp;</li>\r\n	<li>Manganese Oxide (MnOx) Thin Films made by Electron Beam Deposition, Phys.Stat.Sol.(a), 139, pp. 451-457&nbsp;</li>\r\n	<li>(1993).&nbsp;</li>\r\n	<li>[3]. M.C.Bernard, A.Hugot-Le Goff, S.Joiret, N.N.Dinh, N.N.Toan, Polyaniline Layer for Iron Protection in Sulfate&nbsp;</li>\r\n	<li>Medium, J.Electrochem.Society, 146, (3) pp. 995-998 (1999).&nbsp;</li>\r\n	<li>[4]. N. N. Dinh, N. Th. T. Oanh, P. D. Long, M. C. Bernard, A. Hugot-Le Goff, Electrochromic properties of TiO2</li>\r\n	<li>anatase thin films prepared by dipping sol-gel method, Thin Solid Films 423, No.1, pp. 70-76 (2003)&nbsp;</li>\r\n	<li>[5]. Nguyen Nang Dinh, Marie-Claude Bernard, Anne Hugot-Le Goff, Thomas Stergiopoulos, Polycarpos Falaras,&nbsp;Photoelectrochemical solar cells based on SnO2 nanocrystalline films, C.R.Chimie 9 (2006) pp. 676-683.</li>\r\n</ul>\r\n'),(8,'Ho&agrave;ng Xu&acirc;n T&ugrave;ng',NULL,'http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Teacher_default_avatar.png',NULL,'<p>\r\n	Khoa C&ocirc;ng nghệ th&ocirc;ng tin</p>',1,'TS',NULL,1,1,2,NULL,NULL,'<p>\r\n	Đừng nghe những g&igrave; thầy n&oacute;i ^^</p>',NULL),(9,'Nguyễn Tr&iacute; Th&agrave;nh','<p>\r\n	http://fit.uet.vnu.edu.vn/users/40</p>','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Teacher_default_avatar.png',NULL,'<p>\r\n	305, E3</p>',1,'TS',NULL,1,1,2,5,'<p>\r\n	B&igrave;nh tĩnh, điềm đạm</p>','<p>\r\n	Chăm chỉ học theo c&aacute;ch của thầy</p>','<p>\r\n	<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">+ Khai ph&aacute; dữ liệu (ph&acirc;n lớp, ph&acirc;n cụm)</span><br style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\" />\r\n	<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">+ Tr&iacute;ch chọn thực thể</span><br style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\" />\r\n	<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">+ T&iacute;ch hợp hệ thống (tr&ecirc;n Linux)</span><br style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\" />\r\n	<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">+ Xử l&yacute; song song</span><br style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\" />\r\n	<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">+ Khai ph&aacute; quan điểm</span></p>'),(10,'Lê Vũ Hà','http://uet.vnu.edu.vn/~halv/','http://bluebee-uet.com/uploads/teacher/halv.jpg','','309 E3',1,'TS.','<p>	Đang cập nhật</p>',1,1,1,3.7,'Đang cập nhật','<p>	Đang cập nhật</p>','<p class=\"p1\">\r\n	Model Verification</p>'),(11,'Nguyễn Linh Trung','http://uet.vnu.edu.vn/~nltrung/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Teacher_default_avatar.png',NULL,'Điện tử viễn thông - Đại học Công nghệ',1,'TS.','<p>\r\n	Đang cập nhật</p>',1,2,NULL,0,'Đang cập nhật','<p>\r\n	Đang cập nhật</p>','<p>\r\n</p>\r\n<div class=\"nodecontent\" style=\"display: inline; color: rgb(0, 180, 57); font-size: 21px;\">\r\n	<a id=\"FMID_1339013989FM\" style=\"color: rgb(0, 0, 0); font-family: \'Times New Roman\'; font-size: medium;\">- Themes: &quot;Reduction of Data Dimension - Algorithms and Applications&quot;</a></div>\r\n<div class=\"nodecontent\" style=\"display: inline; color: rgb(0, 180, 57); font-size: 21px;\">\r\n	&nbsp;</div>\r\n<div class=\"nodecontent\" style=\"display: inline; color: rgb(0, 180, 57); font-size: 21px;\">\r\n	<div class=\"nodecontent\" style=\"display: inline;\">\r\n		<a id=\"FMID_589940017FM\" style=\"color: rgb(0, 0, 0); font-family: \'Times New Roman\'; font-size: medium;\">- Methods, Algorithms</a></div>\r\n	<div class=\"nodecontent\" style=\"display: inline;\">\r\n		&nbsp;</div>\r\n	<div class=\"nodecontent\" style=\"display: inline;\">\r\n		<div class=\"nodecontent\" style=\"display: inline;\">\r\n			<a id=\"FMID_1841053419FM\" style=\"color: rgb(0, 0, 0); font-family: \'Times New Roman\'; font-size: medium;\">- Applications</a></div>\r\n	</div>\r\n</div>'),(12,'Lê Sỹ Vinh','http://uet.vnu.edu.vn/~vinhls/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Le Sy Vinh.jpg',NULL,'Khoa CNTT',1,'TS.','<p>\r\n	Đang cập nhật</p>',1,1,1,5,NULL,NULL,'<p>\r\n	&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bioinformatics</p>\r\n<p>\r\n	&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Natural Languages processing</p>\r\n<p>\r\n	&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Social networks</p>'),(13,'Lê Quang Hiếu','http://uet.vnu.edu.vn/~hieulq/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Le Quang Hieu.jpg','B.Sc.: Hanoi University, Vietnam, 1995\r\nMSc.: Vietnam National University, Hanoi, 1998\r\nPh.D.: Heinrich-Heine University, Duesseldorf, Germany, 2010','Khoa CNTT',1,'TS.','<p>\r\n	Đang cập nhật</p>',1,1,1,0,'Đang cập nhật','<p>\r\n	Đang cập nhật</p>','<ul style=\"color: rgb(0, 0, 0); font-family: \'Times New Roman\'; font-size: medium;\">\r\n	<li>\r\n		Dữ liệu tr&ecirc;n Web (Data on the Web).</li>\r\n	<li>\r\n		Học m&aacute;y v&agrave; Khai mỏ dữ liệu (Machine learning &amp; Data mining).</li>\r\n</ul>'),(14,'Nguyễn Cảnh Hoàng','http://uet.vnu.edu.vn/~hoangnc/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Nguyen Canh Hoang.jpg','Đang cập nhật','Khoa CNTT',1,'Ths.','<p>\r\n	Đang cập nhật</p>',1,1,2,0,'Đang cập nhật','<p>\r\n	Đang cập nhật</p>','<p>\r\n	Đang cập nhật</p>'),(15,'Nguyễn Việt Hà','http://uet.vnu.edu.vn/~hanv/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Nguyen Viet Ha.jpg','Tel: (04) 3754 6575','Khoa CNTT',1,'PGS. TS.','<p>\r\n	Đang cập nhật</p>',1,1,2,5,'Đang cập nhật','<p>\r\n	Đang cập nhật</p>','<p style=\"color: rgb(0, 0, 0); font-family: \'Times New Roman\'; font-size: medium;\">\r\n	<b>C&aacute;c hướng nghi&ecirc;n cứu đang quan t&acirc;m</b></p>\r\n<ul style=\"color: rgb(0, 0, 0); font-family: \'Times New Roman\'; font-size: medium;\">\r\n	<li>\r\n		Kỹ nghệ phần mềm: kiểm chứng/kiểm thử phần mềm; kiến tr&uacute;c phần mềm; m&ocirc; h&igrave;nh ước lượng/dự to&aacute;n phần mềm.</li>\r\n	<li>\r\n		Tr&iacute; tuệ nh&acirc;n tạo: biểu diễn tri thức, suy luận, nhận dạng mẫu.</li>\r\n	<li>\r\n		E-learning: m&ocirc; h&igrave;nh ph&acirc;n lớp LMS/LCMS, adaptive learning.</li>\r\n</ul>'),(16,'Nguyễn Thị Huyền Châu','Đang cập nhật','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Teacher_default_avatar.png','Đang cập nhật','Khoa CNTT',1,'TS.','<p>\r\n	Đang cập nhật</p>',2,1,2,0,'Đang cập nhật','<p>\r\n	Đang cập nhật</p>','<p>\r\n	Đang cập nhật</p>'),(17,'Nguyễn Đình Việt','http://uet.vnu.edu.vn/~vietnd/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Nguyen Dinh Viet.jpg','Đang cập nhật','Khoa CNTT',1,'PGS. TS.','<p>\r\n	Đang cập nhật</p>',1,1,2,0,'Thầy giảng rất chi tiết.','<p>\r\n	Thầy rất hiểu t&acirc;m l&yacute; sinh vi&ecirc;n.</p>','<p>\r\n	Đang cập nhật</p>'),(18,'Nguyễn Ngọc Hóa','http://uet.vnu.edu.vn/~hoann/','http://bluebee-uet.com/themes/classic/assets/img/Teacher_img/Nguyen Ngoc Hoa.jpg','Actually, I\'m a lecturer/researcher at the Department of Information Systems , University of Engineering and Technology, VNU at Hanoi. My research interests lie currently in the database systems, biometric authentication, service integrations!','Khoa CNTT',1,'TS.','<p>\r\n	Đang cập nhật</p>',1,1,2,0,'Đang cập nhật','<p>\r\n	Đang cập nhật</p>','<p style=\"color: rgb(10, 82, 22); font-family: Verdana, sans-serif; font-size: 13px; text-align: justify;\">\r\n	This thesis concerns the dialogue negotiation modeling in spoken dialogue systems. By proposing a multisession dialogue approach, a negotiation is considered as a resolution of the dialogue system for a resource conflict between several related users. Thus, a dialogue is defined as a set of successive sessions, each one being a sub-dialogue between a single user and the system, and divided into three phases: emerging, negotiation process, and notification. Based on the dialogue strategic model and the game theory, a model of the dialogue generic management has been developed, and then extended with a multisession dialogue approach. In this model, a solution for handling misunderstanding by using a dialogic marker, called MDI, has been proposed. This model has been practically applied to the problem of organising meetings by implementing a spoken dialogue system, called Melina, in order to validate our approach. In the case of a room conflict, the user can ask Melina to contact all of relevant people to begin negotiation and obtain a compromise.</p>\r\n<p style=\"color: rgb(10, 82, 22); font-family: Verdana, sans-serif; font-size: 13px; text-align: justify;\">\r\n	Thesis director : Jean Caelen, Research director of CNRS.</p>\r\n<p style=\"color: rgb(10, 82, 22); font-family: Verdana, sans-serif; font-size: 13px; text-align: justify;\">\r\n	Theses defense:&nbsp;<strong>January 26, 2005</strong>&nbsp;at the amphith&eacute;&acirc;tre MJK - Maison Jean Kuntzmann, 110, avenue de la chimie - Domaine universitaire, St. Martin d\'H&egrave;res, France.</p>\r\n<p style=\"color: rgb(10, 82, 22); font-family: Verdana, sans-serif; font-size: 13px; text-align: justify;\">\r\n	Jury:&nbsp;<br />\r\n	Mme. Marie-France BRUANDET, president,<br />\r\n	M. Jean-Paul SANSONNET, referee,<br />\r\n	M. Jean-Yves ANTOINE, referee,<br />\r\n	M. Dominique NO&Euml;L, member,<br />\r\n	M. Jean CAELEN, director.&nbsp;</p>'),(19,'Nguyễn Ngọc Bình','http://uet.vnu.edu.vn/~nnbinh/','http://bluebee-uet.com/uploads/teacher/nnbinh.jpg','','309 E3',1,'TS','17/09/1959',1,1,2,5,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(20,'Đặng Đức Hạnh','http://uet.vnu.edu.vn/~hanhdd/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'TS','',1,1,1,NULL,'<p>\r\n	Thầy rất hiền</p>','','<p class=\"p1\">\r\n	Model Verification</p>'),(21,'Phạm Ngọc Hùng','http://uet.vnu.edu.vn/~hungpn/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'TS','',1,1,2,NULL,'<p>\r\n	Thầy nhiệt t&igrave;nh nhưng nghi&ecirc;m khắc</p>','<p>	Nhớ nghi&ecirc;m t&uacute;c trong giờ học của thầy</p>','<p class=\"p1\">\r\n	Model Verification</p>'),(22,'Trương Ninh Thuận','http://uet.vnu.edu.vn/~thuantn/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'PGS.TS','',1,1,2,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(23,'Phan Thị Kim Dung','http://uet.vnu.edu.vn/~zungptk/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'ThS','<p>	20/08/1983</p>',1,1,2,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(24,'Võ Đình Hiếu','http://uet.vnu.edu.vn/~hieuvd/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'TS','',1,1,2,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(25,'Vũ Diệu Hương','http://uet.vnu.edu.vn/~huongvd','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'ThS','',1,1,2,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(26,'Prof. Acad. Nguyễn Văn Hiệu','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,3,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(27,'Prof. Dr. Lê Trần Bình','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,3,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(28,'Prof. Dr. Nguyễn Hữu Đức','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,3,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(29,'Prof. Dr. Nguyễn Đại Hưng','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,3,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(30,'Assoc. Prof. Dr. Phan Văn Chi','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,1,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(31,'Assoc. Prof. Dr. Nông Văn Hải','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,1,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(32,'Prof. Dr. Trương Nam Hải','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,1,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(33,'Assoc. Prof. Dr. Nguyễn Thế Hiện','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,3,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(34,'Assoc. Prof. Dr. Lê Thanh Hoà','','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',NULL,'','',1,3,1,NULL,NULL,'','<p class=\"p1\">\r\n	Model Verification</p>'),(35,'Nguyễn Văn Vinh','http://uet.vnu.edu.vn/~vinhnv/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'TS.','<p>	Đang cập nhật</p>',1,1,1,0,'Đang cập nhật','<p>	Đang cập nhật</p>','<p class=\"p1\">\r\n	Model Verification</p>'),(36,'Lê Thanh Hà','http://uet.vnu.edu.vn/~ltha/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'Ths.','<p>	Đang cập nhật</p>',1,1,2,0,'Đang cập nhật','<p>	Đang cập nhật</p>','<p class=\"p1\">\r\n	Model Verification</p>'),(37,'Ma Thị Châu','http://uet.vnu.edu.vn/~chaumt/','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'ThS.','<p>	Đang cập nhật</p>',0,1,1,0,'Đang cập nhật','<p>	Đang cập nhật</p>','<p class=\"p1\">\r\n	Model Verification</p>'),(38,'Đỗ Đức Đông','Đang cập nhật','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'TS.','<p>	Đang cập nhật</p>',1,1,2,NULL,'Đang cập nhật','<p>	Đang cập nhật</p>','<p class=\"p1\">\r\n	Model Verification</p>'),(39,'Lê Nguyên Khôi','uet.vnu.edu.vn/~khoiln','http://bluebee-uet.com/uploads/teacher/Teacher_default_avatar.png','','309 E3',1,'TS.','<p>	Đang cập nhật</p>',1,1,1,2,'Đang cập nhật','<p>	Đang cập nhật</p>','<p class=\"p1\">\r\n	Model Verification</p>'),(40,'Nguyễn Phương Thái','http://uet.vnu.edu.vn/~thainp/','http://bluebee-uet.com/uploads/teacher/tthai.jpg','Bio: Sở thích nghiên cứu của tôi là về xử lý ngôn ngữ tự nhiên và học máy. Tôi nhận bằng Tiến sĩ về khoa học máy tính ở JAIST vào tháng 3 năm 2008. Từ tháng 6 năm 2008 tôi là giảng viên của Đại học Công nghệ.<br/>Cho sinh viên: Hiện nay tôi đang chủ trì và tham gia một số đề tài nghiên cứu về xử lý ngôn ngữ tự nhiên. Lợi ích của việc tham gia nghiên cứu khoa học là:<br/>· Được tham gia nghiên cứu các vấn đề mới, có ý nghĩa khoa học và ứng dụng<br/>· Được cấp kinh phí tham dự hội nghị, kinh phí hỗ trợ ngh','Bộ môn Khoa học Máy tính',1,'TS.','<p>	Đang cập nhật</p>',1,1,1,5,'Đang cập nhật','<p>	Đang cập nhật</p>','<ul>\r\n	<li>\r\n		<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">·&nbsp;</span><span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">Học máy: các mô hình đồ thị, học bán giám sát, lập luận dựa vào văn phạm</span></li>\r\n	<li>\r\n		<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">· Xử lý ngôn ngữ tự nhiên: tách từ, phân tích cú pháp, gán nhãn từ loại</span></li>\r\n	<li>\r\n		<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">· Khai phá văn bản/web</span></li>\r\n	<li>\r\n		<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">· Dịch máy: dịch máy dựa vào luật, dịch máy thống kê</span></li>\r\n	<li>\r\n		<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">· Các lý thuyết ngôn ngữ học</span></li>\r\n	<li>\r\n		<span style=\"color: rgb(56, 56, 56); font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 19.5120010375977px;\">· Phương pháp luận để chú giải ngôn ngữ học cho các kho ngữ liệu văn bản lớn</span></li>\r\n</ul>');
/*!40000 ALTER TABLE `tbl_teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-03 13:07:12
