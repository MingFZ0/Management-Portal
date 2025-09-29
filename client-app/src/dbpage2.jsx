import React from 'react';
import {Component} from 'react';

//You can do function/ hook or good old class-component
class DBPage2 extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {pingData:"default"};
    }

    getData= async ()=>
    {
        //Ping the server
        //Use 'await' to synchronise the API calls
        let pingResult = await fetch('http://localhost:5005/ping'); 
        //fetch returns a promise, so have to convert that to text -- also an async call
        let returnData = await pingResult.text();
        //Convert the string to JSON object
        this.setState({pingData:returnData});
    }

    componentDidMount()
    {
        this.getData();
    }
    render(){
        return(
            <div>
            <h2>Page2</h2>
            <p>Ping result</p>
            <ul><li>{this.state.pingData}</li></ul>
            </div>
        )
    }

}
export default DBPage2;