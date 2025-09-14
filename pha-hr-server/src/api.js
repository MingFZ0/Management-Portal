import { connect } from "./utils/swen343_db_utils.js";


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


export {getCollections, addUser, getAllUsers};