import express from 'express';
import {addUser} from "../api.js";
import { initDB, loadDB } from '../utils/load_db.js';
import { readCSV } from '../utils/readcsv.js';

var users_rounter = express.Router();

users_rounter.post('/init', 
    async function(req, response)
    {
        await initDB();

        return response.send("ok");
    }
)


users_rounter.post('/', 
    async function(req, response)
    {
        console.log("Post:", req.body);
        addUser(req.body);
        return response.send("ok");
    }
)


export default users_rounter;