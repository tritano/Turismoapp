const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/documento', inventoryController.createDocument);
router.get('/documentos', inventoryController.getDocuments);
router.put('/documento/:id', inventoryController.updateDocument);
router.delete('/documento/:id', inventoryController.deleteDocument);

module.exports = router;
