import { Box, Button, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import RecordPanel from "./RecordPanel";

export function Record() {

    const [collectionData, setCollectionData] = useState([]);

    const columns = [
        {field:"id", headName: "ID", width: 100},
        {field:"first_name", headName: "First Name", width: 70},
        {field:"last_name", headName: "Last Name", width: 70},
        {field: "email", headName: "Email", width: 70},
        {field: "address", headName: "Address", width: 70},
        {field:"title", headName: "Title", width: 70},
        {field:"department", headName: "Department", width: 70},
        {field:"salary", headName: "Salary", type: 'number'}
    ]

    async function getData() {

        let userData = null;
        let departmentData = null;
        let hireData = [];
        try {
            let apiUrl = import.meta.env.VITE_API_URL;
            console.log(`Getting Data; API URL is ${apiUrl}`);
            
            let userResult = await fetch(`http://${apiUrl}/users`);
            // console.log(userResult);
            userData = await userResult.text();

            let departmentResult = await fetch(`http://${apiUrl}/departments`);
            // console.log(departmentResult);
            departmentData = await departmentResult.text();

            let hireResult = await fetch(`http://${apiUrl}/hires`);
            console.log("HJIRE: " + hireResult.status);
            // console.log(hireResult)

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

                    // console.log(row);
                    hireData.push(row);
                }
            }

           

            try {
                setCollectionData({users: userData, departments: departmentData, hires: hireData});
                
            } catch (err) {
                console.log("JSON parse:" + err);
            }
            // console.log(userData);
            // console.log(departmentData);
            // console.log(hireData);

        } catch (err) {
            console.log("Fetch failed: " + err);
        }

        return;
    }

    useEffect(()=> {setTimeout(getData, 0)}, [])
    console.log(collectionData.hires);

    

    return (
        <Box>
            <Button className="FilterButton" variant="contained">Filter</Button>
            <DataGrid
                columns={columns}
                rows={collectionData.hires}
                checkboxSelection
                sx={{ border: 0 }}
                />
        </Box>
    )
}

export default Record;