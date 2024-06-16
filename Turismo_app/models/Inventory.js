const nano = require('nano')('http://localhost:5984'); // URL de tu servidor CouchDB
const couchDB = nano.db.use('inventory'); // Nombre de tu base de datos CouchDB

// Crear un documento
const createDocument = async (doc) => {
    try {
        const response = await couchDB.insert(doc);
        return response;
    } catch (err) {
        throw err;
    }
};

// Obtener todos los documentos
const getDocuments = async () => {
    try {
        const response = await couchDB.list({ include_docs: true });
        return response.rows.map(row => row.doc);
    } catch (err) {
        throw err;
    }
};

// Obtener un documento por ID
const getDocumentById = async (id) => {
    try {
        const doc = await couchDB.get(id);
        return doc;
    } catch (err) {
        throw err;
    }
};

// Actualizar un documento
const updateDocument = async (id, doc) => {
    try {
        const existingDoc = await getDocumentById(id);
        doc._id = id;
        doc._rev = existingDoc._rev;
        const response = await couchDB.insert(doc);
        return response;
    } catch (err) {
        throw err;
    }
};

// Eliminar un documento
const deleteDocument = async (id) => {
    try {
        const existingDoc = await getDocumentById(id);
        const response = await couchDB.destroy(id, existingDoc._rev);
        return response;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
};
