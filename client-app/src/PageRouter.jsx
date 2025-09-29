import { BrowserRouter, Routes, Route } from 'react-router';
import { Welcome } from "./pages/Welcome";
import { Test } from "./pages/Test";


function PageRouter() {
    let menuLinks = [
        {url:'/', label:'Home'},
        {url:'/record', label: 'Record'}
    ]

    return (
        <BrowserRouter>
            {/* <Nav links = {menuLinks}></Nav> */}
            <Routes>
                <Route index path="/" element={<Welcome />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </BrowserRouter>
    )   

}

export default PageRouter;
