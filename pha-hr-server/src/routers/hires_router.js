import express, { json } from 'express';
import { addToCollection, deleteDocumentInCollection, deleteMultiDocumentsInCollection, getAllItemFromCollection,getCollectionCount, getItemFromCollection, updateDocumentInCollection} from '../api.js';
import { BSON, ObjectId } from 'mongodb';

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
    for await (const element of cursor) {
        department.push(element);
    }
    
    return department[0];
}

async function createDepartmentForHire(name) {
    let filter = {"name": name};
    const result = await addToCollection(filter, "departments");
    return result;
}

async function createHireInformation(input, user_id, department_id) {
    let data = await JSON.stringify(input);
    const bodyData = {
        "title": data["title"],
        "salary": data["salary"],
        "hire_date": data["hire_data"],
        "user_id": user_id,
        "department_id": department_id
    };

    const result = await addToCollection(bodyData, "hires");
    return result;
}

var hires_router = express.Router();

//curl --header "Content-Type: application/json" --request POST --data '{"first_name":"very","last_name":"thing"}' http://localhost:5005/pharma/hr/api/hires/
hires_router.post('/',
    async function(req, response) {
        console.log("Posting new hire...");
        console.log(" - Create new user");
        let userResult = await JSON.stringify(await createUserForHire(req.body));
        const userID = userResult["insertedId"];
        console.log("   - " + userResult);

        console.log(" - Finding Department: " + req.body["department"]);
        let department = await JSON.stringify(await getDepartmentOfHire(req.body["department"]));
        let departmentID = department["insertedId"];
        if (department != null) {console.log("   - Found Department: " + department);}
        else {
            department = await JSON.stringify(await createDepartmentForHire(req.body["name"]));
            console.log("   - Create new department: " + department);
            departmentID = department["insertedID"];
        }

        console.log(" - Creating Hire...");
        let hireResult = await JSON.stringify(await createHireInformation(req.body, userID, departmentID));
        console.log("   - Created Hire: " + hireResult);
        return response.send(hireResult);
    }
)

export default hires_router;