const Inventory = require('../models/Inventory');

// Crear un documento
exports.createDocument = async (req, res) => {
    try {
        const doc = req.body;
        const response = await Inventory.createDocument(doc);
        res.status(201).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Obtener todos los documentos
exports.getDocuments = async (req, res) => {
    try {
        const documents = await Inventory.getDocuments();
        res.status(200).send(documents);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Actualizar un documento
exports.updateDocument = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = req.body;
        const response = await Inventory.updateDocument(id, doc);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Eliminar un documento
exports.deleteDocument = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Inventory.deleteDocument(id);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
};
