const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync('home.html', "utf8");
const replaceval =(tempval, ogval)=>{
    let temp = tempval.replace("{%temp%}", ogval.main.temp);
     temp = temp.replace("{%tempmin%}", ogval.main.temp_min);
     temp = temp.replace("{%tempmax%}", ogval.main.temp_max);
     temp = temp.replace("{%location%}", ogval.name);
     temp = temp.replace("{%Country%}", ogval.sys.country);
     return temp;
}
const server = http.createServer((req, res)=>{
    if(req.url == "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=73d09f8c2805b1b98b86fc810fbdd047")
        .on("data", (chunk)=>{ 
            const objdata = JSON.parse(chunk);
            const arrdata = [objdata];
            const realtimedata = arrdata.map((val) =>replaceval(homeFile,val)).join("");
                res.write(realtimedata);
        })
        .on("end", (err)=>{
            if(err) console.log("connection closed coz of error", err)
            // console.log("end");
            res.end();
        });
    }
});
server.listen(8000, "127.0.0.1")
