async function testPing()
{
    let result = await fetch('http://localhost:5005/ping')
    let data =  await result.text()
    return data;
}
async function testCollections()
{
    let result = await fetch('http://localhost:5005/managedb/collections')
    let data =  await result.json()
    return data;
}
async function testDocs()
{
    let result = await fetch('http://localhost:5005/mycollection')
    let data =  await result.json()
    return data;
}

export  {testPing, testCollections, testDocs};