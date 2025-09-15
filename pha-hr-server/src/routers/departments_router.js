import express, { json } from 'express';
import { addToCollection, getCollectionCount } from '../api';

var departments_router = express.Router();

async function deleteDepartmentByID(id) {
    console.log("Deleting department of ID: " + id);

    let filter = {"_id": await ObjectId.createFromHexString(id)};
    const result = await deleteDocumentInCollection(id, "departments");
    return result;
}

async function deleteDepartmentbyDetail(filter) {
    const result = await deleteMultiDocumentsInCollection(filter, "users");
    return result;
}

async function getAllDepartments() {
    console.log("Get All From departments");
    let cursor = await getAllItemFromCollection("departments");
    let result = [];
    for await (const element of cursor) {
        result.push(element);
    }
    return result;
}

async function getDepartment(filter) {
    let details = await JSON.stringify(filter);
    console.log("Get Department By: " + details);

    let cursor;
    if (filter["_id"] != null) {
        let idFilter = {"_id": await ObjectId.createFromHexString(filter["_id"])};
        cursor = await getItemFromCollection(idFilter, "departments");
    } else {cursor = await getItemFromCollection(filter, "departments");}

    let result = [];
    for await (const element of cursor) {
        result.push(element);
    }

    console.log(result);
    return result;
}

departments_router.post('/',
    async function(req, response) {
        console.log("Post to departments:", req.body);
        let result = await addToCollection(req.body, "departments");
        return response.send(result);
    }
)

departments_router.get('/count',
    async function(req, response) {
        console.log("Get Count From " + "departments");
        let result = await getCollectionCount("departments");
        console.log(result);
        return response.send({count: result});
    }
)

departments_router.get('/',
    async function(req, response) {
        let result = null;
        console.log(req.query);
        if (req.url.length > 1) {result = await getDepartment();} 
        else {result = await getAllDepartments();}
        return response.send(result);
    }
)

departments_router.put('/',
    async function(req, response) {
        console.log(req.body);
        const result = await updateDocumentInCollection(req.body, "departments");
        return response.send("ok");   
    }
)

users_rounter.delete('/',
    async function(req, response) {

        let result;
        if (req.query["_id"] != null) {result = await deleteDepartmentByID(req.query["_id"]);}
        else {result = deleteDepartmentbyDetail(req.query);}

        const returnResult = await JSON.stringify(result);
        return response.send(returnResult);
    }
)


export default departments_router;