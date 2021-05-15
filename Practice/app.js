var http=require('http');

http.createServer(function(req,res){

res.write("hello!");

res.end();

}).listen(3000,function(){

    console.log("listening on port 3000");

});