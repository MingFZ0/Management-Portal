import { useEffect, useState } from "react";

export default function ChartDisplay(props) {
    let state = props.state;    
    const [hireCountData, setHireCountData] = useState();
    const [hireDateData, setHireDateData] = useState();
    const [hireSalaryData, setHireSalaryData] = useState();

    async function getHireCountData () {
        let apiUrl = import.meta.env.VITE_API_URL;

        let result = await (await fetch(`http://${apiUrl}/departments/stats/hires`)).text();
        let data = JSON.parse(result);

        console.log(data);
        setHireCountData(data);
        return data;
    }

    async function getHireDateData() {
        
    }

    async function getHireDateData() {
        
    }

    async function loadStateData() {
        await getHireCountData();
    }

    useEffect(() => {setTimeout(loadStateData, 0)}, []);

    if (state == "DATES") {
        return (
            <div>
                <p>Dates</p>
            </div>
        );
    }
    else if (state == "SALARIES") {
        return (
            <div>
                <p>Salaries</p>
            </div>
        );
    }
    else if (state == "HIRES") {

        return (
            <div>
                <p>
                    HIRES
                </p>
            </div>
        );
    }
    
}
