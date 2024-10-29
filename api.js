const express = require("express");
const app = express();
const bodyP = require("body-parser");
app.use(bodyP.json());
app.use(express.static("C:/Users/Brinda/Desktop/dsw1/Code-Editor"));
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile("C:/Users/Brinda/Desktop/dsw1/Code-Editor/IDE.html");
});

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try {
        if (lang === "Cpp") {
            var envData = { OS: "windows", cmd: "g++" }; // uses g++ command to compile
            if (!input) {
                compiler.compileCPP(envData, code, function (data) {
                    res.send(data);
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    res.send(data);
                });
            }
        } else {
            res.send({ output: "Language not supported" });
        }
    } catch (e) {
        console.log("error", e);
        res.send({ output: "error" });
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
