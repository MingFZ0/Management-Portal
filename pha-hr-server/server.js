import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import  path from 'path';
import cors from 'cors';

import { initDB } from './src/utils/dbLoader.js';
import users_rounter from './src/routers/users_router.js';
import departments_router from './src/routers/departments_router.js';

import { getCollectionCount, getCollections, getMyCollection} from './src/api.js';
import hires_router from './src/routers/hires_router.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, "./data");

const app = express();
app.use(cors()); //Enable cors for client-server APIs
app.use(express.json());//Enables simpe data extraction for RESTful API data

//curl http://localhost:5005/ping
app.get('/ping', function (req, res) {return res.send('pong');});

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

//curl http://localhost:5005/mycollection  
app.get('/mycollection', 
    async function(req, result) 
    {
        let res = await getMyCollection();
        return result.send(res);
    }
)

app.get('/hr/api/init',
    async function(req, response) {
        console.log("Resetting DB...");
        await initDB(join(dataDir, "pharmahr.csv"));
        let result = await getCollectionCount("users");

        let returnResult = await JSON.stringify({"count":result})
        console.log(returnResult);
        return response.send(returnResult);
    }
)

app.use('/hr/api/users/', users_rounter);
app.use('/hr/api/departments/', departments_router);
app.use('/hr/api/hires/', hires_router);

//Starts the server, listening on the specified PORT and prints a message when it starts
app.listen(process.env.PORT, ()=> {
    // let data = readCSV("./data/pharmahr.csv").then((re) => initDB(re));

    initDB("./data/pharmahr.csv").then();
    console.log(">>> Node Express Server listening on port: " + process.env.PORT);
} ); 