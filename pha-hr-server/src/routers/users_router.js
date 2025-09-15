import express, { json } from 'express';
import { addToCollection, getAllItemFromCollection,getCollectionCount, getItemFromCollection} from '../api.js';
import { ObjectId } from 'mongodb';

var users_rounter = express.Router();

users_rounter.post('/', 
    async function(req, response)
    {
        console.log("Post to users:", req.body);
        let result = await addToCollection(req.body, "users");
        return response.send(result);
    }
)

users_rounter.get('/count', 
    async function(req, response) {
        console.log("Get Count From " + "users")
        let result = await getCollectionCount("users");
        console.log(result);
        return response.send({count: result});
    }
)

users_rounter.get('/', 
    async function(req, response) {
        // console.log(req.baseUrl,req.url);
        // console.log(req.query);//Look at all query string params
        // console.log(req.query['id']);
        let result = null;
        console.log(req.body);
        if (req.url.length > 1) {result = await getUsersByDetail(req.body);} 
        else {result = await getAllUser();}

        return response.send(result);
        
    }
)

async function getAllUser() {
    console.log("Get All From " + "users");
    let cursor = await getAllItemFromCollection("users");
    let result = [];
    for await (const element of cursor) {
        result.push(element)
    }

    // console.log(result);
    return result;
}

async function getUsersByDetail(filter) {
    console.log("Get Users By: " + filter)
    const result = await getItemFromCollection(filter, "users");
    return result;
}



export default users_rounter;