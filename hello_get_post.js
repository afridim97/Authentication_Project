var http=require('http');

//imported the module

var server=http.createServer((req,res)=>{

var pathname=url.parse(req.url);

//check the url endpoint

if(pathname!=='/hello')
    return errorHandler(res,404);

var method=req.method.toUpperCase;

//check if GET or POST

res.setHeader('Content-Type', 'application/json');
res.writeHead(200, 'request is good');

if(method=='POST'){

  var response=JSON.stringify({message:'Hello from POST'});

    res.end(response);
}

if(method=='GET'){

var response=JSON.stringify({message:'hello from GET'});

res.end(response);

}

});

function errorHandler(res,code){

    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`)


}

server.listen(7050,()=>{

console.log('listening on port 7050');

});