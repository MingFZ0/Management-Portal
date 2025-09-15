

test('Call add user', async() => {
  let url = 'http://localhost:5005/pharma/hr/users/api';
  let result = await fetch(url, {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: {"first_name": "Bobby", "last_name":"Greatness"}
    });
  
});