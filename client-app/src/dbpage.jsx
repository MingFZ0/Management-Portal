import React, {useState, useEffect} from 'react';

export default function DBPage()
{
    let [collections, setCollections] = useState(null);
    let [collInfo, setCollInfo] = useState(null);

    useEffect(() => {
        getData()}
        ,[])

    async function getData()
    {
        //Get a list of the collections
        //Use 'await' to synchronise the API calls
        let allCollections = await fetch('http://localhost:5005/managedb/collections'); 
        //fetch returns a promise, so have to convert that to text -- also an async call
        let returnData = await allCollections.text();
        //Convert the string to JSON object
        let jsonData = JSON.parse(returnData);
        setCollections(jsonData);

        //Use the collection name from prior API call to build URL to get the collection data
        //Have to use local variable, since 'state' is not yet updated
        let collData = await fetch('http://localhost:5005/' + jsonData[0].name)
        returnData = await collData.text();
        jsonData = JSON.parse(returnData);
        setCollInfo(jsonData)
    }

    //useEffect runs after the first render, so do a null check
    let data = collections==null?"":collections[0].name;
    let collData = collInfo==null?"":collInfo[0].firstName;
    return(
        <div style={{margin: '30px'}}>
        <h2>DB Page</h2>
        <h4>Collection List</h4>
        <ul style={{paddingLeft:'20px'}}><li>{data}</li></ul>
        <h4>Collection Data</h4>
        <ul style={{paddingLeft:'20px'}}><li>{collData}</li></ul>
        </div>
    )
}