import { readCSV } from "./csvReader.js";
import {EJSON, ObjectId} from 'bson';
import { closeClient, connect } from "./swen343_db_utils.js";
import { Db } from "mongodb";

/**
 * Drops and creates a new collection of the given name
 * @param {Db} myDB the db object that was returned from connect()
 * @param {String} name the name of the collection 
 * @returns {Db} an object representing the collection
 */
export async function resetDB(myDB, name) {
    console.log("Dropping and Creating:", name);
    await myDB.collection(name).drop();
    await myDB.createCollection(name);
    return myDB.collection(name);
}

/**
 * 
 * @param {Db} department the db object that represents department
 * @param {String} name the name of the department that is being searched for
 * @returns {String} the stringified objectId of the department within MongoDB
 */
export async function findDepartment(department, name) {
    let result = await department.findOne({"name": name});
    if (result == null) {
        result = await department.insertOne({"name": name});
    }
    const department_id = await JSON.parse(JSON.stringify(result))["_id"];
    return department_id;
}

/**
 * 
 * @param {Db} users the db collection 
 * @param data the json data collection that was parsed from the csvReader
 * @returns {String} the stringified objectId of the user within MongoDB
 */
export async function insertUserTableData(users, data) {
    let first = data["First name"];
    let last = data["Last name"];
    let email = data["Email"];
    let address = data["Home address"];
    let result = await users.insertOne({
        "first_name": first,
        "last_name": last,
        "contact": {"email": email, "address": address}})
    .then((val) => JSON.parse(JSON.stringify(val)));

    return result["insertedId"];
}

export async function completeHireTableData(hires, data, user_id, department_id) {
    let title = data["Job title"];
    let salary = data["Salary"];
    let start_date = data["Hire date"];
    let result = await hires.insertOne({
        "title": title,
        "salary": salary,
        "hire_date": start_date,
        "user_id": user_id,
        "department_id": department_id
    }).then((val) => JSON.parse(JSON.stringify(val)));
    return result["insertedId"];
}

/**
 * This method kicks starts the initization of the db
 * 
 * @param {String} The url to the csv file link
 * @returns 
 */
export async function initDB(url)
{
    let dataSet = await readCSV(url);
    const myDB = await connect();
    console.log(`dataSet length=${dataSet.length}`)
    
    const usersDB = await resetDB(myDB, "users");
    const departmentsDB = await resetDB(myDB, "departments");
    const hiresDB = await resetDB(myDB, "hires");

    let all_department = {};

    for (var index = 0; index < dataSet.length; index++) //Beware the async map
    {
        let department_id = await findDepartment(departmentsDB, dataSet[index]["Department"]);
        let user_id = await insertUserTableData(usersDB, dataSet[index]);
        await completeHireTableData(hiresDB, dataSet[index], user_id, department_id);
    }
    return;
}





export async function test() {
    
}


