import { Box, Button, Typography } from "@mui/material";
import ChartDisplay from "./ChartDisplay";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/icons-material";
import HireNumChart from "./charts/HireNumChart";
import AvgSalaryChart from "./charts/AvgSalaryChart";
import HirePercentChart from "./charts/HirePercentChart";

export function Dashboard() {
    const [dashboardOpt, setDashboardOpt] = useState("HIRES");
    
    function genChart() {
        
    }
    if (dashboardOpt == "HIRES") {
        return (
            <div className='dashboard'>
                <div className='dashboardControl'>
                    <Typography variant='subtitle1'>Essential Metrics</Typography>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("HIRES")}>Hires</Button>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("PERCENT")}>Hire Percent</Button>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("SALARIES")}>Salaries</Button>
                </div>
                <div className="chart">
                    <HireNumChart/>
                </div>
            </div>
        )
    }
    else if (dashboardOpt == "SALARIES") {
        return (
            <div className='dashboard'>
                <div className='dashboardControl'>
                    <Typography variant='subtitle1'>Essential Metrics</Typography>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("HIRES")}>Hires</Button>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("PERCENT")}>Hire Percent</Button>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("SALARIES")}>Avg Salaries</Button>

                </div>
                <div className="chart">
                    <AvgSalaryChart/>
                </div>
            </div>
        )
    }
    else if (dashboardOpt == "PERCENT") {
        return (
            <div className='dashboard'>
                <div className='dashboardControl'>
                    <Typography variant='subtitle1'>Essential Metrics</Typography>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("HIRES")}>Hires</Button>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("PERCENT")}>Hire Percent</Button>
                    <Button variant="outlined" className='dashboardButton' onClick={() => setDashboardOpt("SALARIES")}>Avg Salaries</Button>

                </div>
                <div className="chart">
                    <HirePercentChart/>
                </div>
            </div>
        )
    }
    

}