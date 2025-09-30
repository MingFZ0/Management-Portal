import { Box, Button, CardContent, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";
import RecordPanel from "./RecordPanel";

export function Record() {

    const [collectionData, setCollectionData] = useState([]);

    async function getData() {

        let userData = null;
        let departmentData = null;
        let hireData = null;
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
            // console.log(hireResult);
            hireData = await hireResult.text();

            try {
                await setCollectionData({users: userData, departments: departmentData, hires: hireData});
                // console.log(collectionData.hires);
            } catch (err) {
                console.log("JSON parse:" + err);
            }
            // console.log(userData);
            // console.log(departmentData);
            // console.log(hireData);

        } catch (err) {
            console.log("Fetch failed");
        }
        return (userData, departmentData, hireData);
    }

    useEffect(()=> {setTimeout(getData, 0)}, [])

    

    return (
        <Box>
            <Button className="FilterButton" variant="contained">Filter</Button>
            <RecordPanel data={collectionData.hires}></RecordPanel>
        </Box>
    )
}

export default Record;