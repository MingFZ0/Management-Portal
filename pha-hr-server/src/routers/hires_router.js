import express, { json } from 'express';
import { addToCollection, deleteDocumentInCollection, deleteMultiDocumentsInCollection, getAllHiresFromCollection, getAllItemFromCollection,getCollectionCount, getHireByID, getItemsFromCollection, updateDocumentInCollection, updateHireInCollection} from '../api.js';
import { BSON, ObjectId } from 'mongodb';


async function updateHire(input) {
    let id = input["_id"];
    let department_id = input["department_id"];
    let user_id = input["user_id"];
    
    const bodyData = {
        "_id": id,
        "department_id": department_id,
        "user_id": user_id,
        "title": input["title"],
        "salary": input["salary"]
    };

    let result = updateHireInCollection(bodyData, "hires");
    return result;
}

async function getAllHires() {
    // console.log("Getting All Hires");
    let result = await getAllHiresFromCollection();
    //console.log(result);
    return result;
}

async function createUserForHire(input) {
    let data = await JSON.stringify(input);
    const bodyData = {
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "contact": {
            "email": data["email"],
            "address": data["address"]
    }};
    const result = await addToCollection(bodyData, "users");
    return result;
}

async function getDepartmentOfHire(name) {
    let nameFilter = {"name": name};
    const cursor = await getItemsFromCollection(nameFilter, "departments");
    
    let department = [];
    for await (const element of cursor) {department.push(element);}
    return department[0];
}

async function createDepartmentForHire(name) {
    let filter = {"name": name};
    const result = await addToCollection(filter, "departments");
    return result;
}

async function createHireInformation(input, user_id, department_id) {
    let data = await JSON.stringify(input);
    // console.log("Hire Info: " + data);
    // console.log("   - user_id: " + user_id);
    // console.log("   - department_id: " + department_id);
    const combinedData = {
        "user_id": user_id,
        "department_id": department_id,
        "title": input["title"],
        "salary": input["salary"],
        "hire_date": input["hire_date"]
    };

    const result = await addToCollection(combinedData, "hires");
    return result;
}

async function deleteHireByID(id) {
    // console.log("Deleting user of ID: " + id);

    let filter = {"_id": await ObjectId.createFromHexString(id)};
    const result = await deleteDocumentInCollection(filter, "hires");
    return result;
}


var hires_router = express.Router();

//curl --header "Content-Type: application/json" --request POST --data '{"first_name":"very","last_name":"thing"}' http://localhost:5005/pharma/hr/api/hires/
hires_router.post('/',
    async function(req, response) {
        console.log("POST " + req.url  , req.body);
        // console.log("Posting new hire...");
        // console.log(" - Create new user");
        console.log(" - POST user");
        let userResult = await createUserForHire(req.body);
        const userID = await userResult["insertedId"];
        // console.log("   - " + userResult);

        // console.log(" - Finding Department: " + req.body["department"]);
        let department;
        let departmentID;
        department = await getDepartmentOfHire(req.body["department"]);
        
        if (department != null) {
            console.log(" - GET Department");
            // console.log("   - Found Department: " + department);
        }
        else {
            console.log(" - POST Department");
            department = await createDepartmentForHire(req.body["name"]);
            // console.log("   - Create new department: " + department);
        }
        departmentID = await department["insertedId"];

        // console.log(" - Creating Hire...");
        // console.log(userID, departmentID);
        console.log(" - POST hire");
        let hireResult = await JSON.stringify(await createHireInformation(req.body, userID, departmentID));
        // console.log("   - Created Hire: " + hireResult);
        return response.send(hireResult);
    }
)

hires_router.get('/',
    async function(req, response) 
    {   
        console.log("GET " + req.url , req.body);
        // console.log(req.query);
        let result = null;
        if (req.query["_id"] == null) {result = await getAllHires();}
        else {
            // console.log("Get Hire By Detail: " + await JSON.stringify(req.query));
            result = await getHireByID(req.query);
            // console.log(result);
        }
        return response.send(result);
    }
)

hires_router.put('/',
    async function(req, response)
    {
        console.log("PUT " + req.url , req.body);
        let displayInput = await JSON.stringify(req.body);
        // console.log("Putting data: " + displayInput);
        const result = await updateHire(req.body);
        return response.send(result);

    }
)

hires_router.delete('/',
    async function(req, response) {
        console.log("DELETE " + req.url , req.body);
        let display = await JSON.stringify(req.body);
        let result;
        if (req.query["_id"] != null) {
            result = deleteHireByID(req.query["_id"]);
        }
        let bodyData = {"_id": await ObjectId.createFromHexString(req.body['_id'])};
        result = await deleteDocumentInCollection(bodyData, "hires");

        return response.send(result);
    }
)



export default hires_router;