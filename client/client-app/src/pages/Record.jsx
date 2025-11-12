import { Box, Button, CardContent, CardHeader, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Searcher from "./Searcher";
import Adder from "./Adder";
import Edit from "./Edit";
import Footer from "./footer";

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
    const [rowData, setRowData] = useState({});
    const [editRow, setEditRow] = useState({});

    async function parseUser(fetchedData) {
        let returnData = [];
        let rawData = await fetchedData.text();
        let data = JSON.parse(rawData);
        // console.log(data)
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
            returnData.push(row);
        }
        return returnData;
    }

    async function parseDepartment(fetchedData) {
        let returnData = [];
        let rawData = await fetchedData.text();
        let data = JSON.parse(rawData);
        for (let i = 0; i < data.length; i++) {
            let row = {
                id: data[i]["_id"],
                name: data[i]["name"],
            };
            returnData.push(row);
        }
        return returnData;
    }

    async function parseHire(fetchedData) {
        let returnData = [];
        let rawHireData = await fetchedData.text();
        let tempHireData = JSON.parse(rawHireData);
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
            returnData.push(row);
            // console.log(returnData);
        }
        return returnData;
    }

    async function getData() {

        let userData = [];
        let departmentData = [];
        let hireData = [];
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            console.log(`Getting Data; API URL is ${apiUrl}`);
            
            let userResult = await fetch(`http://${apiUrl}/users`);

            let departmentResult = await fetch(`http://${apiUrl}/departments`);

            let hireResult = await fetch(`http://${apiUrl}/hires`);

            if (userResult.status == 200) {
                userData = await parseUser(userResult);
            }

            if (departmentResult.status == 200) {
                departmentData = await parseDepartment(departmentResult);
            }

            if (hireResult.status == 200) {
                hireData = await parseHire(hireResult);
                // console.log(hireData);

            }
            try {
                // console.log(hireData);
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
        await getData();
        if (value == 2) {
            console.log(collectionData.users);
            setRowData(collectionData.users);
            setColumnData(userColumns);
        }
        else if (value == 1) {
            console.log(collectionData.departments);
            setRowData(collectionData.departments);
            setColumnData(departmentColumns);
        }
        else {
            console.log(collectionData.hires);
            setRowData(collectionData.hires);
            setColumnData(hireColumns);
        }
    }

    function onEdit(params, event) {
        setEditRow(params);
        console.log("Editing");
    }

    let onEditExit = () => {
        setEditRow(null);
        console.log("Exiting Edit");
        getData();
    }

    const updateRowdata = (data, selectedCategory) => {
        console.log(data);
        if (selectedCategory == "users") {setColumnData(userColumns)}
        else if (selectedCategory == "departments") {setColumnData(departmentColumns)}
        if (selectedCategory == "hires") {setColumnData(hireColumns)}
        setRowData(data);

    }

    useEffect(() => {setTimeout(getData, 0)}, []);
    


    return (
        <Box>    
            <Tabs value={tabValue} onChange={handleTabChange} className="tabs">
                <Tab label="Hires" value={0}></Tab>
                <Tab label="Departments" value={1}></Tab>
                <Tab label="Users" value={2}></Tab>
                
                
            </Tabs>
            <Searcher updateRowdata={updateRowdata}></Searcher>
            <Adder updateDefaultData={getData}></Adder>
            <Edit onEdit={editRow} onEditExit={onEditExit} categorySelected={tabValue}></Edit>
            <DataGrid
                columns={columnData}
                rows={rowData}
                editMode="row"
                onRowClick={onEdit}
                initialState={{
                    pagination: {
                    paginationModel: { pageSize: 7, page: 0 },
                    },
                }}
                // paginationModel={{pageSize: 15}}
                
                // pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
            />
            <Footer></Footer>
        </Box>
    )
}

export default Record;