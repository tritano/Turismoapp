const express = require('express');
const { Sequelize } = require('sequelize');
const path = require('path');
const { nanodb } = require('./nanodb'); // Módulo personalizado para interactuar con CouchDB
const { mysql } = require('./mysql'); // Módulo personalizado para interactuar con MySQL

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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// Rutas para interactuar con CouchDB

/**
 * Obtiene un documento de CouchDB por su ID.
 *
 * @param {string} reqId ID del documento a recuperar.
 * @param {function} res Función de respuesta HTTP.
 */
app.get('/api/couchdb/:reqId', async (req, res) => {
  try {
    const documento = await nanodb.obtenerDocumento(req.params.reqId);
    res.json(documento);
  } catch (error) {
    console.error(`Error al obtener documento de CouchDB: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

/**
 * Crea un nuevo documento en CouchDB.
 *
 * @param {object} reqBody Objeto con los datos del nuevo documento.
 * @param {function} res Función de respuesta HTTP.
 */
app.post('/api/couchdb', async (req, res) => {
  try {
    const nuevoDocumento = await nanodb.crearDocumento(req.body);
    res.json(nuevoDocumento);
  } catch (error) {
    console.error(`Error al crear documento en CouchDB: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

// Rutas para interactuar con MySQL

/**
 * Obtiene todos los registros de una tabla de MySQL.
 *
 * @param {string} tabla Nombre de la tabla de MySQL.
 * @param {function} res Función de respuesta HTTP.
 */
app.get('/api/mysql/:tabla', async (req, res) => {
  try {
    const registros = await mysql.obtenerRegistros(req.params.tabla);
    res.json(registros);
  } catch (error) {
    console.error(`Error al obtener registros de MySQL: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

/**
 * Crea un nuevo registro en una tabla de MySQL.
 *
 * @param {string} tabla Nombre de la tabla de MySQL.
 * @param {object} reqBody Objeto con los datos del nuevo registro.
 * @param {function} res Función de respuesta HTTP.
 */
app.post('/api/mysql/:tabla', async (req, res) => {
  try {
    const nuevoRegistro = await mysql.crearRegistro(req.params.tabla, req.body);
    res.json(nuevoRegistro);
  } catch (error) {
    console.error(`Error al crear registro en MySQL: ${error.message}`);
    res.status(500).send('Error interno del servidor');
  }
});

// Módulos personalizados para interactuar con las bases de datos

const nanodb = require('./nanodb');
const mysql = require('./mysql');

// nanodb.js

/**
 * Obtiene un documento de CouchDB por su ID.
 *
 * @param {string} documentoId ID del documento a recuperar.
 * @returns {Promise<object>} Promesa que resuelve con el documento o rechaza con un error.
 */
async function obtenerDocumento(documentoId) {
  try {
    const respuesta = await couchdb.get(documentoId);
    return respuesta.body;
  } catch (error) {
    throw new Error(`Error al obtener documento de CouchDB: ${error.message}`);
  }
}

/**
