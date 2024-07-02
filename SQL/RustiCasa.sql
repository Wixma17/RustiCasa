CREATE TABLE Cliente (
    gmail VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    password VARCHAR(255),
    nickname VARCHAR(255),
    administrador BOOLEAN
);

CREATE TABLE Casa (
    id INT PRIMARY KEY,
    nombreCasa VARCHAR(255),
    descripcion TEXT
);

CREATE TABLE Imagen (
    id INT PRIMARY KEY,
    nombreImagen VARCHAR(255)
);

CREATE TABLE Mensaje (
    idMensaje INT PRIMARY KEY,
    textoMensaje TEXT,
    gmail VARCHAR(255),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail)
);

CREATE TABLE Opinion (
    id INT PRIMARY KEY,
    textoOpinion TEXT
);

-- Relaciones
CREATE TABLE Publica (
    gmail VARCHAR(255),
    idCasa INT,
    PRIMARY KEY (gmail, idCasa),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail),
    FOREIGN KEY (idCasa) REFERENCES Casa(id)
);

CREATE TABLE Alquila (
    gmail VARCHAR(255),
    idCasa INT,
    PRIMARY KEY (gmail, idCasa),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail),
    FOREIGN KEY (idCasa) REFERENCES Casa(id)
);

CREATE TABLE Posee (
    idCasa INT,
    idOpinion INT,
    PRIMARY KEY (idCasa, idOpinion),
    FOREIGN KEY (idCasa) REFERENCES Casa(id),
    FOREIGN KEY (idOpinion) REFERENCES Opinion(id)
);

CREATE TABLE Tiene (
    idCasa INT,
    idImagen INT,
    PRIMARY KEY (idCasa, idImagen),
    FOREIGN KEY (idCasa) REFERENCES Casa(id),
    FOREIGN KEY (idImagen) REFERENCES Imagen(id)
);

CREATE TABLE Habla (
    gmail1 VARCHAR(255),
    gmail2 VARCHAR(255),
    PRIMARY KEY (gmail1, gmail2),
    FOREIGN KEY (gmail1) REFERENCES Cliente(gmail),
    FOREIGN KEY (gmail2) REFERENCES Cliente(gmail)
);

CREATE TABLE Escribe (
    gmail VARCHAR(255),
    idMensaje INT,
    PRIMARY KEY (gmail, idMensaje),
    FOREIGN KEY (gmail) REFERENCES Cliente(gmail),
    FOREIGN KEY (idMensaje) REFERENCES Mensaje(idMensaje)
);
