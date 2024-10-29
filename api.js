const express=require("express")
const app=express()
const bodyP=require("body-parser")
app.use(bodyP.json())
app.use(express.static("C:/Users/Brinda/Desktop/dsw1/Code-Editor"));
const compiler=require("compliex")
const options={stats:true}
compiler.init(options)
app.use(bodyP.json())
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile("C:/Users/Brinda/Desktop/dsw1/Code-Editor/IDE.html")
})
app.post("/compile",function(req,res){
    var code=req.body.code
    var input=reques.body.input
    var lang=req.body.lang
         //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    compiler.compileCPPWithInput(envData , code , input , function (data) {
        res.send(data);
    });   
})
app.listen(8000)
