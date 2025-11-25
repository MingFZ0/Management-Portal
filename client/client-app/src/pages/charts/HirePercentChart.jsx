import { PieChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';

export default function HirePercentChart(props) {

    const displayData = props.displayData;

    const [chartData, setChartData] = useState([]);


    async function getHireCount() {
        let apiUrl = import.meta.env.VITE_API_URL;

        let result = await (await fetch(`http://${apiUrl}/departments/stats/hires`)).text();
        let data = JSON.parse(result);

        console.log(data);

        let chartData = []
        data.forEach(element => {
            chartData.push({value: element["count"], label: element["_id"]})
        });
        
        setChartData(chartData);
        // return data;
    }

    useEffect(() => {setTimeout(getHireCount, 0)}, []);

    return (
        <PieChart
            series={[
                {
                data: chartData
                },
            ]}
            width={500}
            height={500}
        />
    );
}