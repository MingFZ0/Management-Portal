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

test('Get All Doc: departments', async ()=> 
{
    const result = await getAllItemFromCollection("departments");
    expect(result.length).toBe(12);
});

test("Get Department Clinical Research", async () => {
    const result = await getItemsFromCollection({"name":"Clinical Research"}, "departments");
    expect(result.length).toBe(1);
    expect(result[0]["name"]).toBe("Clinical Research");
});

test("Add Department Manager Production", async () => {
    const result = await addToCollection({"name": "Manager Production"}, "departments");
    expect(result["acknowledged"]).toBe(true);
    expect(result["insertedId"]).toBeDefined();
});

test("Update Department", async() => {
    const addResult = await addToCollection({"name": "Law Production"}, "departments");
    
    let body = {
        "_id": addResult["insertedId"].toString(),
        "name": "bobTBuilder"
    };
    const result = await updateDocumentInCollection(body, "departments");

    expect(result["modifiedCount"]).toBe(1);
    expect(result["matchedCount"]).toBe(1);
});

test("Delete Department By Name", async() => {
    const addResult = await addToCollection({"name": "Mario Production"}, "departments");
    const result = await deleteDocumentInCollection({"name": "Mario Production"}, "departments");
    expect(result["deletedCount"]).toBe(1);
});

test("Delete Department By Id", async() => {
    const addResult = await addToCollection({"name": "Luig Production"}, "departments");
    console.log(addResult);
    const result = await deleteDocumentInCollection({"_id": addResult["insertedId"]}, "departments");
    expect(result["deletedCount"]).toBe(1);
})