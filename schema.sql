DROP DATABASE IF EXISTS cs6400_fa22_team048;

CREATE DATABASE cs6400_fa22_team048;

USE cs6400_fa22_team048;

CREATE TABLE PostalCodes (
	PostalCode INT NOT NULL,
	City VARCHAR(255) NOT NULL,
	State VARCHAR(255) NOT NULL,
	Latitude FLOAT(10) NOT NULL,
	Longitute FLOAT(10) NOT NULL,
	PRIMARY KEY (PostalCode)
);

CREATE TABLE Household (
 	Email VARCHAR(255) NOT NULL,
 	SquareFoot FLOAT(10) NOT NULL,
 	Bedroom FLOAT(10) NOT NULL,
 	Occupants INT NOT NULL,
 	HouseholdType VARCHAR(255) NOT NULL,
	PostalCode INT NOT NULL,
	PRIMARY KEY(Email),
	FOREIGN KEY (PostalCode) 
        REFERENCES PostalCodes (postalcode) 
);


CREATE TABLE Phone (
 	AreaCode INT NOT NULL,
	RemainingSevenDigits INT NOT NULL,
 	PhoneType VARCHAR(255) NOT NULL,
 	Email VARCHAR(255) NOT NULL,
	PRIMARY KEY(AreaCode, RemainingSevenDigits),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE FullBathroom (
 	Email VARCHAR(255) NOT NULL,
 	[Order] INT NOT NULL,
 	Sinks INT NOT NULL,
 	Commodes INT NOT NULL,
 	Bidet INT NOT NULL,
	Bathtub INT NOT NULL,
	Tub_Shower INT NOT NULL,
	Shower INT NOT NULL,
	[Primary] VARCHAR(255),
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE HalfBathroom (
 	Email VARCHAR(255) NOT NULL,
 	[Order] INT NOT NULL,
 	Sinks INT NOT NULL,
 	Commodes INT NOT NULL,
 	Bidet INT NOT NULL,
	Name VARCHAR(255),
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Manufacturer (
	Manufacturer VARCHAR(255) NOT NULL,
	PRIMARY KEY(Manufacturer)
);


CREATE TABLE RefrigeratorFreezer (
 	Email VARCHAR(255) NOT NULL,
 	[Order] INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	Type VARCHAR(255) NOT NULL,
	SubType VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Washer (
 	Email VARCHAR(255) NOT NULL,
 	[Order] INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	Type VARCHAR(255) NOT NULL,
	LoadingType VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Dryer (
 	Email VARCHAR(255) NOT NULL,
 	[Order] INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	Type VARCHAR(255) NOT NULL,
	HeatSource VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE TV (
 	Email VARCHAR(255) NOT NULL,
 	[Order] INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	Type VARCHAR(255) NOT NULL,
	DisplayType VARCHAR(255) NOT NULL,
	MaxResolution VARCHAR(255) NOT NULL,
	Size FLOAT(10) NOT NULL,
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Cooker (
 	Email VARCHAR(255) NOT NULL,
 	[Order] INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	Type VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Cooker_CookerType (
 	Email VARCHAR(255),
 	[Order] INT,
 	CookerType VARCHAR(255)
	PRIMARY KEY(Email, [Order], CookerType),
);

CREATE TABLE Oven (
 	Email VARCHAR(255),
 	[Order] INT,
 	OvenType VARCHAR(255),
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Email, [Order])
		REFERENCES Cooker (Email, [Order])
);

CREATE TABLE Cooktop (
 	Email VARCHAR(255),
 	[Order] INT,
 	HeatSource VARCHAR(255),
	PRIMARY KEY(Email, [Order]),
	FOREIGN KEY(Email, [Order])
		REFERENCES Cooker (Email, [Order])
);

CREATE TABLE Oven_HeatSource (
 	Email VARCHAR(255),
 	[Order] INT,
 	HeatSource VARCHAR(255),
	PRIMARY KEY(Email, [Order], HeatSource),
);
INSERT INTO PostalCodes(PostalCode,City,State,Latitude,Longitute) VALUES (45140,'Loveland','OH',39.25865,-84.2651);
INSERT INTO PostalCodes (PostalCode,City,State,Latitude,Longitute) VALUES (8889,'Whitehouse Station','NJ',40.61285,-74.76682);

INSERT INTO Household (Email,SquareFoot,Bedroom,Occupants,HouseholdType,PostalCode) VALUES ('email1@gmail.com','1000','2','2','Condo',45140);
INSERT INTO Household (Email,SquareFoot,Bedroom,Occupants,HouseholdType,PostalCode) VALUES ('email2@gmail.com','1200','2','2','Condo',8889);



INSERT INTO Phone (AreaCode,RemainingSevenDigits,PhoneType,Email) VALUES ('205','3344563','home','email1@gmail.com');
INSERT INTO Phone (AreaCode,RemainingSevenDigits,PhoneType,Email) VALUES ('303','8288766','mobile','email2@gmail.com');

INSERT INTO FullBathroom (Email,[Order],Sinks,Commodes,Bidet,Bathtub,Tub_Shower,Shower,[Primary]) VALUES ('email1@gmail.com','1','1','1','1','1','1','1','Yes');
INSERT INTO FullBathroom (Email,[Order],Sinks,Commodes,Bidet,Bathtub,Tub_Shower,Shower,[Primary]) VALUES ('email2@gmail.com','1','1','1','1','1','1','1','Yes');


INSERT INTO HalfBathroom (Email,[Order],Sinks,Commodes,Bidet,Name) VALUES ('email1@gmail.com','3','1','1','1','HB1');
INSERT INTO HalfBathroom (Email,[Order],Sinks,Commodes,Bidet,Name) VALUES ('email2@gmail.com','3','1','1','1','HB1');

INSERT INTO Manufacturer (Manufacturer) VALUES ('A');
INSERT INTO Manufacturer (Manufacturer) VALUES ('B');
INSERT INTO Manufacturer (Manufacturer) VALUES ('C');
INSERT INTO Manufacturer (Manufacturer) VALUES ('E');
INSERT INTO Manufacturer (Manufacturer) VALUES ('F');
INSERT INTO Manufacturer (Manufacturer) VALUES ('G');
INSERT INTO Manufacturer (Manufacturer) VALUES ('H');
INSERT INTO Manufacturer (Manufacturer) VALUES ('I');
INSERT INTO Manufacturer (Manufacturer) VALUES ('J');
INSERT INTO Manufacturer (Manufacturer) VALUES ('K');
INSERT INTO Manufacturer (Manufacturer) VALUES ('L');
INSERT INTO Manufacturer (Manufacturer) VALUES ('MM');
INSERT INTO Manufacturer (Manufacturer) VALUES ('N');
INSERT INTO Manufacturer (Manufacturer) VALUES ('DD');
INSERT INTO Manufacturer (Manufacturer) VALUES ('CC');

INSERT INTO RefrigeratorFreezer (Email,[Order],ModelName,Manufacturer,Type,SubType) VALUES ('email1@gmail.com','1','BBBQ','A','RefrigeratorFreezer','Bottom freezer refrigerator');
INSERT INTO RefrigeratorFreezer (Email,[Order],ModelName,Manufacturer,Type,SubType) VALUES ('email2@gmail.com','1','BBEE','E','RefrigeratorFreezer','upright freezer');



INSERT INTO Washer (Email,[Order],ModelName,Manufacturer,Type,LoadingType) VALUES ('email1@gmail.com','2','BBBQ','A','Washer','Top');
INSERT INTO Washer (Email,[Order],ModelName,Manufacturer,Type,LoadingType) VALUES ('email2@gmail.com','2','BBDD','C','Washer','Top');



INSERT INTO Dryer (Email,[Order],ModelName,Manufacturer,Type,HeatSource) VALUES ('email1@gmail.com','3','BBBQ','A','Dryer','gas');
INSERT INTO Dryer (Email,[Order],ModelName,Manufacturer,Type,HeatSource) VALUES ('email2@gmail.com','3','BBEE','E','Dryer','gas');

INSERT INTO TV (Email,[Order],ModelName,Manufacturer,Type,DisplayType,MaxResolution,Size) VALUES ('email1@gmail.com','4','BBBQ','A','TV','tube','480i','30');
INSERT INTO TV (Email,[Order],ModelName,Manufacturer,Type,DisplayType,MaxResolution,Size) VALUES ('email2@gmail.com','5','BBDD','C','TV','plasma','720p','50');

INSERT INTO Cooker (Email,[Order],ModelName,Manufacturer,Type) VALUES ('email1@gmail.com','5','BBBQ','A','Cooker');
INSERT INTO Cooker (Email,[Order],ModelName,Manufacturer,Type) VALUES ('email2@gmail.com','5','BBFR','H','Cooker');

INSERT INTO Cooker_CookerType (Email,[Order],CookerType) VALUES ('email1@gmail.com','5','Oven');
INSERT INTO Cooker_CookerType (Email,[Order],CookerType) VALUES ('email1@gmail.com','5','Cooktop');
INSERT INTO Cooker_CookerType (Email,[Order],CookerType) VALUES ('email2@gmail.com','5','Oven');
INSERT INTO Cooker_CookerType (Email,[Order],CookerType) VALUES ('email2@gmail.com','5','Cooktop');



INSERT INTO Oven (Email,[Order],OvenType) VALUES ('email1@gmail.com','5','convection');
INSERT INTO Oven (Email,[Order],OvenType) VALUES ('email2@gmail.com','5','conventional');


INSERT INTO Cooktop (Email,[Order],HeatSource) VALUES ('email1@gmail.com','5','gas');
INSERT INTO Cooktop (Email,[Order],HeatSource) VALUES ('email2@gmail.com','5','induction');


INSERT INTO Oven_HeatSource (Email,[Order],HeatSource) VALUES ('email1@gmail.com','5','gas');
INSERT INTO Oven_HeatSource (Email,[Order],HeatSource) VALUES ('email2@gmail.com','5','gas');
