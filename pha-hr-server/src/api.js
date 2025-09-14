//#region General

/**
 * getCollections(): is a function that is responsible for allowing you
 * request a list of collections stored in the database.  
 * It extracts just the names into an array and returns the array
 */
async function getCollections() {
    const db = await connect();
    let colls = await db.listCollections().toArray();
    let names = [];
    for (var obj in colls)
    {
        names.push(colls[obj].name)
    }
    return names;
}
    //#endregion

//#region Users

import { connect } from "./utils/swen343_db_utils";

/**
 * Creates an user entry in the User collection
 * @param {Json} data Consists of fields for the User :
 *      {
 *          first_name,
 *          last_name,
 *          contact: {email, address}}
 * @returns {Json} mongo's return data :
 *      {ackowledged: bol, insertedId: id string}
 */
async function addUser(data) {
    const db = await connect();
    const users = db.collection("users");
    const result = await users.insertOne(data).then((val) => JSON.parse(JSON.stringify(val)));
    return result;
}

async function getAllUsers(params) {
    const db = await connect();
    const users = db.collection("users");
    const result = await users.find();
    return result;
}

async function getUser(params) {
    
}

async function updateUser(params) {
    
}

async function deleteUser(params) {
    
}
    //#endregion

//#region Departments
async function createDepartment(params) {
    
}

async function getAllDepartment(params) {
    
}

async function getDepartment(params) {
    
}

async function updateDepartment(params) {
    
}

async function deleteDepartment(params) {
    
}
    //#endregion

//#region Hires
async function createHire() {

}

async function getAllHires(params) {
    
}

async function getHire(params) {
    
}

async function updateHire(params) {
    
}

async function deleteHire(params) {
    
}
    //#endregion