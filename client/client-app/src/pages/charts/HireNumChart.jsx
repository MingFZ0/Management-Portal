import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

export default function HireNumChart(props) {

    const displayData = props.displayData;

    const [hireCount, setHireCount] = useState([]);
    const [departments, setDepartments] = useState([]);


    async function getHireCount() {
        let apiUrl = import.meta.env.VITE_API_URL;

        let result = await (await fetch(`http://${apiUrl}/departments/stats/hires`)).text();
        let data = JSON.parse(result);

        console.log(data);

        let depart = [];
        let hireData = [];
        data.forEach(element => {
            depart.push(element["_id"]);
            hireData.push(element["count"]);
        });
        
        setDepartments(depart);
        setHireCount(hireData);
        // return data;
    }

    useEffect(() => {setTimeout(getHireCount, 0)}, []);

    return (
        <BarChart
            xAxis={[{ data: departments }]}
            series={[{ data: hireCount }]}
            height={500}
            yAxis={[{label: 'Number of Hires',width: 60}]}
        />
    );
}