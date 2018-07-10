const http = require('http');
const fs = require('fs');
const mime = require('mime');
const path = require('path');
const querystring = require('querystring');

http.createServer((req,res)=>{
    let root = path.join(__dirname,'www');
    let urlPsth = querystring.unescape(req.url);
    let filePath = path.join(root,urlPsth);
    if(fs.existsSync(filePath)){
        fs.readdir(filePath,(err,files)=>{
            if(err){
                fs.readFile(filePath,(err,data)=>{
                    if(err){

                    }else{
                        res.writeHead(200,{
                            "content":mime.getType(filePath)
                        })
                        res.end(data)
                    }
                })
            }else{
                if(files.indexOf('index.html')!= -1){
                    fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
                        if(err){
    
                        }else{
                            res.writeHead(200,{
                                "content-type":"text/html;charset=utf-8"
                            })
                            res.end(data)
                        }
                    })
                }else{
                    let data = '';
                    for(let i =0;i <files.length;i++){
                        data +=`<h2><a href="${req.url=="/"?"":req.url}/${files[i]}">${files[i]}</a></h2>` 
                    }
                    res.writeHead(200,{
                        "content-type":"text/html;charset=utf-8"
                    })
                    res.end(data)
                }
            }
        })

    }else{
        res.writeHead(404,{
            "content-type":"text/html;charset=utf-8"
        })
        res.end(`
        <h1 style="font-size:50px;color:red;text-align:center;">not find 404</h1>
        <p>This url is not find in the server,please reset url</p>
        `)
    }

}).listen(8080,'127.0.0.1',()=>{
    console.log('listen 127.0.0.1:8080 success')
})