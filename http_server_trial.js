const http=require('http');

//think of this as importing the http library

//requesting a listener


const requestListener=function(req,res){


    //req not used here
    
//response code 200 - signalling success

res.writeHead(200);

res.end("hello world!");

}

//create a server out of it

const server=http.createServer(requestListener);


//listen to it from this port

server.listen(8080);