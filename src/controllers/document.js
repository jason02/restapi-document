const {db} = require('../firebase')
const request = require("request");
const axios = require('axios');

const getDocuments = async(req = request, res = response) => {
  const email = req.query.email;
    const query = await db.collection("document")
    .where("email", "==", email).get();
    // const documents = query.docs[0].data()
    res.json({
        msg:'get API - controlador',
        documents:query.docs.map(doc => doc.data())
    });
}

/*
const registerUser = async(req, res = response) => {
 const { id, name, email, password, address, operatorId, operatorName }= req.body;


 let result = await validateCitizen(id);
 console.log('Validar result');
 console.log(result);

 let register = await registerCitizen(id, name, email, password, address);
 console.log('Validar register');
 console.log(register);
 
 const authFirebase =   await auth .createUser({
        displayName: name,
        email: email,
        emailVerified: false,
        password: password
      })
      .then((userRecord) => {
        console.log('importante');
        res.json({
            msg:'Successfully created new user',
            user: userRecord.uid
        });
      })
      .catch((error) => {
        console.log('Error creating new user:', error);
        res.json({
            msg:'Error creating new user:',
            user: error
        });
      });   
}*/

/*function getAuthenticateDocument(id, UrlDocument,documentTitle ) {
    return new Promise(resolve => {
        request("https://govcarpetaapp.mybluemix.net/apis/authenticateDocument/"+id+"/"+UrlDocument+"/"+documentTitle,(err,response,body)=>{ 
            console.log(response.body);
            resolve(response.statusCode);
        })
    });
  }*/

  // Api para probar en postman
const getAuthenticateDocument = async(req, res = response) =>{
 
  const { id, urlDocument, documentTitle }= req.body;
  console.log(id);
  request("https://govcarpetaapp.mybluemix.net/apis/authenticateDocument/"+id+"/"+urlDocument+"/"+documentTitle,(err,response,body)=>{ 
    res.json({ 
        status: 1,
        msg: response.body,
        code: response.statusCode
    });
  })
}

const loadDocument = async(req, res = response) => {
  const { id, urlDocument, documentTitle, email }= req.body;
  // const headers = req.headers.headers;
  const headers = req.header('tokenheaderkey');

  await axios.get('http://169.51.207.241:32127/api/user/validate-token', {headers:{headers}}).then(resp => {
     
    //  console.log(resp.status);
    //  console.log(resp)
    //  console.log(id);
      if(resp.status==200){
      const documents = db.collection('document').add({
        id:id,
        UrlDocument:urlDocument,
        documentTitle:documentTitle,
        email: email
      }).then((ref) => {
        console.log("Documento a??adido con ID: ", ref.id);
        res.json({
          msg:"Documento a??adido con ID: "+ ref.id,
          document:  ref.id,
          status: 1
        });
      });
      }else{
        res.json({
          msg:'No esta authorizado para cargar documentos',
          status: 2
        });
      }
  })
  .catch(err => {
      // Handle Error Here
      console.error(err);
      res.json({
        msg:'No esta authorizado para cargar documentos',
        status: 0
      });
  });


  
 }


 /* function registerCitizen() {
    return new Promise(resolve => {
        var body= {id: 123456834, name: "Yeison", email: "pepeeeswesee@gmail.com", password: '123456',  address: "Cra 54 # 45 -67", operatorId : 1,
        operatorName: "Operador Ciudadano Test"};
        body = JSON.stringify(body);
        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'https://govcarpetaapp.mybluemix.net/apis/registerCitizen',
            json:body
            //body:    "{'id': '3242233234','name': 'Yeison','email': 'pepeeeddesee@gmail.com','password': '123456'}"
          }, function(error, response, body){
            console.log(JSON.stringify(response));
            resolve(response.statusCode);
          });
    });*/

    
   /* const registerCitizen = async (id, name, email, password, address, operatorId, operatorName) => {
        try {
            const data = {id: id, name: name, email: email, password: password,  address: address, operatorId : 1,
             operatorName: "Operador Ciudadano"};
            const res = await axios.post('https://govcarpetaapp.mybluemix.net/apis/registerCitizen', data);
            console.log('Body: ', res.data);
            return(`Status: ${res.status}`);
        } catch (err) {
            console.error(err);
        }
    };*/



 

// Api para probar en postman
/*const validateUser = async(req, res = response) =>{
  request("https://govcarpetaapp.mybluemix.net/apis/validateCitizen/"+req.params.id,(err,response,body)=>{ 
    res.json({ 
        msg:'response code',
        users:response.statusCode
    });
  })
}*/




module.exports = {
    getDocuments,
    getAuthenticateDocument,
    loadDocument
    // registerUser,
    // validateUser
}