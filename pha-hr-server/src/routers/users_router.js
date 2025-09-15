import express from 'express';
import { addUser, getAllUsers } from '../api.js';

var users_rounter = express.Router();

users_rounter.post('/', 
    async function(req, response)
    {
        console.log("Post:", req.body);
        addUser(req.body);
        return response.send("ok");
    }
)

users_rounter.get('/', 
    async function(req, response) {
        console.log("Get All:")
        let cursor = await getAllUsers();
        
        let result = [];
        for await (const element of cursor) {
            result.push(element)
        }

        console.log(result);
        return response.send(result);
    }
)




export default users_rounter;