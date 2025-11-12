import { BrowserRouter, Routes, Route } from 'react-router';
import { Welcome } from "./pages/Welcome";
import { Test } from "./pages/Test";
import Nav from './pages/Nav';
import { Record } from './pages/Record';
import Nav2 from './pages/Nav2';

const BASE_NAME = import.meta.env.VITE_BASE_NAME || "/";


function PageRouter() {
    let menuLinks = [
        {url:'/', label:'Home'},
        {url:'/record', label: 'Record'}
    ]

    return (
        <BrowserRouter basename={BASE_NAME}>
            {/* <Nav links = {menuLinks}></Nav> */}
            <Nav2></Nav2>
            <Routes>
                <Route index path="*" element={<Welcome />} />
                <Route path="/" element={<Welcome />} />
                <Route path="/record" element={<Record />} />
            </Routes>
        </BrowserRouter>
    )   

}

export default PageRouter;
