
const { Router } = require('express');
const { getDocument, getAuthenticateDocument, loadDocument } = require('../controllers/document');


 const router= Router();

 router.get('/', getDocument);
 router.get('/authenticate-document', getAuthenticateDocument);
 router.post('/load-document', loadDocument);
 // router.post('/', registerUser);
 // router.get('/validate', validateUser);

module.exports= router;