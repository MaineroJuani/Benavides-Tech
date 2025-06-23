-- Crear la base de datos
CREATE DATABASE tienda_notebooks;

-- Conectarse a la base de datos (esto puede necesitar hacerse manualmente en algunas herramientas)
\c tienda_notebooks;

--Crear tabla con usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de categorías
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Crear tabla de marcas
CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Crear tabla de computadoras
CREATE TABLE computadoras (
    id SERIAL PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    procesador VARCHAR(100),
    graficos VARCHAR(100),
    almacenamiento VARCHAR(100),
    ram VARCHAR(50),
    pantalla VARCHAR(50),
    precio NUMERIC(12,2),
    descripcion TEXT,
    imagen VARCHAR(255),
    detalle_imagen VARCHAR(255),
    marca_id INT REFERENCES marcas(id)
);

-- Tabla intermedia para relación muchos a muchos con categorías
CREATE TABLE computadora_categoria (
    computadora_id INT REFERENCES computadoras(id) ON DELETE CASCADE,
    categoria_id INT REFERENCES categorias(id) ON DELETE CASCADE,
    PRIMARY KEY (computadora_id, categoria_id)
);

-- Insertar categorías
INSERT INTO categorias (nombre) VALUES 
('Gamer'),
('Oficina'),
('Hogar');

-- Insertar marcas
INSERT INTO marcas (nombre) VALUES 
('HP'),
('Lenovo'),
('Asus'),
('Dell');

-- Insertar computadoras
INSERT INTO computadoras (modelo, procesador, graficos, almacenamiento, ram, pantalla, precio, descripcion, imagen, detalle_imagen, marca_id) VALUES
('HP 15s-fq5004la', 'Intel Core i5 1235U', 'Intel Iris Xe', '512 GB SSD', '8 GB DDR4', '15.6" FHD', 499999.99, 'Notebook HP rápida y confiable', 'hp_15s.png', 'hp_15s_detalle.png', 1),
('Lenovo IdeaPad 3', 'AMD Ryzen 5 5500U', 'Radeon Graphics', '256 GB SSD', '8 GB DDR4', '15.6" FHD', 429999.99, 'Notebook Lenovo ideal para multitarea', 'lenovo_ideapad3.png', 'lenovo_ideapad3_detalle.png', 2),
('Asus Vivobook', 'Intel Core i7 1165G7', 'Intel Iris Xe', '1 TB SSD', '16 GB DDR4', '14" FHD', 589999.99, 'Notebook Asus potente y liviana', 'asus_vivobook.png', 'asus_vivobook_detalle.png', 3);

-- Asignar categorías a computadoras
INSERT INTO computadora_categoria (computadora_id, categoria_id) VALUES
(1, 2),
(1, 3),
(2, 2),
(3, 1),
(3, 3);


-- Inserciones para la tabla 'computadoras'
INSERT INTO computadoras (id, marca_id, modelo, procesador, memoria_ram, almacenamiento, pantalla, precio)
VALUES 
(1, 1, 'Notebook ASUS X515EA', 'Intel Core i3', '8 GB', '256 GB SSD', '15.6" Full HD', 799.99),
(2, 2, 'Notebook HP 15s-fq2716la', 'Intel Core i5', '8 GB', '512 GB SSD', '15.6" Full HD', 899.99),
(3, 3, 'Notebook Lenovo IdeaPad 3', 'AMD Ryzen 5', '12 GB', '512 GB SSD', '15.6" Full HD', 749.99),
(4, 4, 'Notebook Dell Inspiron 3511', 'Intel Core i5', '8 GB', '256 GB SSD', '15.6" Full HD', 929.99),
(5, 5, 'Notebook Acer Aspire 5', 'AMD Ryzen 7', '16 GB', '1 TB SSD', '15.6" Full HD', 1099.99),
(6, 1, 'Notebook ASUS ROG Strix G15', 'AMD Ryzen 9', '32 GB', '1 TB SSD', '15.6" FHD 300Hz', 1799.99),
(7, 2, 'Notebook HP Omen 16', 'Intel Core i7', '16 GB', '1 TB SSD', '16.1" QHD 165Hz', 1499.99),
(8, 3, 'Notebook Lenovo Legion 5', 'AMD Ryzen 7', '16 GB', '512 GB SSD', '15.6" FHD 165Hz', 1349.99),
(9, 4, 'Notebook Dell XPS 13', 'Intel Core i7', '16 GB', '512 GB SSD', '13.4" UHD+', 1899.99),
(10, 5, 'Notebook Acer Nitro 5', 'Intel Core i5', '16 GB', '1 TB SSD', '15.6" FHD 144Hz', 1199.99);