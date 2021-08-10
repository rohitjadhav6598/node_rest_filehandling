var express = require('express');
var app = express();
var fs = require("fs");
const { request } = require('http');
const Joi = require('Joi');
app.use(express.json());


app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( JSON.parse(data) );
      res.send( JSON.parse(data) );
   });
})

app.get('/user/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      id = req.params.id;
      usr="user"+id;
      console.log( data[usr] );
      res.send( data[usr] );
   });
})

app.get('/user', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      id = req.query.id;
      usr="user"+id;
      console.log( data[usr] );
      res.send( data[usr] );
   });
})

app.post('/add', (req,res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
        password : Joi.string().min(3).required(),
        profession : Joi.string().min(3).required()

    });

    const result = schema.validate(req.body);
    console.log("schema result: ");console.log(result);
    console.log("request body: ");console.log(req.body);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }

   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       id = Object.keys(data).length + 1,
       usr="user"+id.toString();
       data[usr] = {
      "name" : req.body.name,
      "password" : req.body.password,
      "profession" : req.body.profession,
      "id": id
   };
       console.log( "object to be pushed " );console.log(data[usr]);
       fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), (err)=>{
         if( err ) {
             throw err;
            }
         });
       res.send( JSON.stringify(data));
    });
    //res.send(data.usr);
})

app.put('/edit/:id', (req,res) => {
   const schema = Joi.object({
       name : Joi.string().min(3).required(),
       password : Joi.string().min(3).required(),
       profession : Joi.string().min(3).required()

   });

   const result = schema.validate(req.body);
   console.log("schema result: ");console.log(result);
   console.log("request body: ");console.log(req.body);
   if(result.error)
   {
       res.status(400).send(result.error.details[0].message);
       return;
   }

  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      id = req.params.id;
      usr="user"+id;
      data[usr] = {
     "name" : req.body.name,
     "password" : req.body.password,
     "profession" : req.body.profession,
     "id": id
  };
      console.log( "object to be pushed " );console.log(data[usr]);
      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), (err)=>{
        if( err ) {
            throw err;
           }
        });
      res.send( JSON.stringify(data));
   });
   //res.send(data.usr);
})

app.delete('/delete/:id', (req,res) => {
   
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      id = req.params.id;
      usr="user"+id;
      console.log( "object to be deleted " );console.log(data[usr]);
      delete data[usr];

      fs.writeFile(__dirname + "/" + "users.json", JSON.stringify(data), (err)=>{
        if( err ) {
            throw err;
           }
        });
      res.send( JSON.stringify(data));
   });
   //res.send(data.usr);
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})