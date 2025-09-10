import {connect} from './utils/swen343_db_utils.js'


/**
 * getAllEmployees(): is a function that is responsible for allowing you
 * request a list of employees stored in the database.
 */
async function getAllEmployees()  { 
    const db = await connect();
    const collection = db.collection('employees');
    const employees = await collection.find({}).toArray();
    console.log(employees);
    return employees;
}

async function getCollections() {
    const db = await connect();
    let dbList = await db.listCollections().toArray();

    return dbList;
}


async function getMyCollection()
{
    const db = await connect();
    const collection = db.collection('mycollection');
    const mine = await collection.find({}).toArray();
    console.log(mine);
    return mine; 
}

export { getAllEmployees, getCollections, getMyCollection};