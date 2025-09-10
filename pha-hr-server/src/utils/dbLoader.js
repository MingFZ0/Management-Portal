import { readCSV } from "./csvReader.js";
import {EJSON} from 'bson';
import { closeClient, connect } from "./swen343_db_utils.js";

export async function insertUserTableData(users, data) {
    let first = data["First name"];
    let last = data["Last name"];
    let email = data["Email"];
    let address = data["Address"];
    let result = await users.insertOne({
        "first_name": first,
        "last_name": last,
        "contact": {"email": email, "address": address}})
    .then((val) => JSON.parse(JSON.stringify(val)));
    
    return result["insertedId"];
}

export async function insertHireTableData(hires, data) {
    let title = data["Job title"];
    let salary = data["Salary"];
    let start_date = data["Hire date"];
    let result = await hires.insertOne({
        "title": first,
        "salary": last,
        "hire_date": start_date
    }).then((val) => JSON.parse(JSON.stringify(val)));
    return result["insertedId"];
}


export async function resetDB(myDB, name) {
    console.log("Dropping and Creating:", name);
    await myDB.collection(name).drop();
    await myDB.createCollection(name);
    return myDB.collection(name);
}

export async function initDB(url)
{
    let dataSet = await readCSV(url);
    const myDB = await connect();
    console.log(`dataSet length=${dataSet.length}`)
    
    const users = await resetDB(myDB, "users");
    const departments = await resetDB(myDB, "departments");
    const hires = await resetDB(myDB, "hires");

    let all_department = {};

    for (var index = 0; index < dataSet.length; index++) //Beware the async map
    {
        let current_department = dataSet[index]["Department"];
        all_department[current_department] = 1;

        let user_id = await insertUserTableData(users, dataSet[index]);

        
        
        
    }
    return;
}





export async function test() {
    
}


