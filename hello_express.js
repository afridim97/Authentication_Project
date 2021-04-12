const express = require('express');

const url=require('url');

const app=express();

const port=7050;

const querystring=require('querystring');



app.get('/hello',(req,res)=>{

let requrl=url.parse(req.url);

let query=querystring.parse(requrl.query);

console.log(query.name);

res.write('hello '+query.name);

res.end();

});

app.post('/hello',(req,res)=>{

    res.write('hello from POST');
    
    res.end();

    });

app.listen(port,()=>{

console.log('hello! listening from port 7050');
        
 });