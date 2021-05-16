const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app=express();

app.use(bodyParser.json());



//storing the data of the books

const books = [
    {
        "author": "Mitch Albom",
        "country": "US",
        "language": "English",
        "pages": 200,
        "title": "The 5 People You Meet in Heaven",
        "year": 1969
    },
    {
        "author": "Rick Riordan",
        "country": "US",
        "language": "English",
        "pages": 300,
        "title": "PJO",
        "year": 2005
    },

];

/**
 * Using the same access token as jwt_authentication as secret
 *  is shared between them. 
 * Authentication done in jwt_authentication.
 * Authorization of users done here.
 */

const SecretAccessToken = 'secretaccesstoken';

const authenticateJWT = (req,res,next)=>{

/**
 * Initially, authorization header will have "basic [JWT token]". 
 * So, split them by spaces to get just the two items, then 
 * take just the second (index-1) item to get your JWT token.
 */

        const authHeader=req.headers.authorization;

        //if authentication is successful:

        if(authHeader){

        const token=authHeader.split(' ')[1];

        /**
         * jwt.verify ensures that client is sending back to the 
         * server the token with the same signature that was sent to it 
         * by the server
         */

         jwt.verify(token,SecretAccessToken,(err,user)=>{

            if(err){

                return res.sendStatus(403);

                /**
                 * Status code 403 indicates that 
                 * authentication was successful, but authorisation
                 * was refused.
                 * 
                 * Per my understanding, this means that
                 * secret access token might have matched, but the 
                 * signature was modified on the client side. 
                 *
                 */

            }

            /**
             * Attaching user object to the request after successful
             * verification
             */

            req.user=user;

            /**
             * after middleware function is finished, 
             * next() is used to pass control to the next line of code
             * below the function
             */

            next();

         });

        }

         else{
            
            /**
             * Authentication itself was unsuccessful, as 
             * secret access token did not match. So
             * status code 401 indicates authentication and authorisation
             * are both unsuccessful.
             */
            res.sendStatus(401);

         }

    };

    /**
     * After authentication is complete,
     * retrieve the data of the books.
     * 
     */

    app.get('/books',authenticateJWT,(req,res)=>{

        res.json(books);

    })

app.listen(3000,()=>{

    console.log('listening on port 3000!');

});