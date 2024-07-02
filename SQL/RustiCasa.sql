CREATE TABLE Cliente (
    gmail VARCHAR(150) PRIMARY KEY,
    passwd VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    nombre VARCHAR(50),
    apellido VARCHAR(100),
    administrador BOOLEAN
);

CREATE TABLE Casa (
    idCasa INT PRIMARY KEY,
    nombreCasa VARCHAR(50)
);

CREATE TABLE Imagen (
    idImagen INT PRIMARY KEY,
    nombreImagen VARCHAR(150),
    idCasa INT,
    FOREIGN KEY (idCasa) REFERENCES Casa(idCasa)
);

CREATE TABLE Provincia (
    idProvincia INT PRIMARY KEY,
    nombreProvincia VARCHAR(100)
);

CREATE TABLE Municipio (
    idMunicipio INT NOT NULL PRIMARY KEY,
    idprovincia INT NOT NULL,
    municipio VARCHAR(150) NOT NULL,
    municipioseo VARCHAR(150) DEFAULT NULL,
    postal INT(5) DEFAULT NULL,
    latitud decimal(9,6) DEFAULT NULL,
    longitud decimal(9,6) DEFAULT NULL,
    FOREIGN KEY (idProvincia) REFERENCES Provincia(idProvincia)
);

CREATE TABLE Opinion (
    id INT PRIMARY KEY,
    textoOpinion TEXT,
    idCasa INT,
    gmail VARCHAR(150),
    FOREIGN KEY (idCasa) REFERENCES Casa(idCasa),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail)
);

CREATE TABLE Mensaje (
    idMensaje INT PRIMARY KEY,
    textoMensaje TEXT,
    gmail VARCHAR(150),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail)
);

CREATE TABLE Publica (
    gmail VARCHAR(150),
    idCasa INT,
    PRIMARY KEY (gmail, idCasa),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail),
    FOREIGN KEY (idCasa) REFERENCES Casa(idCasa)
);

CREATE TABLE Alquila (
    gmail VARCHAR(150),
    idCasa INT,
    PRIMARY KEY (gmail, idCasa),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail),
    FOREIGN KEY (idCasa) REFERENCES Casa(idCasa)
);

CREATE TABLE Habla (
    gmail_cliente VARCHAR(150),
    idMensaje INT,
    PRIMARY KEY (gmail_cliente, idMensaje),
    FOREIGN KEY (gmail_cliente) REFERENCES Cliente(gmail),
    FOREIGN KEY (idMensaje) REFERENCES Mensaje(idMensaje)
);

CREATE TABLE Escribe (
    gmail VARCHAR(150),
    idMensaje INT,
    PRIMARY KEY (gmail, idMensaje),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail),
    FOREIGN KEY (idMensaje) REFERENCES Mensaje(idMensaje)
);

CREATE TABLE Posee (
    gmail VARCHAR(150),
    idCasa INT,
    PRIMARY KEY (gmail, idCasa),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail),
    FOREIGN KEY (idCasa) REFERENCES Casa(idCasa)
);

CREATE TABLE Tiene (
    idCasa INT,
    idImagen INT,
    PRIMARY KEY (idCasa, idImagen),
    FOREIGN KEY (idCasa) REFERENCES Casa(idCasa),
    FOREIGN KEY (idImagen) REFERENCES Imagen(idImagen)
);

CREATE TABLE Pertenece (
    idProvincia INT,
    idMunicipio INT,
    PRIMARY KEY (idProvincia, idMunicipio),
    FOREIGN KEY (idProvincia) REFERENCES Provincia(idProvincia),
    FOREIGN KEY (idMunicipio) REFERENCES Municipio(idMunicipio)
);