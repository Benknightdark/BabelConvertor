const recursive = require("recursive-readdir");
const fs = require('fs');
const babel = require("@babel/core")
const returnIgnoreFiles = () => ["*.compiled", "*.xlsx", "*.diagram", "*.svg",
    "*.css", "*.pdb", "*.mp3", "*.ogg", "*.vbhtml", "*.xml", "*.cs",
    "*.dll", "*.jpg", "*.png", "*.gif", "*.t4", "*.datasource", "*.config", "*.json",
    "*.php", "*.ico", "*.map", "*.resx", "*.dwg", "*.eot", "*.woff", "*.ttf", "*.eot", "*.otf", "*.min.js", "*.txt", "LICENSE", "*.ashx"];

const getFileRecursive = () => new Promise((resolve, reject) => {
    recursive("D://MDM", returnIgnoreFiles()).then(
        function (files) {
            // console.log("files are", files);
            resolve(files);
        },
        function (error) {
            resolve(error);
        }
    );
});
getFileRecursive()
    .then(res => {
        res.map(d => {
            console.log(d);
            babel.transformFileAsync(d, {
                presets: [
                    [
                        "@babel/preset-env",
                        {

                            // for uglifyjs...
                            forceAllTransforms: true,
                        },
                    ],
                ],
            })
                .then(result => {
                    fs.writeFileSync(d, result.code);
                });
        })
    })
