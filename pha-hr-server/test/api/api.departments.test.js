import { application, json, request } from "express";
import { ObjectId } from "mongodb";
import { initDB } from "../../src/utils/dbLoader";
import { closeClient } from "../../src/utils/swen343_db_utils";

beforeAll(() => {
  return initDB("./data/pharmahr.csv").then();
})

afterAll(() => {
  closeClient();
  return;
})

test('POST department: compare size', async() => {
    let url = "http://localhost:5005/pharma/hr/api/departments/";
    let data = JSON.stringify({"name": "balls"});
    const count1 = await (await fetch(url + "count")).json();
    
    await fetch(url, {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: data
    });

    const count2 = await (await fetch(url + "count")).json();

    expect(count2["count"]).toBe(count1["count"] + 1); 
});

test('GET all departments', async() => {
  let url = 'http://localhost:5005/pharma/hr/api/departments/';
  const result1 = await (await fetch(url)).json();
  const result2 = await (await fetch(url + "count")).json();
  expect(result1.length).toBe(result2["count"]);
});

test('POST departments: check id', async() => {
  let url = 'http://localhost:5005/pharma/hr/api/departments/';
  let data = JSON.stringify({"name":"nuts"});
  
  const postResult = await (await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
  })).json();

  const id = postResult["insertedId"];
  // console.log(id);

  let fetchUrl = "http://localhost:5005/pharma/hr/api/departments?_id=" + id;
  const filter = {'_id': ObjectId.createFromHexString(id)};
  const getResult = await (await fetch(fetchUrl)).json();

  console.log(getResult);
  expect(getResult.length).toBeGreaterThan(0);
});

test("PUT department", async() => {
  let url = 'http://localhost:5005/pharma/hr/api/departments/';
  let data = JSON.stringify({"name":"huge"});
  
  const postResult = await (await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
  })).json();

  const id = postResult["insertedId"];
  console.log("Department id is:" + id);

  let updateData = await JSON.stringify({"_id": id, "name":"small"});
  
  await fetch(url, {method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: updateData
  });

  let searchUrl = "http://localhost:5005/pharma/hr/api/departments?name=small"
  const getResult = await (await fetch(searchUrl)).json();

  expect(getResult.length).toBe(1);
});

test("DELETE department", async() => {
  let url = 'http://localhost:5005/pharma/hr/api/departments/';
  let data = JSON.stringify({"name":"cats"});
  
  const postResult = await (await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
  })).json();

  const id = postResult["insertedId"];
  console.log("Department id is:" + id);

  let idURL = "http://localhost:5005/pharma/hr/api/departments?_id=" + id;

  await fetch(idURL, {method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
  }).then();

  const getResult = await (await fetch(idURL)).json();

  console.log(getResult);
  expect(getResult.length).toBe(0);
})

test("Duplicate Department", async() => {
  let url = 'http://localhost:5005/pharma/hr/api/departments/';
  let data = JSON.stringify({"name":"up"});
  
  const postResult = await (await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
  })).json();

  const secondPostResult = await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
  });

  expect(secondPostResult.status).toBe(404);

  let parsedResult = await secondPostResult.json();
  expect(parsedResult["response"]).toBe("Department already exist");
})
