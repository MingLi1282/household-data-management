DROP DATABASE IF EXISTS cs6400_fa22_team048;

CREATE DATABASE cs6400_fa22_team048;

USE cs6400_fa22_team048;

CREATE TABLE PostalCodes (
	PostalCode VARCHAR(255) NOT NULL,
	City VARCHAR(255) NOT NULL,
	State VARCHAR(255) NOT NULL,
	Latitude FLOAT(10) NOT NULL,
	Longitude FLOAT(10) NOT NULL,
	PRIMARY KEY (PostalCode)
);

CREATE TABLE Household (
 	Email VARCHAR(255) NOT NULL,
 	SquareFoot FLOAT(10) NOT NULL,
 	Bedroom INT NOT NULL,
 	Occupants INT NOT NULL,
 	HouseholdType VARCHAR(255) NOT NULL,
	PostalCode VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email),
	FOREIGN KEY (PostalCode)
        REFERENCES PostalCodes (postalcode)
);


CREATE TABLE Phone (
 	AreaCode VARCHAR(255) NOT NULL,
	RemainingSevenDigits VARCHAR(255) NOT NULL,
 	PhoneType VARCHAR(255) NOT NULL,
 	Email VARCHAR(255) NOT NULL,
	PRIMARY KEY(AreaCode, RemainingSevenDigits),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE FullBathroom (
 	Email VARCHAR(255) NOT NULL,
 	`Order` INT NOT NULL,
 	Sinks INT NOT NULL,
 	Commodes INT NOT NULL,
 	Bidet INT NOT NULL,
	Bathtub INT NOT NULL,
	Tub_Shower INT NOT NULL,
	Shower INT NOT NULL,
	`Primary` VARCHAR(255),
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE HalfBathroom (
 	Email VARCHAR(255) NOT NULL,
 	`Order` INT NOT NULL,
 	Sinks INT NOT NULL,
 	Commodes INT NOT NULL,
 	Bidet INT NOT NULL,
	NAME VARCHAR(255),
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Manufacturer (
	Manufacturer VARCHAR(255) NOT NULL,
	PRIMARY KEY(Manufacturer)
);


CREATE TABLE RefrigeratorFreezer (
 	Email VARCHAR(255) NOT NULL,
 	`Order` INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	TYPE VARCHAR(255) NOT NULL,
	SubType VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Washer (
 	Email VARCHAR(255) NOT NULL,
 	`Order` INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	TYPE VARCHAR(255) NOT NULL,
	LoadingType VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Dryer (
 	Email VARCHAR(255) NOT NULL,
 	`Order` INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	TYPE VARCHAR(255) NOT NULL,
	HeatSource VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE TV (
 	Email VARCHAR(255) NOT NULL,
 	`Order` INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	TYPE VARCHAR(255) NOT NULL,
	DisplayType VARCHAR(255) NOT NULL,
	MaxResolution VARCHAR(255) NOT NULL,
	Size FLOAT(10) NOT NULL,
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Cooker (
 	Email VARCHAR(255) NOT NULL,
 	`Order` INT NOT NULL,
 	ModelName VARCHAR(255),
 	Manufacturer VARCHAR(255) NOT NULL,
 	TYPE VARCHAR(255) NOT NULL,
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Manufacturer)
		REFERENCES Manufacturer (Manufacturer),
	FOREIGN KEY(Email)
		REFERENCES HouseHold (Email)
);

CREATE TABLE Cooker_CookerType (
 	Email VARCHAR(255),
 	`Order` INT,
 	CookerType VARCHAR(255),
	PRIMARY KEY(Email, `Order`, CookerType)
);

CREATE TABLE Oven (
 	Email VARCHAR(255),
 	`Order` INT,
 	OvenType VARCHAR(255),
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Email, `Order`)
		REFERENCES Cooker (Email, `Order`)
);

CREATE TABLE Cooktop (
 	Email VARCHAR(255),
 	`Order` INT,
 	HeatSource VARCHAR(255),
	PRIMARY KEY(Email, `Order`),
	FOREIGN KEY(Email, `Order`)
		REFERENCES Cooker (Email, `Order`)
);

CREATE TABLE Oven_HeatSource (
 	Email VARCHAR(255),
 	`Order` INT,
 	HeatSource VARCHAR(255),
	PRIMARY KEY(Email, `Order`, HeatSource)
);
