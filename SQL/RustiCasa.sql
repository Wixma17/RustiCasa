CREATE TABLE Cliente (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Gmail VARCHAR(100) UNIQUE NOT NULL,
    Nickname VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(50) NOT NULL
);

CREATE TABLE Casa (
    CasaID INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion TEXT NOT NULL
);

CREATE TABLE Imagen (
    ImagenID INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Opinion (
    OpinionID INT AUTO_INCREMENT PRIMARY KEY,
    TextoOpinion TEXT NOT NULL
);

CREATE TABLE Pone (
    ClienteID INT,
    CasaID INT,
    PRIMARY KEY (ClienteID, CasaID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID),
    FOREIGN KEY (CasaID) REFERENCES Casa(CasaID)
);

CREATE TABLE Alquila (
    ClienteID INT,
    CasaID INT,
    PRIMARY KEY (ClienteID, CasaID),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ClienteID),
    FOREIGN KEY (CasaID) REFERENCES Casa(CasaID)
);

CREATE TABLE Habla (
    ClienteID1 INT,
    ClienteID2 INT,
    PRIMARY KEY (ClienteID1, ClienteID2),
    FOREIGN KEY (ClienteID1) REFERENCES Cliente(ClienteID),
    FOREIGN KEY (ClienteID2) REFERENCES Cliente(ClienteID)
);

CREATE TABLE Posee (
    CasaID INT,
    OpinionID INT,
    PRIMARY KEY (CasaID, OpinionID),
    FOREIGN KEY (CasaID) REFERENCES Casa(CasaID),
    FOREIGN KEY (OpinionID) REFERENCES Opinion(OpinionID)
);

CREATE TABLE Tiene (
    CasaID INT,
    ImagenID INT,
    PRIMARY KEY (CasaID, ImagenID),
    FOREIGN KEY (CasaID) REFERENCES Casa(CasaID),
    FOREIGN KEY (ImagenID) REFERENCES Imagen(ImagenID)
);
