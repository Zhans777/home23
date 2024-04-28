import fs from "fs";
import http from "http";
import url from "url";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import templatesTags from './modules/templatesTags.js';


const host = "localhost";
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const baseTemplate = fs.readFileSync(`${__dirname}/templates/cars.html`, "utf-8");
const carCard = fs.readFileSync(`${__dirname}/templates/car-card.html`, "utf-8");
const carDetail = fs.readFileSync(`${__dirname}/templates/car-detail.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const dataObj = JSON.parse(data);



const server = http.createServer((req,res)=>{
    console.log(req.url);
    const {query, pathname} =url.parse(req.url, true);

    if ((pathname === "/") || (pathname === '/cars')){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHTML = dataObj.map(el => templatesTags(carCard, el)).join('');
        const output = baseTemplate.replace('{% carCards %}', cardsHTML)
        res.end(output);

    } else if (pathname === "/car") {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id]
        const output = templatesTags(carDetail, product)
        res.end(output);
    } else {
        res.writeHead(404, {
            'Content':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('<h1>Page cannot be found</h1>')
    }
});

server.listen(port, host, ()=>{
    console.log(`Server started at http://${host}:${port}`)
})