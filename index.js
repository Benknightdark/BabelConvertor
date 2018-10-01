var recursive = require("recursive-readdir");
const fs = require('fs');

const returnIgnoreFiles=()=> ["*.compiled","*.xlsx","*.diagram","*.svg",
"*.css","*.pdb","*.mp3","*.ogg","*.vbhtml","*.xml","*.cs",
"*.dll","*.jpg","*.png","*.gif","*.t4","*.datasource","*.config","*.json",
"*.php","*.ico","*.map","*.resx","*.dwg","*.eot","*.woff","*.ttf","*.eot","*.otf","*.min.js","*.txt","LICENSE","*.ashx"];

const getFileRecursive=()=>  new Promise((resolve, reject) => {
    recursive("D://MDM", returnIgnoreFiles()).then(
    function(files) {
      console.log("files are", files);
      resolve(files);
    },
    function(error) {
        resolve(error);
    }
  );
});
getFileRecursive()
.then(res=>{
      fs.writeFileSync('abc.json', JSON.stringify(res)  );  
})
