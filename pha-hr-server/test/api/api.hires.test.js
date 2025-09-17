import { json } from "express";
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

test("List Hires", async() => {
    let url = 'http://localhost:5005/pharma/hr/api/hires';
    const result1 = await (await fetch(url)).json();
    expect(result1.length).toBe(50);
})

test("POST Hire: check id", async() => {
    let url = 'http://localhost:5005/pharma/hr/api/hires';
    let bodyData = await JSON.stringify({
        "first_name": "Johnny",
        "last_name": "Sues",
        "department": "Fires",
        "title": "Manager",
        "salary": 2000,
        "hire_date": "2020-05-07"
    });

    let result = await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: bodyData
    });

    let id = (await result.json())["insertedId"];

    let searchUrl = "http://localhost:5005/pharma/hr/api/hires?_id=" + id;
    let searchResult =  await (await fetch(searchUrl)).json();

    expect(searchResult["title"]).toBe("Manager");
    expect(searchResult["salary"]).toBe(2000);

});

test("PUT Hire", async() => {
    let url = 'http://localhost:5005/pharma/hr/api/hires';
    let bodyData = await JSON.stringify({
        "first_name": "Bobmen",
        "last_name": "Halls",
        "department": "Water",
        "title": "Mcdonalds",
        "salary": 20000,
        "hire_date": "2021-07-08"
    });

    let result = await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: bodyData
    });

    let id = (await result.json())["insertedId"];
    
    let putData = await JSON.stringify({
        "_id": id,
        "title": "BurgerKing",
        "salary": 2000,
        "hire_date": "2021-07-08"
    });

    await fetch(url, {method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: putData
    });

    let searchUrl = "http://localhost:5005/pharma/hr/api/hires?_id=" + id;
    let searchResult =  await (await fetch(searchUrl)).json();

    expect(searchResult["title"]).toBe("BurgerKing");
    expect(searchResult["salary"]).toBe(2000);
    expect(searchResult["hire_date"]).toBe("2021-07-08");
})

test("DELETE Hire", async() => {
    let url = 'http://localhost:5005/pharma/hr/api/hires';
    let bodyData = await JSON.stringify({
        "first_name": "Ballistic",
        "last_name": "Tall",
        "department": "Toy",
        "title": "Nope",
        "salary": 20,
        "hire_date": "2010-01-01"
    });

    let putResult = await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: bodyData
    });
    
    let id = (await putResult.json())["insertedId"];

    let deleteBody = await JSON.stringify({"_id": id});
    await JSON.stringify(await fetch(url, {method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: deleteBody
    }));

    let searchUrl = "http://localhost:5005/pharma/hr/api/hires?_id=" + id;
    let searchResult =  await JSON.stringify(await fetch(searchUrl));

    expect(searchResult).toBe("{}");
})