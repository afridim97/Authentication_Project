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

/**
 * Enter username and password for authentication
 * 
 * Enter details to be updated (school, house, or both)
 * 
 * Searches array of existing users for matching username and password
 * 
 * If found, updates the provided details for that user in the array
 * 
 * If not found, returns 401 "authentication error" message, indicating 
 * 
 * invalid username and/or password 
 */

app.put("/update",(req,res)=>{

//initial part similar to sending a POST request

const userData={};

const errors={};

['username','password','school','house'].forEach(key=>{

    if(req.body[key]===null||req.body[key]===undefined){

        errors[key]=`${key} is undefined`;
        
    }

    else if(req.body[key]===""){

        errors[key]=`${key} is empty`;

    }

    else{

        userData[key]=req.body[key];

    }

});

    if(Object.keys(errors).length>0){

        res.status(400).json(errors);

        return;

    }

    /**
     * Loops through array of existing users to find a 
     * 
     * match for the username and password provided.
     * 
     * If found, sets isValid to true and saves index 
     * 
     * of this user object in the array.
     * 
     */

    let isValid=false;

    let requestedUserIndexinAllUsers=-1;

    for(let i=0;i<allUsersData.length;i++){

        const alreadyExistingUser=allUsersData[i];

        if(alreadyExistingUser.username==userData.username && alreadyExistingUser.password==userData.password){

            isValid=true;

            requestedUserIndexinAllUsers=i;

            break;

        }

    }

    if(!isValid){

/**
 * 
 * If username and/or password not found, sends error code 401 indicating
 * failed authentication.
 * 
*/

        res.status(401).json({message:"Username/password is invalid"});

        return;
    }

    else{

//if found, updates this user object in array of user objects

        allUsersData[requestedUserIndexinAllUsers]=userData;

        res.json({message:"Update successful!"});
    }

});

/**
 * Retrieves information about the registered users
 * 
 * Made a copy of the array of users so that 
 * 
 * original user data is not unintentionally modified.
 * 
 * Password information of all users is deleted 
 * 
 * for user confidentiality before returning the details.
 * 
 */

app.get("/retrieve",(req,res)=>{

//creates a copy of the array of users
const usersDataCopy=JSON.parse(JSON.stringify(allUsersData));

usersDataCopy.forEach(user=>{

//deletes password parameter for all users

delete usersDataCopy['password'];

});

//returns array of users with all details except password

res.json(usersDataCopy);

});

app.listen(7050,()=>console.log("listening on port 7050"));