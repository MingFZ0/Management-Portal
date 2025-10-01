import { BrowserRouter, Routes, Route } from 'react-router';
import { Welcome } from "./pages/Welcome";
import { Test } from "./pages/Test";
import Nav from './pages/Nav';
import { Record } from './pages/Record';


function PageRouter() {
    let menuLinks = [
        {url:'/', label:'Home'},
        {url:'/record', label: 'Record'}
    ]

    return (
        <BrowserRouter>
            <Nav links = {menuLinks}></Nav>
            <Routes>
                <Route index path="*" element={<Welcome />} />
                <Route path="/" element={<Welcome />} />
                <Route path="/record" element={<Record />} />
            </Routes>
        </BrowserRouter>
    )   

}

export default PageRouter;
