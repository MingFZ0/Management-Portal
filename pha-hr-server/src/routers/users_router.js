import express from 'express';
import { addToCollection, getAllItemFromCollection,getCollectionCount} from '../api.js';

var users_rounter = express.Router();

users_rounter.post('/', 
    async function(req, response)
    {
        console.log("Post to users:", req.body);
        addToCollection(req.body, "users");
        return response.send("ok");
    }
)

users_rounter.get('/', 
    async function(req, response) {
        console.log("Get All From:" + "users")
        let cursor = await getAllItemFromCollection("users");
        
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
        console.log("Get Count From:" + "users")
        let result = await getCollectionCount("users");
        console.log(result);
        return response.send({count: result});
    }
)





export default users_rounter;