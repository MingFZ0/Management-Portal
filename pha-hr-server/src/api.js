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

async function getMyCollection()
{
    const db = await connect();
    const collection = db.collection('mycollection');
    const mine = await collection.find({}).toArray();
    console.log(mine);
    return mine; 
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
async function addToCollection(data, collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data).then((val) => JSON.parse(JSON.stringify(val)));
    console.log("Added to " + collectionName);
    return result;
}

async function getItemFromCollection(data, collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.find(data).toArray();
    console.log("Found: " + result);
    return result;
}

async function getAllItemFromCollection(collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.find();
    return result;
}

async function getCollectionCount(collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.countDocuments();
    return result;
}


export {getCollections, getMyCollection, addToCollection, getAllItemFromCollection, getItemFromCollection, getCollectionCount};