const express = require("express");
const app = express();
const bodyP = require("body-parser");
const pathToStaticFiles = process.env.CODE_EDITOR_PATH;

if (!pathToStaticFiles) {
    console.error("Environment variable CODE_EDITOR_PATH is not set.");
    process.exit(1);
}

app.use(express.static(pathToStaticFiles));
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);
app.use(bodyP.json());
app.use(express.static("public"));

const fs = require('fs');
const path = require('path');

function clearJavaTemp() {
    const javaTempPath = path.join(__dirname, 'temp');
    console.log("Clearing Java temp folder at:", javaTempPath);

    fs.rm(javaTempPath, { recursive: true, force: true }, (err) => {
        if (err) console.error("Failed to delete Java temp folder:", err);
        else console.log("Java temp folder cleared.");
    });
}

app.get("/", function (req, res) {
    compiler.flush(() => {
        console.log("Temporary files deleted.");
    });
    res.sendFile(`${pathToStaticFiles}/IDE.html`);
});

app.post("/compile", function (req, res) {
    const code = req.body.code;
    const input = req.body.input;
    const lang = req.body.lang;
    console.log("Received language:", lang);
    
    try {
        if (lang === "c++") {
            const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (!input) {
                compiler.compileCPP(envData, code, function (data) {
                    res.send(data.output ? data : { output: "Error" });
                    compiler.flush(() => console.log("Temporary files deleted."));
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    res.send(data.output ? data : { output: "Error" });
                    compiler.flush(() => console.log("Temporary files deleted."));
                });
            }
        } else if (lang === "java") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compileJava(envData, code, function (data) {
                    res.send(data.output ? data : { output: "Error" });
                    compiler.flush(() => {
                        console.log("Temporary files deleted.");
                        clearJavaTemp();  // Clear temp after flushing
                    });
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    res.send(data.output ? data : { output: "Error" });
                    compiler.flush(() => {
                        console.log("Temporary files deleted.");
                        clearJavaTemp();  // Clear temp after flushing
                    });
                });
            }
        } else if (lang === "python") {
            const envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function (data) {
                    res.send(data.output ? data : { output: "Error" });
                    compiler.flush(() => console.log("Temporary files deleted."));
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    res.send(data.output ? data : { output: "Error" });
                    compiler.flush(() => console.log("Temporary files deleted."));
                });
            }
        } else {
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
