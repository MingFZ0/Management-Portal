import express, { json } from 'express';
import { addToCollection, deleteDocumentInCollection, deleteMultiDocumentsInCollection, getAllItemFromCollection,getCollectionCount, getItemFromCollection, updateDocumentInCollection} from '../api.js';
import { BSON, ObjectId } from 'mongodb';

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

    let cursor;
    if (filter["_id"] != null) {
        let idFilter = {"_id": await ObjectId.createFromHexString(filter["_id"])};
        cursor = await getItemFromCollection(idFilter, "users");
    } else {cursor = await getItemFromCollection(filter, "users");}

    let result = [];
    for await (const element of cursor) {
        result.push(element);
    }

    console.log(result);

    return result;
}

async function deleteUserByID(id) {
    console.log("Deleting user of ID: " + id);

    let filter = {"_id": await ObjectId.createFromHexString(id)};
    const result = await deleteDocumentInCollection(filter, "users");
    return result;
}

async function deleteMultipleUserByFilter(filter) {
    const result = await deleteMultiDocumentsInCollection(filter, "users");
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
        console.log("Get Count From " + "users");
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
        if (req.url.length > 1) {
            result = await getUsersByDetail(req.query);
        } 
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

users_rounter.delete('/',
    async function(req, response) {

        let result;
        if (req.query["_id"] != null) {result = await deleteUserByID(req.query["_id"]);}
        else {result = deleteMultipleUserByFilter(req.query);}

        const returnResult = await JSON.stringify(result);
        return response.send(returnResult);
    }
)


export default users_rounter;