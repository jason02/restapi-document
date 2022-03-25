const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');


class  Server{

    constructor(){
        this.app = express();
        this.app.use( cors() );
        this.port = process.env.PORT;
      

        this.app.use(bodyParser.urlencoded({ extended: true }))
        
        this.app.use(bodyParser.json())

        this.userRoutePath='/api/document';

        //Rutas de la aplicación
        this.routes();

        //CORS
      

        //Lectura y parseo del body
        this.app.use(express.json() );

        //Directorio público
        this.app.use( express.static('public'));
    }

    routes(){
    this.app.use( this.userRoutePath, require('./routes/document'));
    
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en puerto', this.port);
        } ) ;
    }

}

module.exports= Server;