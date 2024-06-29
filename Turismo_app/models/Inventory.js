const nano = require('nano')('http://localhost:5984');
const couchDB = nano.db.use('inventory');

/**
 * Crea un nuevo documento en la base de datos CouchDB.
 * @param {object} doc Objeto que representa el documento a crear.
 * @returns {Promise<object>} Promesa que se resuelve con la respuesta de CouchDB.
 * @throws {Error} Si ocurre un error durante la creación del documento.
 */
const createDocument = async (doc) => {
    try {
        const response = await couchDB.insert(doc);
        return response;
    } catch (err) {
        console.error(`Error al crear documento en CouchDB: ${err.message}`);
        throw err;
    }
};

/**
 * Obtiene todos los documentos de la base de datos CouchDB.
 * @returns {Promise<Array<object>>} Promesa que se resuelve con un array de documentos.
 * @throws {Error} Si ocurre un error al obtener los documentos.
 */
const getDocuments = async () => {
    try {
        const response = await couchDB.list({ include_docs: true });
        return response.rows.map(row => row.doc);
    } catch (err) {
        console.error(`Error al obtener documentos de CouchDB: ${err.message}`);
        throw err;
    }
};

/**
 * Obtiene un documento de CouchDB por su ID.
 * @param {string} id ID del documento a recuperar.
 * @returns {Promise<object>} Promesa que se resuelve con el documento solicitado.
 * @throws {Error} Si ocurre un error al obtener el documento por ID.
 */
const getDocumentById = async (id) => {
    try {
        const doc = await couchDB.get(id);
        return doc;
    } catch (err) {
        console.error(`Error al obtener documento de CouchDB por ID: ${err.message}`);
        throw err;
    }
};

/**
 * Actualiza un documento existente en CouchDB.
 * @param {string} id ID del documento a actualizar.
 * @param {object} doc Objeto con los nuevos datos del documento.
 * @returns {Promise<object>} Promesa que se resuelve con la respuesta de CouchDB después de la actualización.
 * @throws {Error} Si ocurre un error durante la actualización del documento.
 */
const updateDocument = async (id, doc) => {
    try {
        const existingDoc = await getDocumentById(id);
        doc._id = id;
        doc._rev = existingDoc._rev;
        const response = await couchDB.insert(doc);
        return response;
    } catch (err) {
        console.error(`Error al actualizar documento en CouchDB: ${err.message}`);
        throw err;
    }
};

/**
 * Elimina un documento de CouchDB por su ID.
 * @param {string} id ID del documento a eliminar.
 * @returns {Promise<object>} Promesa que se resuelve con la respuesta de CouchDB después de eliminar el documento.
 * @throws {Error} Si ocurre un error durante la eliminación del documento.
 */
const deleteDocument = async (id) => {
    try {
        const existingDoc = await getDocumentById(id);
        const response = await couchDB.destroy(id, existingDoc._rev);
        return response;
    } catch (err) {
        console.error(`Error al eliminar documento de CouchDB: ${err.message}`);
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
