const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');


// Requerir el paquete para CouchDB
const nano = require('nano')('http://tritan:tritan@localhost:5984');



// Configurar conexión a CouchDB
const couchdb = nano.use('replicator');

// Realizar una consulta en la base de datos
couchdb.get('documento_id', (err, body) => {
    if (err) {
        console.error('Error al obtener el documento:', err);
    } else {
        console.log('Documento recuperado:', body);
    }
});

// Configurar conexión a MySQL
const sequelize = new Sequelize('turismo', 'root', 'tritan', {
    host: 'localhost',
    dialect: 'mysql'
});


// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Configurar la ruta para servir el archivo index.html
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Middleware para parsear JSON
app.use(express.json());

// Sincronizar el modelo con la base de datos MySQL
sequelize.sync()
    .then(() => console.log('Tablas sincronizadas con MySQL'))
    .catch(err => console.error('No se pudieron sincronizar las tablas con MySQL', err));

// Resto del código...

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
