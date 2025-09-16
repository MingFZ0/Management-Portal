import express, { json } from 'express';
import { addToCollection, deleteDocumentInCollection, deleteMultiDocumentsInCollection, getAllHiresFromCollection, getAllItemFromCollection,getCollectionCount, getHireByID, getItemFromCollection, updateDocumentInCollection} from '../api.js';
import { BSON, ObjectId } from 'mongodb';


async function updateHire(input) {
    let department_id = input["department_id"];
    let id = input["_id"];
    let salary = input[""];

    const bodyData = {
        "_id": await ObjectId.createFromHexString(input["_id"]),
        "department_id": await ObjectId.createFromHexString(input["department_id"]),
        "user_id": await ObjectId.createFromHexString(input["user_id"]),
        "title": input["title"],
        "salary": input["salary"]
    };

    let result = updateDocumentInCollection(bodyData, "hires");
    return result;
}

async function getAllHires() {
    console.log("Getting All Hires");
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
    const cursor = await getItemFromCollection(nameFilter, "departments");
    
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
    const combinedData = {
        "title": data["title"],
        "salary": data["salary"],
        "hire_date": data["hire_data"],
        "user_id": user_id,
        "department_id": department_id
    };

    const result = await addToCollection(combinedData, "hires");
    return result;
}

var hires_router = express.Router();

//curl --header "Content-Type: application/json" --request POST --data '{"first_name":"very","last_name":"thing"}' http://localhost:5005/pharma/hr/api/hires/
hires_router.post('/',
    async function(req, response) {
        console.log("Posting new hire...");
        console.log(" - Create new user");
        let userResult = await createUserForHire(req.body);
        const userID = userResult["insertedId"];
        // console.log(userID);
        console.log("   - " + userResult);

        console.log(" - Finding Department: " + req.body["department"]);
        let department;
        let departmentID;
        department = await getDepartmentOfHire(req.body["department"]);
        
        if (department != null) {console.log("   - Found Department: " + department);}
        else {
            department = await createDepartmentForHire(req.body["name"]);
            console.log("   - Create new department: " + department);
        }
        departmentID = department["_id"];

        console.log(" - Creating Hire...");
        let hireResult = await JSON.stringify(await createHireInformation(req.body, userID, departmentID));
        console.log("   - Created Hire: " + hireResult);
        return response.send(hireResult);
    }
)

hires_router.get('/',
    async function(req, response) 
    {
        console.log(req.query);
        let result = null;
        if (req.query.length = 0) {result = await getAllHires();}
        else {
            console.log("Get Hire By Detail: " + await JSON.stringify(req.query));
            result = await getHireByID(req.query);
            console.log(result);
        }
        return response.send(result);
    }
)

hires_router.put('/',
    async function(req, response)
    {
        let displayInput = await JSON.stringify(req.body);
        console.log("Putting data: " + displayInput);
        const result = updateHire(req.body);
        return result;

    }
)

hires_router.delete('/',
    async function(req, response) {
        let display = await JSON.stringify(req.body);
        console.log("Deleting data: " + display);

        let bodyData = {"_id": await ObjectId.createFromHexString(req.body['_id'])};
        const result = deleteDocumentInCollection(bodyData, "hires");
        return result;
    }
)



export default hires_router;