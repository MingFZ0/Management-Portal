import { json } from "express";
import { ObjectId } from "mongodb";

test('Add user and compare collection size', async() => {
  let url = 'http://localhost:5005/pharma/hr/api/users/';
  let data = JSON.stringify({"first_name": "Bobby", "last_name":"Greatness"});
  const count1 = await (await fetch(url + "count")).json();
  
  await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
  });

  const count2 = await (await fetch(url + "count")).json();

  expect(count2["count"]).toBe(count1["count"] + 1); 
});

test('Find all users and compare count', async() => {
  let url = 'http://localhost:5005/pharma/hr/api/users/';
  const result1 = await (await fetch(url)).json();
  const result2 = await (await fetch(url + "count")).json();
  expect(result1.length).toBe(result2["count"]);
})

test('Add user and check for id', async() => {
  let url = 'http://localhost:5005/pharma/hr/api/users/';
  let data = JSON.stringify({"first_name": "Rab", "last_name":"Goated"});
  
  const postResult = await (await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
  })).json();

  const id = postResult["insertedId"];
  console.log(id);

  let fetchUrl = "http://localhost:5005/pharma/hr/api/users?_id=" + id;
  const filter = {'_id': ObjectId.createFromHexString(id)};
  const getResult = await (await fetch(fetchUrl)).json();

  console.log(getResult);
  expect(getResult.length).toBeGreaterThan(0);
});


