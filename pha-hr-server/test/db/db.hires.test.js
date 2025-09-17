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

test('Get All Doc: hires', async ()=> 
{
    const result = await getAllItemFromCollection("hires");
    expect(result.length).toBe(50);
});

test("Get Hire By Title", async () => {
    const result = await getItemsFromCollection({"title":"Sales Manager"}, "hires");
    expect(result.length).toBe(1);
    expect(result[0]["hire_date"]).toBe("2022-01-15");
});

test("Add Hire", async () => {
    const addUserResult = await addToCollection({"first_name": "p1", "last_name": "p2"}, "users");
    const addHireResult = await addToCollection({"user_id":addUserResult["insertedId"],"title": "bigTitle"}, "hires")
    expect(addHireResult["acknowledged"]).toBe(true);
    expect(addHireResult["insertedId"]).toBeDefined();
});

test("Update Hire", async() => {
    const addResult = await addToCollection({"first_name": "p2", "last_name": "p2"}, "users");
    const addHireResult = await addToCollection({"user_id":addResult["insertedId"],"title": "smallTitle"}, "hires")

    let body = {
        "_id": addHireResult["insertedId"].toString(),
        "title": "Customer",
        "salary": 500
    };
    const result = await updateDocumentInCollection(body, "hires");

    expect(result["modifiedCount"]).toBe(1);
    expect(result["matchedCount"]).toBe(1);
});

test("Delete Hire By Title", async() => {
    const addResult = await addToCollection({"first_name": "p3", "last_name": "p3"}, "users");
    const addHireResult = await addToCollection({"user_id":addResult["insertedId"],"title": "itch"}, "hires")
    
    const result = await deleteDocumentInCollection({"title": "itch"}, "hires");
    expect(result["deletedCount"]).toBe(1);
});

test("Delete User By Id", async() => {
    const addResult = await addToCollection({"first_name": "pl", "last_name": "pl"}, "users");
    const addHireResult = await addToCollection({"user_id":addResult["insertedId"],"title": "pop"}, "hires");
    const result = await deleteDocumentInCollection({"_id": addHireResult["insertedId"]}, "hires");
    expect(result["deletedCount"]).toBe(1);
})