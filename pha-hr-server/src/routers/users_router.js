import express from 'express';
import { addUser, getAllUsers, getUserCount } from '../api.js';

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

users_rounter.get('/count', 
    async function(req, response) {
        console.log("Get User Count:")
        let result = await getUserCount();
        console.log(result);
        return response.send({count: result});
    }
)




export default users_rounter;