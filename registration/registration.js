//importing the express module

const express=require('express');

//creating an object of the express module for use

const app=express();

/**  

* Needed when sending POST and PUT requests.

* This is because data is being sent to the server. 

* This way, it will recognise it as a JSON object.

* Therefore, parsing can take place. 

* Refer: https://www.geeksforgeeks.org/express-js-express-json-function/

*/

app.use(express.json());

// After registration of a user is complete, added to this array

const allUsersData=[];

/**

* Sending POST request to send data to URL "/register"

* for initial user registration

*/

app.post("/register",(req,res)=>{

//object to store each input parameter for user registration

const userData={};

/** 

* Object to store any input parameter of the user registration that 
* has an error 

*/

const errors={};

/**
 
 * The input parameters that need to be filled, 
 * taken one-by-one in a for-each loop 

*/

['username','password','school','house'].forEach(key=>{

/** 

* req.body will hold each parameter in key-value pairs

* Search for value of each key in req.body 

* If undefined or empty, store this key in errors object.

* This keeps a record of which keys do not have proper info

*/

if(req.body[key]===null || req.body[key]===undefined){

    errors[key]=`${key} is undefined`;

}
else if(req.body[key]===""){

    errors[key]=`${key} cannot be empty`;

}

else{//if all fine, stores data value of this key as given input by user
    userData[key]=req.body[key];
}
//end of for-each loop

});

/**
 * If even one error is present, sends error code 400 
 * 
 * Error code 400 indicates client error, 
 * 
 * So server will not process request.
 */

if(Object.keys(errors).length>0){

res.status(400).json(errors);

return;

}

/**
 * Checks if this user already exists in the database.
 * 
 * Loops through array of previously created users.
 * 
 * Searches for the username we are about to add to array of users.
 * 
 * If found, returns with client error.
 * 
 * Else, completes the registration by adding user to array of 
 * 
 * successfully registered users.
 */

let usernameAlreadyTaken=false;

//for each user in allUsersData

allUsersData.forEach(alreadyExistingUser=>{

//if match found, set boolean parameter to true

if(alreadyExistingUser.username==userData.username)
    usernameAlreadyTaken=true;

});

//if boolean parameter true, send error code

if(usernameAlreadyTaken){

    res.status(400).json({message:"username already taken!"});

    return;
}

//else, add this user to array of existing users

allUsersData.push(userData);

res.json({message:"user successfully registered"});



});

app.listen(7050,()=>console.log("listening on port 7050"));