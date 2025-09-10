import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import  path from 'path';
import {getAllEmployees, getCollections, getMyCollection} from './src/api.js';
import cors from 'cors';

import { readCSV } from './src/utils/csvReader.js';
import { initDB } from './src/utils/dbLoader.js';



const app = express();
app.use(cors()); //Enable cors for client-server APIs
app.use(express.json());//Enables simpe data extraction for RESTful API data

//Will return 'pong' on the endpoint /ping
//curl http://localhost:5005/ping
app.get('/ping', function (req, res) {
 return res.send('pong');
});

//Will list the current collections in swen343db
//curl http://localhost:5005/managedb/collections
app.get('/managedb/collections', 
    async function(req, result) 
    {       
        let res = await getCollections();
        for (const element of res)
            console.log(element);
        return result.send(JSON.stringify(res));
    }
)

//Will list the contents of the collection named 'mycollection' 
//curl http://localhost:5005/mycollection  
app.get('/mycollection', 
    async function(req, result) 
    {
        let res = await getMyCollection();
        return result.send(res);
    }
)

// readCSV("data/pharmahr.csv").then((data) => {
//     // console.log(data);
// })

//Starts the server, listening on the specified PORT and prints a message when it starts
app.listen(process.env.PORT, ()=> {
    // let data = readCSV("./data/pharmahr.csv").then((re) => initDB(re));

    initDB("./data/pharmahr.csv").then();
    console.log(">>> Node Express Server listening on port: " + process.env.PORT);
} ); 