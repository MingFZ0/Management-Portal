import { Box, Button, CardContent, CardHeader, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RecordPanel from "./RecordPanel";
import { SearchRecord } from "./SearchRecord";

export function Record() {

    

    let currentColumns = [];
    const userColumns = [
        {field:"id", headName: "ID", width: 100},
        {field:"first_name", headName: "First Name"},
        {field:"last_name", headName: "Last Name"},
        {field: "email", headName: "Email"},
        {field: "address", headName: "Address", width: 70},
    ]

    const departmentColumns = [
        {field:"id", headName: "ID", width: 100},
        {field:"name", headName: "Department", width: 180},
    ]

    const hireColumns = [
        {field:"id", headName: "ID", width: 100},
        {field:"first_name", headName: "First Name"},
        {field:"last_name", headName: "Last Name"},
        {field: "email", headName: "Email"},
        {field: "address", headName: "Address", width: 70},
        {field:"title", headName: "Title", width: 200},
        {field:"department", headName: "Department", width: 180},
        {field:"salary", headName: "Salary", type: 'number'}
    ]

    const [collectionData, setCollectionData] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [columnData, setColumnData] = useState(hireColumns);
    const [rowData, setRowData] = useState();

    async function getData() {

        let userData = [];
        let departmentData = [];
        let hireData = [];
        try {
            let apiUrl = import.meta.env.VITE_API_URL;
            console.log(`Getting Data; API URL is ${apiUrl}`);
            
            let userResult = await fetch(`http://${apiUrl}/users`);

            let departmentResult = await fetch(`http://${apiUrl}/departments`);

            let hireResult = await fetch(`http://${apiUrl}/hires`);
            console.log("HJIRE: " + hireResult.status);
            // console.log(hireResult)

            if (userResult.status == 200) {
                let rawData = await userResult.text();
                let data = JSON.parse(rawData);
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    let email = null;
                    let address = null;

                    if (data[i].contact != null) {
                        email = data[i]["contact"]["email"];
                        address = data[i]["contact"]["address"];
                    }

                    let row = {
                        id: data[i]["_id"],
                        first_name: data[i]["first_name"],
                        last_name: data[i]["last_name"],
                        email: email,
                        address: address,
                    };
                    userData.push(row);
                }
            }

            if (departmentResult.status == 200) {
                let rawData = await departmentResult.text();
                let data = JSON.parse(rawData);
                for (let i = 0; i < data.length; i++) {
                    let row = {
                        id: data[i]["_id"],
                        name: data[i]["name"],
                    };
                    departmentData.push(row);
                }
            }

            if (hireResult.status == 200) {
                let rawHireData = await hireResult.text();
                let tempHireData = JSON.parse(rawHireData);
                console.log(tempHireData[0]["first_name"]);
                for (let i = 0; i < tempHireData.length; i++) {
                    // console.log(tempHireData[i]);
                    let email = null;
                    let address = null;

                    if (tempHireData[i].contact != null) {
                        email = tempHireData[i]["contact"]["email"];
                        address = tempHireData[i]["contact"]["address"];
                    }

                    let row = {
                        id: tempHireData[i]["_id"],
                        first_name: tempHireData[i]["first_name"],
                        last_name: tempHireData[i]["last_name"],
                        email: email,
                        address: address,
                        department: tempHireData[i]["department"],
                        title: tempHireData[i]["title"],
                        salary: tempHireData[i]["salary"]
                    };
                    hireData.push(row);
                }
            }
            try {
                console.log(hireData);
                setCollectionData({users: userData, departments: departmentData, hires: hireData});
                setRowData(hireData);
                
                
            } catch (err) {
                console.log("JSON parse:" + err);
            }

        } catch (err) {
            console.log("Fetch failed: " + err);
        }

        return;
    }

    async function handleTabChange(event, value) {
        setTabValue(value);
        if (value == 0) {
            console.log(collectionData.hires);
            setRowData(collectionData.hires);
            setColumnData(hireColumns);
        }
        else if (value == 1) {
            console.log(collectionData.departments);
            setRowData(collectionData.departments);
            setColumnData(departmentColumns);
        }
        else {
            console.log(collectionData.users);
            setRowData(collectionData.users);
            setColumnData(userColumns);
        }
    }

    useEffect(() => {setTimeout(getData, 0)}, []);
    


    return (
        <Box>    
            <Tabs value={tabValue} onChange={handleTabChange} className="tabs">
                <Tab label="Hires" value={0}></Tab>
                <Tab label="Departments" value={1}></Tab>
                <Tab label="Users" value={2}></Tab>
            </Tabs>
            {/* <SearchRecord></SearchRecord> */}
            <DataGrid
                columns={columnData}
                rows={rowData}
                checkboxSelection
                initialState={{pagination: { page: 0, pageSize: 5, rowsPerPage: 15 }}}
                // pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
        </Box>
    )
}

export default Record;