//Aim: To understand a simple application of JWT token

const express=require('express');

const app=express();

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//storing user details in an array 

const users = [
    {
        username: 'Afridi',
        password: 'password123',
        role: 'admin'
    }, {
        username: 'Majeed',
        password: 'password123user',
        role: 'user'
    }
];

//secret to sign access token

const SecretAccessToken = 'secretaccesstoken';

/*
*
* Verifies login details, then generates and signs access token
*
* Purpose of signing access token: Security feature to ensure that access token 
*
* has not been changed
*
*/

app.post('/login',(req,res)=>{

//obtain username and password from request body (entered through input)

const {username,password}=req.body;

//search in users array if there is a match for entered username and pwd

const user=users.find(u=>{

return u.username===username && u.password===password;

});

/**
 * Client (you) is sending authentication request to the server. 
 * 
 * Server responds by sending the below token to the client.
 * 
 * This token contains information about the user (here, username and role).
 * 
 * Client will send future requests with this token so that
 * 
 * server recognizes it.
 * 
 * Server is sending a signed token to verify that 
 * 
 * this token has not been changed.
 */

 if(user){
    
    const accessToken=jwt.sign({username:user.username,role:user.role},SecretAccessToken);

    res.json({accessToken});

}

else{

    res.send('Username or password incorrect');
}

});


app.listen(7050,()=>{console.log('listening on port 7050!')});