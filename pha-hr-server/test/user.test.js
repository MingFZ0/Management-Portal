import { json } from "express";

test('Call add user', async() => {
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