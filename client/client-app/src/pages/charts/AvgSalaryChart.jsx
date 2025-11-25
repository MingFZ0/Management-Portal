import { ScatterChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

export default function AvgSalaryChart(props) {

    const displayData = props.displayData;

    const [departments, setDepartments] = useState([]);
    const [salary, setSalary] = useState([]);


    async function getData() {
        let apiUrl = import.meta.env.VITE_API_URL;

        let result = await (await fetch(`http://${apiUrl}/departments/stats/avgSalary`)).text();
        let data = JSON.parse(result);

        console.log(data);
        let depart = [];
        let salary = [];
        data.forEach(element => {
            depart.push(element["department_name"]);
            salary.push(element["average_salary"]);
        });

        setDepartments(depart);
        setSalary(salary);
        // return data;
    }

    useEffect(() => {setTimeout(getData, 0)}, []);

    return (
        <div>
            <BarChart
            xAxis={[{ data: departments }]}
            series={[{ data: salary }]}
            height={500}
            yAxis={[{label: 'Salary',width: 60}]}
            />
        </div>
        
    );
}