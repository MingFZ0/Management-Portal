import { ObjectId } from "mongodb";
import { connect } from "./utils/swen343_db_utils.js";

// curl --header "Content-Type: application/json" --request POST --data '{"item":"something","price":"9.95", "vegetarian": "no"}' http://localhost:5005/restaurant/api/menu
// curl --header "Content-Type: application/json" --request PUT --data '{"_id":"68c82e4a3cfe3c0b73c3a042","first_name":"sam"}' http://localhost:5005/pharma/hr/api/users
// curl --header "Content-Type: application/json" --request DELETE http://localhost:5005/pharma/hr/api/users?_id=

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
    // console.log("Found: " + result);
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

async function updateDocumentInCollection(data, collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);

    let idValue = data['_id'];
    const filter = { _id: ObjectId.createFromHexString(idValue) };

    // Specify the update to set values using _id as the filter ("WHERE" clause)
    delete data._id; //Get rid of the immutable _id prop otherwise mongo will complain
    const updateDoc = { $set: data };//Update the whole row.  $set is the mongo cmd to set the doc fields
    const result = await collection.updateOne(filter, updateDoc);
    return result;
}

async function deleteDocumentInCollection(filter, collectionName){
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(filter);
    const strResult = await JSON.stringify(result);
    console.log("Deleted:" + strResult);
    return result;
}

async function deleteMultiDocumentsInCollection(filter, collectionName){
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.deleteMany(filter);
    const strResult = await JSON.stringify(result);
    console.log("Deleted:" + strResult);
    return result;
}


export {getCollections, getMyCollection, addToCollection, getAllItemFromCollection, getItemFromCollection, getCollectionCount,
    updateDocumentInCollection, deleteDocumentInCollection, deleteMultiDocumentsInCollection
};