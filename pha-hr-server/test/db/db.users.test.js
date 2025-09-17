import { addToCollection, deleteDocumentInCollection, getAllItemFromCollection, getItemsFromCollection, updateDocumentInCollection } from "../../src/api";
import { initDB } from "../../src/utils/dbLoader";
import { closeClient } from "../../src/utils/swen343_db_utils";

beforeAll(()=> {
    return initDB("./data/pharmahr.csv").then();
});

afterAll(() => {
    closeClient();
    return;
});

test('Get All Doc: users', async ()=> 
{
    const result = await getAllItemFromCollection("users");
    expect(result.length).toBe(50);
});

test("Get User Andrew", async () => {
    const result = await getItemsFromCollection({"first_name":"Andrew"}, "users");
    expect(result.length).toBe(1);
    expect(result[0]["first_name"]).toBe("Andrew");
});

test("Add User Mario Producer", async () => {
    const result = await addToCollection({"first_name": "Mario", "last_name": "Producer"}, "users");
    expect(result["acknowledged"]).toBe(true);
    expect(result["insertedId"]).toBeDefined();
});

test("Update User", async() => {
    const addResult = await addToCollection({"first_name": "Mario", "last_name": "Consumer"}, "users");
    
    let body = {
        "_id": addResult["insertedId"].toString(),
        "last_name": "Customer"
    };
    const result = await updateDocumentInCollection(body, "users");

    expect(result["modifiedCount"]).toBe(1);
    expect(result["matchedCount"]).toBe(1);
});

test("Delete User By Name", async() => {
    const addResult = await addToCollection({"first_name": "Jarrob", "last_name": "IDontKnow"}, "users");
    const result = await deleteDocumentInCollection({"last_name": "IDontKnow"}, "users");
    expect(result["deletedCount"]).toBe(1);
});

test("Delete User By Id", async() => {
    const addResult = await addToCollection({"first_name": "Bonnie", "last_name": "UrMother"}, "users");
    console.log(addResult);
    const result = await deleteDocumentInCollection({"_id": addResult["insertedId"]}, "users");
    expect(result["deletedCount"]).toBe(1);
})