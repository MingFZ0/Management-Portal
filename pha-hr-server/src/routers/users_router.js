import express, { json } from 'express';
import { addToCollection, getAllItemFromCollection,getCollectionCount, getItemFromCollection, updateDocumentInCollection} from '../api.js';
import { ObjectId } from 'mongodb';

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
    let details = await JSON.stringify(filter);
    console.log("Get Users By: " + details);

    if (filter['_id'] != null) {
        filter['_id'] = ObjectId.createFromHexString(filter['_id']);
    }
    const cursor = await getItemFromCollection(filter, "users");

    let result = [];
    for await (const element of cursor) {
        result.push(element);
    }

    return result;
}

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

//curl http://localhost:5005/pharma/hr/api/users
users_rounter.get('/', 
    async function(req, response) {
        // console.log(req.baseUrl,req.url);
        // console.log(req.query);//Look at all query string params
        // console.log(req.query['id']);
        let result = null;
        console.log(req.query);
        if (req.url.length > 1) {result = await getUsersByDetail(req.query);} 
        else {result = await getAllUser();}

        return response.send(result);
        
    }
)

users_rounter.put('/',
    async function(req, response) {
        console.log(req.body);
        // console.log("Updating id of " + req.body['_id'] + ": " + req.body);
        const result = await updateDocumentInCollection(req.body, "users");
        return response.send("ok");
    }
)


export default users_rounter;