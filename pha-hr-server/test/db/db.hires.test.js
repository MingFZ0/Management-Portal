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
