var http=require('http');

var url=require('url');
//imported the module

var server=http.createServer((req,res)=>{

const path_name=url.parse(req.url).pathname;

console.log(path_name);
//check the url endpoint

if(path_name!=='/hello')
    return errorHandler(res,404);

var method=req.method.toUpperCase();

console.log(method);
//check if GET or POST

res.setHeader('Content-Type', 'text/html');
res.writeHead(200, 'request is good');

if(method=='POST'){

  res.write('hello from POST');

    res.end();
}

if(method=='GET'){

res.write('hello from GET');

res.end();

}

});

function errorHandler(res,code){

    res.statusCode = code 
    res.end(`{"error": "${http.STATUS_CODES[code]}"}`)


}

server.listen(7050,()=>{

console.log('listening on port 7050');

});