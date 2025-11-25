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

async function getItemsFromCollection(data, collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.find(data).toArray();
    // console.log("Found: " + result);
    return result;
}

/**
 * 
 * @param {*} collectionName 
 * @returns an array that contains all of the items
 */
async function getAllItemFromCollection(collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.find().toArray();
    return result;
}

async function getCollectionCount(collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);
    const result = await collection.countDocuments();
    return result;
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
    const result = await collection.insertOne(data).then();
    console.log("Added to " + collectionName);
    console.log(result);
    return result;
}

/**
 * 
 * @param {*} data Must contain "_id" for document to be updated
 * @param {*} collectionName 
 * @returns 
 */
async function updateDocumentInCollection(data, collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);

    let idValue = data['_id'];
    const filter = { _id: ObjectId.createFromHexString(idValue) };

    // Specify the update to set values using _id as the filter ("WHERE" clause)
    delete data._id; //Get rid of the immutable _id prop otherwise mongo will complain
    const updateDoc = { $set: data };//Update the whole row.  $set is the mongo cmd to set the doc fields
    console.log(data);
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

async function getAllHiresFromCollection() {
    const db = await connect();
    const hires = db.collection("hires");
    let aggCursor = hires.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "result"
                }
            }, 
            {
                $lookup: {
                    from: "departments",
                    localField: "department_id",
                    foreignField: "_id",
                    as: "res"
                }
            },
            {
                $addFields: {
                    result: {
                        $arrayElemAt: ["$result", 0]
                    }
                }
            },
            { 
                $project: {
                    "first_name": "$result.first_name",
                    "last_name": "$result.last_name",
                    "contact": "$result.contact",
                    "department": "$res.name",
                    "title": "$title",
                    "salary": "$salary"
                }
            }
    ]);
    
    let joinedData = [];
    for await (const element of aggCursor) {
        joinedData.push(element);
    }
    return joinedData;
}

async function getHireByID(filter) {
    const db = await connect();
    const hires = db.collection("hires");
    
    const hire_id = {"_id": ObjectId.createFromHexString(filter["_id"])};
    
    const result = await hires.findOne(hire_id);
    return result;
}

async function updateHireInCollection(data, collectionName) {
    const db = await connect();
    const collection = db.collection(collectionName);

    let idValue = data['_id'];
    const filter = { _id: ObjectId.createFromHexString(idValue) };

    // Specify the update to set values using _id as the filter ("WHERE" clause)
    delete data._id; //Get rid of the immutable _id prop otherwise mongo will complain
    let updateDoc;
    if (data["user_id"] != null && data["department_id"] != null) {
        updateDoc = { $set: {
        department_id: ObjectId.createFromHexString(data["department_id"]),
        user_id: ObjectId.createFromHexString(data["user_id"]),
        title: data["title"],
        salary: data["salary"]
    } };
    } else if (data["department_id"] != null) {
        updateDoc = { $set: {
        department_id: ObjectId.createFromHexString(data["department_id"]),
        title: data["title"],
        salary: data["salary"]
    } };
    } else {
        updateDoc = { $set: {
        title: data["title"],
        salary: data["salary"]
    } };
    }
    //Update the whole row.  $set is the mongo cmd to set the doc fields
    const result = await collection.updateOne(filter, updateDoc);
    return result;
}

async function getHireCountOfDepartments() {
     const db = await connect();
    const hires = db.collection("hires");
    let aggCursor = hires.aggregate([
            {
                $lookup: {
                    from: "departments",
                    localField: "department_id",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: "$result"
            },
            {
                $group: {
                    _id: "$result.name",
                    count: {$sum: 1}
                }
            }
    ]);
    
    let joinedData = [];
    for await (const element of aggCursor) {
        joinedData.push(element)
    }
    return joinedData;
}

async function getDepartmentAvgSalary() {
    const db = await connect();
    const hires = db.collection("hires");
    let aggCursor = hires.aggregate([
        {
            $lookup: {
            from: "departments",
            localField: "department_id",
            foreignField: "_id",
            as: "dept"
            }
        },
        { $unwind: "$dept" },
        {
            $group: {
            _id: "$dept._id",                        // group by department
            department_name: { $first: "$dept.name" },
            average_salary: { $avg: "$salary" }      // compute average salary
            }
        },
        {
            $project: {
            _id: 0,
            department_name: 1,
            average_salary: 1
            }
        }
    ]);
    
    let joinedData = [];
    for await (const element of aggCursor) {
        joinedData.push(element)
    }
    return joinedData;
}


export {getCollections, getMyCollection, addToCollection, getAllItemFromCollection, getItemsFromCollection, getCollectionCount,
    updateDocumentInCollection, deleteDocumentInCollection, deleteMultiDocumentsInCollection, getAllHiresFromCollection, getHireByID,
    updateHireInCollection, getHireCountOfDepartments, getDepartmentAvgSalary
};