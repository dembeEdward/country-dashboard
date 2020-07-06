/*All necessary SQL Statements can be placed in this file*/

CREATE DATABASE CountryDashboard
GO

USE CountryDashboard
GO

CREATE TABLE Countries(
	[CountryID] uniqueidentifier NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Code] [nvarchar](2) NOT NULL,
	CONSTRAINT UC_Countries UNIQUE (Code)
)
GO
--This is the seed data, DO NOT change this INSERT statement in any way--
INSERT INTO Countries
VALUES
(NEWID(), 'Brazil', 'BR'),
(NEWID(), 'Egypt', 'EG'),
(NEWID(), 'Italy', 'IT'),
(NEWID(), 'Monaco', 'MC'),
(NEWID(), 'South Africa', 'ZA'),
(NEWID(), 'United States', 'US')