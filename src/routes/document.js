
const { Router } = require('express');
const { getDocuments, getAuthenticateDocument, loadDocument } = require('../controllers/document');


 const router= Router();

 router.get('/files', getDocuments);
 router.post('/authenticate-document', getAuthenticateDocument);
 router.post('/load-document', loadDocument);
 // router.post('/', registerUser);
 // router.get('/validate', validateUser);

module.exports= router;