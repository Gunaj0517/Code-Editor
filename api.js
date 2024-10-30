const express = require("express");
const app = express();
const bodyP = require("body-parser");
const pathToStaticFiles = process.env.CODE_EDITOR_PATH
app.use(express.static(pathToStaticFiles));
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bodyP.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(`${pathToStaticFiles}/IDE.html`);
});

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    console.log("Received language:", lang);
    try {
        if (lang === "c++") {
            var envData = { OS: "windows", cmd: "g++", options:{timeout:10000} }; // uses g++ command to compile
            if (!input) {
                compiler.compileCPP(envData, code, function (data) {
                     if(data.output){
            res.send(data);
        }
        else{
            res.send({output:"Error"})
        }
                });
        } 
        else {
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"Error"})
                    }
                });
            }
        }
        else if (lang == "java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                     if(data.output){
            res.send(data);
        }
        else{
            res.send({output:"Error"})
        }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                     if(data.output){
            res.send(data);
        }
        else{
            res.send({output:"Error"})
        }
                });
            }
        }
        else if (lang === "python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                     if(data.output){
            res.send(data);
        }
        else{
            res.send({output:"Error"})
        }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                     if(data.output){
            res.send(data);
        }
        else{
            res.send({output:"Error"})
        }
                });
            }
        }
        else {
            res.send({ output: "Language not supported" });
        }
    } catch (e) {
        console.error("Compilation error:", e);
        res.send({ output: "An error occurred during compilation." });
    }
    
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
